import express from 'express';
import cors from 'cors';

import gameRoute from './routes/gameRoute.js';
import highScoreRoute from './routes/highScoreRoute.js';
import infoRoute from './routes/infoRoute.js';
import wordRoute from './routes/wordRoute.js';

const port = 5080;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/game', gameRoute);
app.use('/api/highscore', highScoreRoute);
app.use('/api/info', infoRoute);
app.use('/api/word', wordRoute);

app.get('/', (req, res) => {
  res.send('Tjenare');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
