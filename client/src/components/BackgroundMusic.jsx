function BackgroundMusic({ audioRef }) {
  return (
    <audio
      ref={audioRef}
      src={`${import.meta.env.BASE_URL}mp3/main-theme.mp3`}
      loop
    />
  );
}

export default BackgroundMusic;
