import express from 'express';
import getRandomWord from '../services/wordService.js';

const router = express.Router();

router.get('/', (req, res) => {
  const length = parseInt(req.query.length, 10);
  const word = getRandomWord(length);
  if (!word) {
    return res.status(404).json({ error: 'No word found with that length' });
  }
  res.json({ word });
});

export default router;
