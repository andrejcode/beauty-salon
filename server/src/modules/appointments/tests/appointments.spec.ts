import { describe, it, expect, afterAll } from 'vitest';
import supertest from 'supertest';
import { createTestDatabase } from '@tests/utils/createTestDatabase';
import { getWorkingDayDate } from '@tests/utils';
import createApp from '@/app';
import { Appointment, BusinessTime, Employee, User } from '@/entities';

const database = await createTestDatabase();
const app = createApp(database);

const userRepo = database.getRepository(User);
const appointmentRepo = database.getRepository(Appointment);
const employeeRepo = database.getRepository(Employee);
const businessTimeRepo = database.getRepository(BusinessTime);

let token: string;
let employeeId: number;
let workingDate: string;

beforeAll(async () => {
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
  token = signupResponse.body.token;

  await userRepo.findOne({ where: { email } });

  const employee = await employeeRepo.save({
    firstName: 'Mikey',
    lastName: 'Mike',
    email: 'mikey.mike@gmail.com',
    description: 'desc',
    breakStartTime: '14:00:00',
    breakEndTime: '14:30:00',
  });
  employeeId = employee.id;

  const businessTime = await businessTimeRepo.save({
    startTime: '09:30:00',
    endTime: '18:00:00',
    offDays: ['Saturday', 'Sunday'],
  });
  workingDate = getWorkingDayDate(businessTime.offDays);
});

afterAll(() => {
  userRepo.delete({});
  appointmentRepo.delete({});
  employeeRepo.delete({});
  businessTimeRepo.delete({});

  database.destroy();
});

describe('appointments', () => {
  it('user can create, read and delete appointments', async () => {
    const createResponse = await supertest(app)
      .post('/appointments/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        employeeId,
        date: workingDate,
        time: '12:00:00',
        duration: 30,
        services: ['service 1'],
      });
    expect(createResponse.status).toBe(201);
    expect(createResponse.text).toBe('Appointment successfully created.');

    const availableTimesResponse = await supertest(app)
      .get(
        `/appointments/available?employeeId=${employeeId}&duration=30&date=${workingDate}`
      )
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    // We created appointment at 12:00 that is 30 mins long
    // We can test that times are occupied
    expect(availableTimesResponse.body).not.toContain('11:45:00');
    expect(availableTimesResponse.body).not.toContain('12:00:00');
    expect(availableTimesResponse.body).not.toContain('12:30:00');

    const appointmentsResponse = await supertest(app)
      .get('/appointments')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(appointmentsResponse.body).toBeDefined();

    const appointmentId = appointmentsResponse.body[0].id;
    const deleteResponse = await supertest(app)
      .delete(`/appointments/${appointmentId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(deleteResponse.text).toBe('Appointment deleted successfully.');
  });

  it('user cannot create an appointment because of unique constraint', async () => {
    await appointmentRepo.save({
      date: workingDate,
      time: '16:00:00',
      durationInMinutes: 30,
      priceInCents: 1000,
      services: ['service 1'],
      userId: 1,
      employeeId,
    });

    const createResponse = await supertest(app)
      .post('/appointments/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        employeeId,
        date: workingDate,
        time: '16:00:00',
        duration: 30,
        services: ['service 1'],
      });
    expect(createResponse.status).toBe(400);
    expect(createResponse.text).toBe(
      'The selected time is no longer available. Please choose another slot.'
    );
  });
});
