import fs from 'fs';

function getRandomWord(length) {
  const data = fs.readFileSync('./data/words.txt', 'utf-8');
  const wordsArray = data.split('\n').map((word) => word.trim());

  const wordsWithSameLength = [];

  wordsArray.forEach((word) => {
    if (word.length === length) {
      wordsWithSameLength.push(word);
    }
  });

  let randomWord =
    wordsWithSameLength[Math.floor(Math.random() * wordsWithSameLength.length)];

  return randomWord;
}
