import { Review, User } from '../../entities';
import UserDto, { mapUserToDto } from '../users/UserDto';

export default class ReviewDto {
  id: number;

  reviewText: string;

  stars: number;

  updatedAt: Date;

  user?: UserDto;

  constructor(
    id: number,
    reviewText: string,
    stars: number,
    updateAt: Date,
    user?: User
  ) {
    this.id = id;
    this.reviewText = reviewText;
    this.stars = stars;
    this.updatedAt = updateAt;

    if (user) {
      this.user = mapUserToDto(user);
    }
  }
}

export function mapReviewToDto(review: Review): ReviewDto {
  return new ReviewDto(
    review.id,
    review.reviewText,
    review.stars,
    review.updatedAt,
    review.user
  );
}
