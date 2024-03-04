import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Review } from '../../entities';
import { Database } from '../../database';
import { performActionIfOwner } from '../../utils/auth';
import { mapReviewToDto } from './ReviewDto';

interface RequestQuery {
  limit?: string;
  stars?: string;
  skip?: string;
}

export default (db: Database) => {
  const reviewRepo: Repository<Review> = db.getRepository(Review);

  async function getReviews(req: Request, res: Response) {
    const { limit, stars, skip }: RequestQuery = req.query;

    const limitValue = !Number.isNaN(parseInt(limit!, 10))
      ? parseInt(limit!, 10)
      : null;
    const starsValue = !Number.isNaN(parseInt(stars!, 10))
      ? parseInt(stars!, 10)
      : null;

    let skipValue;
    if (skip) {
      skipValue = !Number.isNaN(parseInt(skip!, 10))
        ? parseInt(skip!, 10)
        : null;
    } else {
      skipValue = undefined;
    }

    if (
      !(
        typeof limitValue === 'number' &&
        limitValue > 0 &&
        typeof starsValue === 'number' &&
        starsValue > 0 &&
        starsValue < 6 &&
        (typeof skipValue === 'undefined' || typeof skipValue === 'number')
      )
    ) {
      res.status(400).send('Please provide limit, stars and optionally skip.');
      return;
    }

    try {
      const reviews = await reviewRepo.find({
        take: limitValue,
        skip: skipValue || undefined,
        where: { stars: starsValue },
        relations: {
          user: true,
        },
      });

      const reviewsDto = reviews.map((review) => mapReviewToDto(review));
      res.json(reviewsDto);
    } catch (e) {
      res
        .status(400)
        .send(
          `Unable to get reviews. ${(e as Error).message ? (e as Error).message : ''}`
        );
    }
  }

  async function getUserReview(req: Request, res: Response) {
    const { userId } = req;

    try {
      const review = await reviewRepo.findOneBy({ userId });

      if (!review) {
        res.status(404).send('Review not found.');
        return;
      }

      const reviewDto = mapReviewToDto(review);
      res.json(reviewDto);
    } catch (e) {
      res
        .status(400)
        .send(
          `Unable to get review. ${(e as Error).message ? (e as Error).message : ''}`
        );
    }
  }

  async function createReview(req: Request, res: Response) {
    const { userId } = req;
    const { stars, reviewText } = req.body;

    try {
      if (
        !(
          stars &&
          reviewText &&
          typeof stars === 'number' &&
          typeof reviewText === 'string' &&
          (stars >= 1 || stars <= 5)
        )
      ) {
        res.status(400).send('Please provide stars and review.');
        return;
      }

      const review = await reviewRepo.save({
        reviewText,
        stars,
        userId,
      });

      res
        .status(201)
        .json({ id: review.id, message: 'Review created successfully.' });
    } catch (e) {
      if ((e as Error).message.includes('duplicate key')) {
        res.status(400).send('You have already written a review.');
        return;
      }

      res
        .status(400)
        .send(
          `Unable to create review. ${(e as Error).message ? (e as Error).message : ''}`
        );
    }
  }

  async function deleteReview(req: Request, res: Response) {
    const { userId } = req;
    const id = parseInt(req.params.id, 10);

    if (!id || typeof id !== 'number') {
      res.status(400).send('Invalid id parameter.');
      return;
    }

    await performActionIfOwner(res, userId!, id, reviewRepo, async () => {
      await reviewRepo.delete({ id });
      res.status(200).send('Review deleted successfully.');
    });
  }

  async function updateReview(req: Request, res: Response) {
    const { userId } = req;
    const id = parseInt(req.params.id, 10);

    if (!id || typeof id !== 'number') {
      res.status(400).send('Invalid id parameter.');
      return;
    }

    const { stars, reviewText } = req.body;

    if (
      !(
        stars &&
        reviewText &&
        typeof stars === 'number' &&
        typeof reviewText === 'string' &&
        (stars >= 1 || stars <= 5)
      )
    ) {
      res.status(400).send('Please provide stars and review.');
      return;
    }

    await performActionIfOwner(res, userId!, id, reviewRepo, async () => {
      await reviewRepo.update(id, { reviewText, stars });
      res.status(200).json({ id, message: 'Review updated successfully.' });
    });
  }

  return {
    getReviews,
    getUserReview,
    createReview,
    updateReview,
    deleteReview,
  };
};
