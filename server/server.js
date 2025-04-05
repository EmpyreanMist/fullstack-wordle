import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Ladda .env först
dotenv.config();

const app = express();
const port = 5080;

// __dirname och __filename för ES-modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Atlas-anslutning
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// View engine: EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
import gameRoute from './routes/gameRoute.js';
import highScoreRoute from './routes/highScoreRoute.js';
import infoRoute from './routes/infoRoute.js';
import wordRoute from './routes/wordRoute.js';

app.use('/api/game', gameRoute);
app.use('/api/highscore', highScoreRoute);
app.use('/api/info', infoRoute);
app.use('/api/word', wordRoute);

// SSR-sida
app.get('/scoreboard', (req, res) => {
  const dummyScores = [
    { name: 'Alice', guesses: 3, wordLength: 5, timeInSeconds: 12 },
    { name: 'Bob', guesses: 4, wordLength: 6, timeInSeconds: 18 },
    { name: 'Eve', guesses: 2, wordLength: 5, timeInSeconds: 10 },
  ];
  res.render('scoreboard', { scores: dummyScores });
});

// Starta servern
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
