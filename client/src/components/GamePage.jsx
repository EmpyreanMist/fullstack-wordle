import { useState, useEffect } from "react";
import StartScreen from "./StartScreen";
import WordLengthSelector from "./WordLengthSelector";
import GameBoard from "./GameBoard";
import Keyboard from "./Keyboard";
import { getFeedback } from "../utils/getFeedback";

function GamePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [wordLength, setWordLength] = useState(null);
  const [secretWord, setSecretWord] = useState(null);

  const [guesses, setGuesses] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");

  const [gameOver, setGameOver] = useState(false);
  const [didWin, setDidWin] = useState(false);

  useEffect(() => {
    if (!wordLength) return;

    const fetchWord = async () => {
      try {
        const res = await fetch(`/api/word?length=${wordLength}`);
        const data = await res.json();
        console.log(data.word);
        setSecretWord(data.word);
      } catch (err) {
        console.error("Could not fetch word:", err.message);
      }
    };

    fetchWord();
  }, [wordLength]);

  const handleKeyPress = (key) => {
    if (gameOver) return;

    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (key === "Enter") {
      if (currentGuess.length !== wordLength) return;

      const feedback = getFeedback(currentGuess, secretWord);
      const newGuesses = [...guesses, currentGuess];
      const newFeedbackList = [...feedbackList, feedback];

      setGuesses(newGuesses);
      setFeedbackList(newFeedbackList);
      setCurrentGuess("");

      if (currentGuess === secretWord) {
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
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [currentGuess, wordLength, secretWord, guesses, feedbackList, gameOver]);

  const resetGame = () => {
    setGuesses([]);
    setFeedbackList([]);
    setCurrentGuess("");
    setSecretWord(null);
    setGameOver(false);
    setDidWin(false);
    setWordLength(null);
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
      <GameBoard
        wordLength={wordLength}
        guesses={guesses}
        currentGuess={currentGuess}
        feedbackList={feedbackList}
      />
      {!gameOver && (
        <div className="keyboard-wrapper">
          <Keyboard onKeyPress={handleKeyPress} />
        </div>
      )}
      {gameOver && (
        <div className="result">
          <h2>{didWin ? "🎉 You won!" : "💀 Game Over"}</h2>
          <p>
            Word length: <strong>{wordLength}</strong>
          </p>
          <p>
            Attempts used: <strong>{guesses.length}</strong>
          </p>
          {!didWin && (
            <p>
              The correct word was: <strong>{secretWord}</strong>
            </p>
          )}
          <button className="play-again-btn" onClick={resetGame}>
            Play again
          </button>
        </div>
      )}
    </>
  );
}

export default GamePage;
