import { describe, it, afterAll, expect, afterEach } from 'vitest';
import supertest from 'supertest';
import createApp from '../../app';
import { createTestDatabase } from '../../../tests/utils/createTestDatabase';
import { User } from '../../entities';

const database = await createTestDatabase();
const app = createApp(database);

const userRepo = database.getRepository(User);

afterEach(() => {
  userRepo.delete({});
});

afterAll(() => {
  database.destroy();
});

describe('POST /users/signup', () => {
  it('should sign up the user', async () => {
    const email = 'email@email.com';
    const response = await supertest(app)
      .post('/users/signup')
      .send({
        firstName: 'firstName',
        lastName: 'lastName',
        email,
        password: 'Password123',
      })
      .expect(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 400 if email is invalid', async () => {
    const response = await supertest(app)
      .post('/users/signup')
      .send({
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'invalidemail',
        password: 'Password123',
      })
      .expect(400);
    expect(response.text).toEqual('Invalid email address.');
  });

  it('should return 400 if password is weak', async () => {
    const response = await supertest(app)
      .post('/users/signup')
      .send({
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email@email.com',
        password: 'weak',
      })
      .expect(400);
    expect(response.text).toEqual(
      'Weak password. Please choose a stronger password.'
    );
  });

  it('should return 400 when user with email already exists', async () => {
    const email = 'email@email.com';
    await userRepo.save({
      firstName: 'firstName',
      lastName: 'lastName',
      email,
      password: 'Password123',
    });

    const response = await supertest(app)
      .post('/users/signup')
      .send({
        firstName: 'firstName',
        lastName: 'lastName',
        email,
        password: 'Password123',
      })
      .expect(400);
    expect(response.text).toEqual('User with this email already exists.');
  });
});

describe('POST /login', () => {
  it('should return 401 if the email does not exist', async () => {
    const respone = await supertest(app)
      .post('/users/login')
      .send({
        email: 'nonexistingemail@email.com',
        password: 'Password123',
      })
      .expect(401);
    expect(respone.text).toEqual(
      'We could not find an account with this email address.'
    );
  });

  it('should return 401 if the password does not match', async () => {
    const email = 'email@email.com';
    await userRepo.save({
      firstName: 'firstName',
      lastName: 'lastName',
      email,
      password: 'Password123',
    });

    const respone = await supertest(app)
      .post('/users/login')
      .send({
        email,
        password: 'WrongPassword123',
      })
      .expect(401);
    expect(respone.text).toEqual('Incorrect password. Try again.');
  });
});

describe('GET /users/profile', () => {
  it('should return 403 when token is invalid', async () => {
    await supertest(app)
      .get('/users/profile')
      .set('Authorization', `Bearer invalid-token`)
      .expect(401);
  });
});
