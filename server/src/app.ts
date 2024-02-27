import express, { Request, Response } from 'express';
import cors from 'cors';
import { Database } from './database';
import usersRoute from './routes/usersRoutes';
import servicesRoute from './routes/servicesRoutes';
import reviewsRoute from './routes/reviewsRoutes';
import employeesRoutes from './routes/employeesRoutes';
import appointmentsRoutes from './routes/appointmentsRoutes';
import businessTimesRoutes from './routes/businessTimesRoutes';

export default function createApp(db: Database) {
  const app = express();

  app.use(cors({ origin: 'http://localhost:5173' }));
  app.use(express.json());

  app.use('/health', (_req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.use('/users', usersRoute(db));
  app.use('/services', servicesRoute(db));
  app.use('/reviews', reviewsRoute(db));
  app.use('/employees', employeesRoutes(db));
  app.use('/appointments', appointmentsRoutes(db));
  app.use('/business-times', businessTimesRoutes(db));

  app.all('*', (_req: Request, res: Response) => {
    res.sendStatus(404);
  });

  return app;
}
