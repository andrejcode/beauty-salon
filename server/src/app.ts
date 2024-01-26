import express from 'express';

const app = express();

app.use('/health', (_, res) => {
  res.status(200).send('OK');
});

export default app;
