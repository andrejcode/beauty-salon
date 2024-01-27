import express from 'express';
import cors from 'cors';
import { Database } from './database';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function createApp(db: Database) {
  const app = express();

  app.use(cors({ origin: 'http://localhost:5173' }));
  app.use(express.json());

  app.use('/health', (_, res) => {
    res.status(200).send('OK');
  });

  return app;
}
