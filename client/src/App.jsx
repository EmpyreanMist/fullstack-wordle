import { useState } from 'react';
import './App.css';
import Header from './header.jsx';
import BackgroundMusic from './BackgroundMusic.jsx';
import GameBoard from './GameBoard.jsx';
import StartScreen from './StartScreen.jsx';
import WordLengthSelector from './WordLengthSelector.jsx';
import Settings from './Settings';

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
          <GameBoard wordLength={wordLength} />
        )}
      </main>
      <Settings />
    </div>
  );
}

export default App;
