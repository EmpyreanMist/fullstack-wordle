import { useState } from "react";
import "./styles/App.css";
import Header from "./components/header.jsx";
import GameBoard from "./components/GameBoard.jsx";
import StartScreen from "./components/StartScreen.jsx";
import WordLengthSelector from "./components/WordLengthSelector.jsx";
import Keyboard from "./components/Keyboard.jsx";
import MusicController from "./components/MusicController.jsx";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [wordLength, setWordLength] = useState(null);

  const startGame = () => {
    setGameStarted(true);
  };

  const handleWordLengthConfirm = (selectedLength) => {
    setWordLength(selectedLength);
  };

  return (
    <div className="app">
      <Header />
      <main>
        {!gameStarted ? (
          <StartScreen startGame={startGame} />
        ) : wordLength === null ? (
          <WordLengthSelector onConfirm={handleWordLengthConfirm} />
        ) : (
          <GameBoard wordLength={wordLength} />
        )}
      </main>
      {gameStarted && wordLength !== null && (
        <div className="keyboard-wrapper">
          <Keyboard />
        </div>
      )}
      <MusicController />
    </div>
  );
}

export default App;
