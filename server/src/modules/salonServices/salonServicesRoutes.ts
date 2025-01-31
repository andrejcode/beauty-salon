import { Router } from 'express';
import type { Database } from '@/database';
import createServiceController from './salonServiceController';

export default (db: Database) => {
  const router = Router();

  const serviceController = createServiceController(db);

  router.get('/', serviceController.getServices);

  return router;
};
