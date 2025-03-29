function Keyboard() {
  const rowOne = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const rowTwo = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const rowThree = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"];

  return (
    <div className="keyboard">
      <div className="rowOne">
        {rowOne.map((letter) => (
          <button className="key" key={letter}>
            {letter}
          </button>
        ))}
      </div>

      <div className="rowTwo">
        {rowTwo.map((letter) => (
          <button className="key" key={letter}>
            {letter}
          </button>
        ))}
      </div>

      <div className="rowThree">
        {rowThree.map((letter) => {
          if (letter === "ENTER") {
            return (
              <button className="key enter-key" key={letter}>
                ENTER
              </button>
            );
          }

          if (letter === "BACKSPACE") {
            return (
              <button className="key backspace-key" key={letter}>
                ⌫
              </button>
            );
          }

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
