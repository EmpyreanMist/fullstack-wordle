function StartScreen({ startGame }) {
  return (
    <>
      <p className="start-text">Are you smart enough to Wordle?</p>
      <button className="start-game-button" onClick={startGame}>
        Start game!
      </button>
    </>
  );
}

export default StartScreen;
