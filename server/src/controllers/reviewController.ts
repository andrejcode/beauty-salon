import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Review } from '../entities';
import { Database } from '../database';

export default (db: Database) => {
  const reviewRepo: Repository<Review> = db.getRepository(Review);

  async function getReviews(req: Request, res: Response) {
    const { limit, rating, skip } = req.body;

    if (
      rating &&
      limit &&
      typeof rating === 'number' &&
      typeof limit === 'number' &&
      (typeof skip === 'undefined' || typeof skip === 'number')
    ) {
      try {
        const reviews = await reviewRepo.find({
          take: limit,
          skip,
          where: { stars: rating },
          relations: {
            user: true,
          },
        });

        res.json(reviews);
      } catch (e) {
        res.status(400).send('Unable to get reviews.');
      }
    } else {
      res.status(400).send('Please provide limit and rating.');
    }
  }

  async function getReview(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);

    if (id && typeof id === 'number') {
      try {
        const review = await reviewRepo.findOneBy({ id });

        if (review) {
          res.json(review);
        } else {
          res.status(404).send('Review not found.');
        }
      } catch (e) {
        res.status(400).send('Unable to get review.');
      }
    } else {
      res.status(400).send('Invalid id parameter.');
    }
  }

  async function createReview(req: Request, res: Response) {
    const { userId } = req;
    const { stars, reviewText } = req.body;

    try {
      if (
        stars &&
        reviewText &&
        typeof stars === 'number' &&
        typeof reviewText === 'string' &&
        (stars >= 1 || stars <= 5)
      ) {
        await reviewRepo.save({
          reviewText,
          stars,
          userId,
        });

        res.status(201).send('Review created successfully.');
      } else {
        res.status(400).send('Please provide rating and review.');
      }
    } catch (e) {
      if ((e as Error).message.includes('duplicate key')) {
        res.status(400).send('You have already written a review.');
      } else {
        res.sendStatus(500);
      }
    }
  }

  // Helper function used for updating and deleting reviews
  // Checks if the user is the owner of the review
  async function performActionIfOwner(
    res: Response,
    userId: number,
    reviewId: number,
    actionIfOwner: () => Promise<void>
  ) {
    const review = await reviewRepo.findOne({
      where: { id: reviewId },
    });

    try {
      if (review) {
        if (review.userId === userId) {
          await actionIfOwner();
        } else {
          res.status(403).send('User is not the owner of the review.');
        }
      } else {
        res.status(404).send('Review not found.');
      }
    } catch (e) {
      res.sendStatus(500);
    }
  }

  async function deleteReview(req: Request, res: Response) {
    const { userId } = req;
    const id = parseInt(req.params.id, 10);

    if (id && typeof id === 'number') {
      await performActionIfOwner(res, userId!, id, async () => {
        await reviewRepo.delete({ id });
        res.status(200).send('Review deleted successfully.');
      });
    } else {
      res.status(400).send('Invalid id parameter.');
    }
  }

  async function updateReview(req: Request, res: Response) {
    const { userId } = req;
    const id = parseInt(req.params.id, 10);

    if (id && typeof id === 'number') {
      const { stars, reviewText } = req.body;

      if (
        stars &&
        reviewText &&
        typeof stars === 'number' &&
        typeof reviewText === 'string' &&
        (stars >= 1 || stars <= 5)
      ) {
        await performActionIfOwner(res, userId!, id, async () => {
          await reviewRepo.update(id, { reviewText, stars });
          res.status(200).send('Review updated successfully.');
        });
      } else {
        res.status(400).send('Please provide rating and review.');
      }
    } else {
      res.status(400).send('Invalid id parameter.');
    }
  }

  return { getReviews, getReview, createReview, updateReview, deleteReview };
};
