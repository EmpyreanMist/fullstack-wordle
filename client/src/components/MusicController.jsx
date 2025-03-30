import { useEffect, useRef, useState } from "react";
import BackgroundMusic from "./BackgroundMusic";
import ToggleMusic from "./ToggleMusic";

function MusicController() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Autoplays on action
  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.1;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Kunde inte spela upp ljud", err));
      }
      document.removeEventListener("click", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((err) => console.log("Kunde inte spela upp ljud", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <BackgroundMusic audioRef={audioRef} />
      <ToggleMusic isPlaying={isPlaying} toggleMusic={toggleMusic} />
    </>
  );
}

export default MusicController;
