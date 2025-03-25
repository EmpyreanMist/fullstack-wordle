import express from 'express';
import cors from 'cors';

const port = 5080;
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Tjenare');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
