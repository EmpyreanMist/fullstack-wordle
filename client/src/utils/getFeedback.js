export function getFeedback(guess, target) {
  const feedback = Array(guess.length).fill("absent");
  const used = Array(target.length).fill(false);

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      feedback[i] = "correct";
      used[i] = true;
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (feedback[i] === "correct") continue;
    for (let j = 0; j < target.length; j++) {
      if (!used[j] && guess[i] === target[j]) {
        feedback[i] = "present";
        used[j] = true;
        break;
      }
    }
  }

  return feedback;
}
