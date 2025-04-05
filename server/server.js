import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';

import gameRoute from './routes/gameRoute.js';
import highScoreRoute from './routes/highScoreRoute.js';
import infoRoute from './routes/infoRoute.js';
import wordRoute from './routes/wordRoute.js';

const port = 5080;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());

app.use('/api/game', gameRoute);
app.use('/api/highscore', highScoreRoute);
app.use('/api/info', infoRoute);
app.use('/api/word', wordRoute);

app.get('/scoreboard', (req, res) => {
  const dummyScores = [
    { name: 'Alice', guesses: 3, wordLength: 5, timeInSeconds: 12 },
    { name: 'Bob', guesses: 4, wordLength: 6, timeInSeconds: 18 },
    { name: 'Eve', guesses: 2, wordLength: 5, timeInSeconds: 10 },
    { name: 'Alice', guesses: 3, wordLength: 5, timeInSeconds: 12 },
    { name: 'Bob', guesses: 4, wordLength: 6, timeInSeconds: 18 },
    { name: 'Eve', guesses: 2, wordLength: 5, timeInSeconds: 10 },
    { name: 'Alice', guesses: 3, wordLength: 5, timeInSeconds: 12 },
    { name: 'Bob', guesses: 4, wordLength: 6, timeInSeconds: 18 },
    { name: 'Eve', guesses: 2, wordLength: 5, timeInSeconds: 10 },
    { name: 'Alice', guesses: 3, wordLength: 5, timeInSeconds: 12 },
    { name: 'Bob', guesses: 4, wordLength: 6, timeInSeconds: 18 },
    { name: 'Eve', guesses: 2, wordLength: 5, timeInSeconds: 10 },
  ];

  res.render('scoreboard', { scores: dummyScores });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
