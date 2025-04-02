function GameBoard({ wordLength, guesses, currentGuess, feedbackList }) {
  const rows = 6;

  return (
    <div className="game-board">
      {Array.from({ length: rows }).map((_, rowIndex) => {
        const guess =
          guesses[rowIndex] ||
          (rowIndex === guesses.length ? currentGuess : "");

        const feedback = feedbackList[rowIndex];

        return (
          <div key={rowIndex} className="row">
            {Array.from({ length: wordLength }).map((_, colIndex) => {
              const letter = guess[colIndex] || "";
              return (
                <div
                  key={colIndex}
                  className={`cell ${feedback?.[colIndex] || ""}`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default GameBoard;
