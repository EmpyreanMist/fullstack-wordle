import { useState } from "react";
import "./styles/App.css";
import Header from "./components/header.jsx";
import BackgroundMusic from "./BackgroundMusic.jsx";
import GameBoard from "./components/GameBoard.jsx";
import StartScreen from "./components/StartScreen.jsx";
import WordLengthSelector from "./components/WordLengthSelector.jsx";
import Settings from "./components/Settings.jsx";
import Keyboard from "./components/Keyboard.jsx";

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
      <BackgroundMusic />
      <Header />
      <main>
        {!gameStarted ? (
          // Visa StartScreen först
          <StartScreen startGame={startGame} />
        ) : wordLength === null ? (
          // Visa val av ordlängd
          <WordLengthSelector onConfirm={handleWordLengthConfirm} />
        ) : (
          // Visa spelbrädet med vald ordlängd
          <>
            <GameBoard wordLength={wordLength} />
          </>
        )}
      </main>
      {gameStarted && wordLength !== null && (
        <div className="keyboard-wrapper">
          <Keyboard />
        </div>
      )}
      <Settings />
    </div>
  );
}

export default App;
