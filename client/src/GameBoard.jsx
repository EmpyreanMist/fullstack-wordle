function GameBoard({ wordLength }) {
  const rows = 6;

  return (
    <div className="game-board">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array.from({ length: wordLength }).map((_, colIndex) => (
            <div key={colIndex} className="cell"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
