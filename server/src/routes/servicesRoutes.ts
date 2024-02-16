import { Router } from 'express';
import { Database } from '../database';
import createServiceController from '../controllers/serviceController';

export default (db: Database) => {
  const router = Router();

  const serviceController = createServiceController(db);

  router.get('/', serviceController.getServices);

  return router;
};
