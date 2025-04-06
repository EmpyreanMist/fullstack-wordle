import { useState, useEffect } from 'react';
import StartScreen from './StartScreen';
import WordLengthSelector from './WordLengthSelector';
import GameBoard from './GameBoard';
import Keyboard from './Keyboard';
import { getFeedback } from '../utils/getFeedback';

function GamePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [wordLength, setWordLength] = useState(null);
  const [secretWord, setSecretWord] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [didWin, setDidWin] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [keyStatuses, setKeyStatuses] = useState({});
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  useEffect(() => {
    if (!wordLength) return;
    const fetchWord = async () => {
      try {
        const res = await fetch(`/api/word?length=${wordLength}`);
        const data = await res.json();
        setSecretWord(data.word);
        setStartTime(Date.now());
      } catch (err) {
        console.error('Could not fetch word:', err.message);
      }
    };
    fetchWord();
  }, [wordLength]);

  const updateKeyStatuses = (guess, feedback) => {
    setKeyStatuses((prev) => {
      const updated = { ...prev };
      guess.split('').forEach((letter, i) => {
        const status = feedback[i];
        const current = updated[letter];

        if (status === 'correct' || status === 'present') {
          updated[letter] = 'correct';
        } else if (!current) {
          updated[letter] = 'absent';
        }
      });
      return updated;
    });
  };

  const handleKeyPress = (key) => {
    if (gameOver) return;
    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (key === 'Enter') {
      if (currentGuess.length !== wordLength) return;
      const feedback = getFeedback(currentGuess, secretWord);
      updateKeyStatuses(currentGuess, feedback);
      const newGuesses = [...guesses, currentGuess];
      const newFeedbackList = [...feedbackList, feedback];
      setGuesses(newGuesses);
      setFeedbackList(newFeedbackList);
      setCurrentGuess('');
      if (currentGuess === secretWord) {
        const endTime = Date.now();
        const time = Math.floor((endTime - startTime) / 1000);
        setDuration(time);
        setDidWin(true);
        setGameOver(true);
      } else if (newGuesses.length >= 6) {
        setGameOver(true);
      }
    } else if (/^[a-zA-Z]$/.test(key)) {
      if (currentGuess.length < wordLength) {
        setCurrentGuess((prev) => prev + key.toLowerCase());
      }
    }
  };

  useEffect(() => {
    const listener = (e) => handleKeyPress(e.key);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [currentGuess, wordLength, secretWord, guesses, feedbackList, gameOver]);

  const resetGame = () => {
    setGuesses([]);
    setFeedbackList([]);
    setCurrentGuess('');
    setSecretWord(null);
    setGameOver(false);
    setDidWin(false);
    setWordLength(null);
    setDuration(null);
    setPlayerName('');
    setKeyStatuses({});
    setScoreSubmitted(false);
  };

  if (!gameStarted) {
    return <StartScreen startGame={() => setGameStarted(true)} />;
  }

  if (wordLength === null) {
    return (
      <WordLengthSelector
        onConfirm={setWordLength}
        onStart={() => setGameStarted(true)}
      />
    );
  }

  if (!secretWord) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="game-layout">
        {gameOver && (
          <div className="stats-panel">
            <h2>{didWin ? '🎉 You won!' : '💀 Game Over'}</h2>
            <p>
              Word length: <strong>{wordLength}</strong>
            </p>
            <p>
              Attempts used: <strong>{guesses.length}</strong>
            </p>
            {didWin ? (
              <p>
                Time: <strong>{duration} seconds</strong>
              </p>
            ) : (
              <p>
                The correct word was: <strong>{secretWord}</strong>
              </p>
            )}
          </div>
        )}
        <GameBoard
          wordLength={wordLength}
          guesses={guesses}
          currentGuess={currentGuess}
          feedbackList={feedbackList}
        />
      </div>
      {gameOver && (
        <div className="score-form">
          {didWin && !scoreSubmitted && (
            <>
              <label htmlFor="name">Enter your name:</label>
              <input
                id="name"
                type="text"
                className="name-input"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <button
                className="submit-score-btn"
                onClick={async () => {
                  try {
                    const res = await fetch('/api/highscore', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        name: playerName,
                        guesses: guesses.length,
                        wordLength,
                        timeInSeconds: duration,
                      }),
                    });

                    if (!res.ok) {
                      const error = await res.json();
                      throw new Error(error.message || 'Unknown error');
                    }

                    setScoreSubmitted(true);
                  } catch (err) {
                    console.error('Error submitting score:', err);
                    alert('Could not submit score. Please try again.');
                  }
                }}
              >
                Submit Score
              </button>
            </>
          )}

          {didWin && scoreSubmitted && (
            <p className="submitted-message">
              Your score has been submitted to the scoreboard!
            </p>
          )}

          <button className="play-again-btn" onClick={resetGame}>
            Play again
          </button>
        </div>
      )}

      {!gameOver && (
        <div className="keyboard-wrapper">
          <Keyboard onKeyPress={handleKeyPress} keyStatuses={keyStatuses} />
        </div>
      )}
    </>
  );
}

export default GamePage;
