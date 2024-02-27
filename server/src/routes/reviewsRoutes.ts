import { Router } from 'express';
import { Database } from '../database';
import createReviewController from '../controllers/reviewController';
import { authenticateToken } from '../middleware/authMiddleware';

export default (db: Database) => {
  const router = Router();

  const reviewController = createReviewController(db);

  router
    .route('/')
    .get(reviewController.getReviews)
    .post(authenticateToken, reviewController.createReview);

  router.route('/user').get(authenticateToken, reviewController.getUserReview);

  router
    .route('/:id')
    .get(reviewController.getReview) // In our front we are not using this route
    .patch(authenticateToken, reviewController.updateReview)
    .delete(authenticateToken, reviewController.deleteReview);

  return router;
};
