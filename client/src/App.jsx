import { useState } from 'react';
import './App.css';
import Header from './header.jsx';
import BackgroundMusic from './BackgroundMusic.jsx';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="app">
      <BackgroundMusic />
      <Header />
      <main>
        <p className="start-text">Are you smart enough to Wordle?</p>
        <button className="start-game-button">Start game!</button>
      </main>
    </div>
  );
}

export default App;
