import { describe, it, expect, afterAll, afterEach } from 'vitest';
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

afterEach(() => {
  userRepo.delete({});
  appointmentRepo.delete({});
  employeeRepo.delete({});
  businessTimeRepo.delete({});
});

afterAll(() => {
  database.destroy();
});

describe('authenticated user', () => {
  it('can create, read and delete appointments', async () => {
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
      breakStartTime: '14:00:00',
      breakEndTime: '14:30:00',
    });

    const businessTime = await businessTimeRepo.save({
      id: 1,
      startTime: '09:30:00',
      endTime: '18:00:00',
      offDays: ['Saturday', 'Sunday'],
    });

    const workingDate = getWorkingDayDate(businessTime.offDays);

    const createResponse = await supertest(app)
      .post('/appointments/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: user!.id,
        employeeId: employee.id,
        date: workingDate,
        time: '12:00:00',
        duration: 30,
        services: ['service 1'],
      });

    expect(createResponse.text).toEqual('Appointment successfully created.');

    const availableTimesResponse = await supertest(app)
      .get(
        `/appointments/available?employeeId=${employee.id}&duration=30&date=${workingDate}`
      )
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    // We created appointment at 12:00 that is 30 mins long
    // We can test that times are occupied
    expect(availableTimesResponse.body).not.toContain('11:45:00');
    expect(availableTimesResponse.body).not.toContain('12:00:00');
    expect(availableTimesResponse.body).not.toContain('12:30:00');

    // Read appointments
    const appointmentsResponse = await supertest(app)
      .get('/appointments')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(appointmentsResponse.body).toBeDefined();

    // Delete appointment
    const appointmentId = appointmentsResponse.body[0].id;
    const deleteResponse = await supertest(app)
      .delete(`/appointments/${appointmentId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(deleteResponse.text).toEqual('Appointment deleted successfully.');
  }, 10000);
});
