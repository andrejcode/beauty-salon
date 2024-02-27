import { Router } from 'express';
import { Database } from '../../database';
import createEmployeeController from './employeeContoller';

export default (db: Database) => {
  const router = Router();

  const employeeController = createEmployeeController(db);

  router.get('/', employeeController.getEmployees);

  return router;
};
