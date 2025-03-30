function ToggleMusic({ isPlaying, toggleMusic }) {
  return (
    <div className="music-container">
      <button id="music-btn" onClick={toggleMusic}>
        {isPlaying ? "🔊" : "🔇"}
      </button>
    </div>
  );
}

export default ToggleMusic;
