import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from 'express';
import type { Database } from '@/database';
import createAppointmentController from './appointmentController';
import { authenticateToken, isAdmin } from '@/middleware/authMiddleware';

export default (db: Database) => {
  const router = Router();

  const appointmentController = createAppointmentController(db);

  router
    .route('/')
    .get(authenticateToken, appointmentController.getUserAppointments)
    .post(authenticateToken, appointmentController.createAppointment);

  router
    .route('/:id')
    .delete(authenticateToken, appointmentController.deleteAppointment);

  router
    .route('/available')
    .get(authenticateToken, appointmentController.getAvailableTimes);

  router.route('/all').get(
    authenticateToken,
    async (req: Request, res: Response, next: NextFunction) => {
      await isAdmin(req, res, next, db);
    },
    appointmentController.getUpcomingAppointment
  );

  return router;
};
