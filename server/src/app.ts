import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { type Database } from './database';
import usersRoutes from './modules/users/usersRoutes';
import servicesRoutes from './modules/salonServices/salonServicesRoutes';
import employeesRoutes from './modules/employees/employeesRoutes';
import appointmentsRoutes from './modules/appointments/appointmentsRoutes';
import businessTimesRoutes from './modules/businessTimes/businessTimesRoutes';

export default function createApp(db: Database) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/health', (_req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.use('/users', usersRoutes(db));
  app.use('/services', servicesRoutes(db));
  app.use('/employees', employeesRoutes(db));
  app.use('/appointments', appointmentsRoutes(db));
  app.use('/business-times', businessTimesRoutes(db));

  app.all('*', (_req: Request, res: Response) => {
    res.sendStatus(404);
  });

  return app;
}
