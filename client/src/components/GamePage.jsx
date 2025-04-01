import { useState } from "react";
import StartScreen from "./StartScreen";
import WordLengthSelector from "./WordLengthSelector";
import GameBoard from "./GameBoard";
import Keyboard from "./Keyboard";

function GamePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [wordLength, setWordLength] = useState(null);

  if (!gameStarted) {
    return (
      <StartScreen
        startGame={() => {
          setGameStarted(true);
          setWordLength(null);
        }}
      />
    );
  }

  if (wordLength === null) {
    return <WordLengthSelector onConfirm={setWordLength} />;
  }

  return (
    <>
      <GameBoard wordLength={wordLength} />
      <div className="keyboard-wrapper">
        <Keyboard />
      </div>
    </>
  );
}

export default GamePage;
