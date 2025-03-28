import fs from 'fs';

const data = fs.readFileSync('./data/words.txt', 'utf-8');
const wordsArray = data.split('\n').map((word) => word.trim());

function getRandomWord(length) {
  const wordsWithSameLength = wordsArray.filter(
    (word) => word.length === length
  );

  let randomWord =
    wordsWithSameLength[Math.floor(Math.random() * wordsWithSameLength.length)];

  return randomWord;
}

export default getRandomWord;
