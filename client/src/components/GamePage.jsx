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

  // Hämta ord från backend när wordLength sätts
  useEffect(() => {
    if (!wordLength) return;

    const fetchWord = async () => {
      try {
        const res = await fetch(`/api/word?length=${wordLength}`);
        const data = await res.json();
        setSecretWord(data.word);
        console.log("Secret:", data.word); // Debug
      } catch (err) {
        console.error("Could not fetch word:", err.message);
      }
    };

    fetchWord();
  }, [wordLength]);

  // Gemensam logik för tangentinput (fysiskt och klick)
  const handleKeyPress = (key) => {
    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (key === "Enter") {
      if (currentGuess.length !== wordLength) return;

      const feedback = getFeedback(currentGuess, secretWord);
      setGuesses((prev) => [...prev, currentGuess]);
      setFeedbackList((prev) => [...prev, feedback]);
      setCurrentGuess("");
    } else if (/^[a-zA-Z]$/.test(key)) {
      if (currentGuess.length < wordLength) {
        setCurrentGuess((prev) => prev + key.toLowerCase());
      }
    }
  };

  // Tangentbordshantering (fysiskt)
  useEffect(() => {
    const listener = (e) => handleKeyPress(e.key);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [currentGuess, wordLength, secretWord]);

  // Steg-för-steg visning
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
      <div className="keyboard-wrapper">
        <Keyboard onKeyPress={handleKeyPress} />
      </div>
    </>
  );
}

export default GamePage;
