import { describe, it, expect, afterAll, afterEach } from 'vitest';
import supertest from 'supertest';
import createApp from '../../../app';
import { createTestDatabase } from '../../../../tests/utils/createTestDatabase';
import { Review, User } from '../../../entities';

const database = await createTestDatabase();
const app = createApp(database);

const reviewRepo = database.getRepository(Review);
const userRepo = database.getRepository(User);

afterEach(() => {
  reviewRepo.delete({});
  userRepo.delete({});
});

afterAll(() => {
  database.destroy();
});

describe('/reviews', () => {
  it('should return 400 when stars and limit are not provided', async () => {
    const response = await supertest(app).get('/reviews').expect(400);

    expect(response.text).toEqual(
      'Please provide limit, stars and optionally skip.'
    );
  });

  it('should return empty array when no reviews', async () => {
    const response = await supertest(app)
      .get('/reviews?limit=10&stars=5')
      .expect(200);

    expect(response.body).toEqual([]);
  });

  it('it should return one rewiew', async () => {
    await userRepo.save([
      {
        id: 1,
        firstName: 'first',
        lastName: 'last',
        password: 'Password123',
        email: 'some@email.com',
      },
      {
        id: 2,
        firstName: 'first',
        lastName: 'last',
        password: 'Password123',
        email: 'email@email.com',
      },
    ]);

    await reviewRepo.save([
      { reviewText: 'Good review', stars: 5, userId: 1 },
      { reviewText: 'Very good review', stars: 5, userId: 2 },
    ]);

    const resposne = await supertest(app)
      .get('/reviews?limit=2&stars=5&skip=1')
      .expect(200);

    expect(resposne.body.length).toEqual(1);
  });
});

describe('authenticated user', () => {
  it('can create, read, update and delete the review', async () => {
    // Signup user
    const signupResponse = await supertest(app)
      .post('/users/signup')
      .send({
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.com',
        password: 'TestTest123',
      })
      .expect(200);

    const { token } = signupResponse.body;

    // Create review
    const createResponse = await supertest(app)
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send({ stars: 5, reviewText: 'Awesome review' })
      .expect(201);

    expect(createResponse.body.message).toEqual('Review created successfully.');

    // Read review
    const reviewResponse = await supertest(app)
      .get('/reviews/user')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(reviewResponse).not.toBeNull();

    // Update review
    const updateRespone = await supertest(app)
      .patch(`/reviews/${createResponse.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ stars: 1, reviewText: 'Bad review' })
      .expect(200);

    expect(updateRespone.body.message).toEqual('Review updated successfully.');

    // Delete review
    const deleteResponse = await supertest(app)
      .delete(`/reviews/${createResponse.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(deleteResponse.text).toEqual('Review deleted successfully.');
  }, 10000);
});
