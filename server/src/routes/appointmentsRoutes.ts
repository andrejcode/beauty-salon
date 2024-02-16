import { Router } from 'express';
import { Database } from '../database';
import createAppointmentController from '../controllers/appointmentController';
import authenticateToken from '../middleware/authMiddleware';

export default (db: Database) => {
  const router = Router();

  const appointmentController = createAppointmentController(db);

  router
    .route('/')
    .get(authenticateToken, appointmentController.getUserAppointments)
    .post(authenticateToken, appointmentController.createAppointment);

  router
    .route('/available')
    .get(authenticateToken, appointmentController.getAvailableTimes);

  return router;
};
