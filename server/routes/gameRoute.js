import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'Game data received!' });
});

export default router;
