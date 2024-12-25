import { Router } from 'express';
import type { Database } from '@/database';
import createBusinessTimeController from './businessTimeController';

export default (db: Database) => {
  const router = Router();

  const businessTimeController = createBusinessTimeController(db);

  router.get('/', businessTimeController.getBusinessTime);

  return router;
};
