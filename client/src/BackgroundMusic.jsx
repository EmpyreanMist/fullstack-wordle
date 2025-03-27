import { useEffect, useRef } from 'react';

function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.1;
        audioRef.current.play().catch((err) => {
          console.log('Kunde inte spela upp ljud', err);
        });
      }
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  return <audio ref={audioRef} src="/mp3/main-theme.mp3" loop />;
}

export default BackgroundMusic;
