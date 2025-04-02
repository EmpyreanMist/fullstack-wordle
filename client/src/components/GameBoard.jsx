import { useState, useEffect } from "react";
import { getFeedback } from "../utils/getFeedback";

function GameBoard({ wordLength }) {
  const rows = 6;

  const [guesses, setGuesses] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [secretWord, setSecretWord] = useState(null);

  useEffect(() => {
    if (!wordLength) return;

    const fetchWord = async () => {
      const url = `/api/word?length=${wordLength}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        setSecretWord(data.word);
        /* TEMPORARY, WILL DELETE LATER !! */
        console.log(data.word);
      } catch (error) {
        console.error(
          "Something went wrong fetching the word: ",
          error.message
        );
      }
    };

    fetchWord();
  }, [wordLength]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (key === "Enter") {
        if (currentGuess.length !== wordLength) return;

        const feedback = getFeedback(currentGuess, secretWord);
        setFeedbackList((prev) => [...prev, feedback]);

        setGuesses((prev) => [...prev, currentGuess]);
        setCurrentGuess("");
      } else if (/^[a-zA-Z]$/.test(key)) {
        if (currentGuess.length < wordLength) {
          setCurrentGuess((prev) => prev + key.toLowerCase());
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, wordLength]);

  return (
    <div className="game-board">
      {Array.from({ length: rows }).map((_, rowIndex) => {
        const guess =
          guesses[rowIndex] ||
          (rowIndex === guesses.length ? currentGuess : "");

        const feedback = feedbackList[rowIndex];

        return (
          <div key={rowIndex} className="row">
            {Array.from({ length: wordLength }).map((_, colIndex) => {
              const letter = guess[colIndex] || "";
              return (
                <div
                  key={colIndex}
                  className={`cell ${feedback?.[colIndex] || ""}`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default GameBoard;
