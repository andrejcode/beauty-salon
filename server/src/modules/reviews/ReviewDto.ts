import UserDto from '../users/UserDto';

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
    user?: any
  ) {
    this.id = id;
    this.reviewText = reviewText;
    this.stars = stars;
    this.updatedAt = updateAt;

    if (user) {
      this.user = user;
    }
  }
}
