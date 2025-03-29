function Keyboard() {
  const rowOne = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const rowTwo = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const rowThree = ["Z", "X", "C", "V", "B", "N", "M"];
  return (
    <div className="keyboard">
      <div className="rowOne">
        {rowOne.map((letter) => {
          return (
            <button className="key" key={letter}>
              {letter}
            </button>
          );
        })}
      </div>
      <div className="rowTwo">
        {rowTwo.map((letter) => {
          return (
            <button className="key" key={letter}>
              {letter}
            </button>
          );
        })}
      </div>
      <div className="rowThree">
        {rowThree.map((letter) => {
          return (
            <button className="key" key={letter}>
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Keyboard;
