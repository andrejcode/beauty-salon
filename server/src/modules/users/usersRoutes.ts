import { Router } from 'express';
import createUserController from './userController';
import type { Database } from '@/database';
import { authenticateToken } from '@/middleware/authMiddleware';

export default (db: Database) => {
  const router = Router();

  const userController = createUserController(db);

  router.post('/signup', userController.signupUser);
  router.post('/login', userController.loginUser);
  router.get('/profile', authenticateToken, userController.getUserProfile);

  return router;
};
