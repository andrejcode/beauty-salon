import { describe, it, expect, afterAll, afterEach } from 'vitest';
import supertest from 'supertest';
import createApp from '../../app';
import { createTestDatabase } from '../../../tests/utils/createTestDatabase';
import { Appointment, Employee, Review, User } from '../../entities';
import { getCurrentDateAsString } from '../../../tests/utils';

const database = await createTestDatabase();
const app = createApp(database);

const reviewRepo = database.getRepository(Review);
const userRepo = database.getRepository(User);
const appointmentRepo = database.getRepository(Appointment);
const employeeRepo = database.getRepository(Employee);

afterEach(() => {
  reviewRepo.delete({});
  userRepo.delete({});
  appointmentRepo.delete({});
  employeeRepo.delete({});
});

afterAll(() => {
  database.destroy();
});

describe('authenticaded user', () => {
  it('can create and get appointments', async () => {
    const email = 'test@test.com';
    const signupResponse = await supertest(app)
      .post('/users/signup')
      .send({
        firstName: 'test',
        lastName: 'test',
        email,
        password: 'TestTest123',
      })
      .expect(200);

    const { token } = signupResponse.body;

    const user = await userRepo.findOne({ where: { email } });

    const employee = await employeeRepo.save({
      firstName: 'Mikey',
      lastName: 'Mike',
      email: 'mikey.mike@gmail.com',
      description: 'desc',
    });

    const currentDate = getCurrentDateAsString();

    const createResponse = await supertest(app)
      .post('/appointments/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: user?.id,
        employeeId: employee.id,
        date: currentDate,
        time: '15:00:00',
        duration: 30,
        services: ['service 1'],
      })
      .expect(201);

    expect(createResponse.text).toEqual('Appointment successfully created.');

    // We created appointment at 15:00 that is 30 mins long
    // We can test that times are occupied
    const availableTimesResponse = await supertest(app)
      .get('/appointments/available')
      .set('Authorization', `Bearer ${token}`)
      .send({
        employeeId: employee.id,
        date: currentDate,
        duration: 30,
      })
      .expect(200);

    expect(availableTimesResponse.body).not.toContain('14:30:00');
    expect(availableTimesResponse.body).not.toContain('15:00:00');
    expect(availableTimesResponse.body).not.toContain('15:30:00');

    const appointmentsResponse = await supertest(app)
      .get('/appointments/')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(appointmentsResponse.body).not.toBeNull();
  }, 10000);
});
