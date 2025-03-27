import { useState } from 'react';
import './App.css';
import Header from './header.jsx';
import BackgroundMusic from './BackgroundMusic.jsx';
import GameBoard from './GameBoard.jsx';
import StartScreen from './StartScreen.jsx';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const wordLength = 5;

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="app">
      <BackgroundMusic />
      <Header />
      <main>
        {!gameStarted ? (
          // Visa StartScreen om spelet ej startat
          <StartScreen startGame={startGame} />
        ) : (
          // Visa GameBoard när spelet är startat
          <GameBoard wordLength={wordLength} />
        )}
      </main>
    </div>
  );
}

export default App;
