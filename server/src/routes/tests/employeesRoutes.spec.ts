import { describe, it, expect, afterAll, afterEach } from 'vitest';
import supertest from 'supertest';
import { Employee } from '../../entities';
import createApp from '../../app';
import { createTestDatabase } from '../../../tests/utils/createTestDatabase';
import employeeData from '../../database/seed/utils/employeeData';

const database = await createTestDatabase();
const app = createApp(database);

const employeeRepo = database.getRepository(Employee);

afterEach(() => {
  employeeRepo.delete({});
});

afterAll(() => {
  database.destroy();
});

describe('/employees', () => {
  it('should return empty array when there are no employees', async () => {
    const response = await supertest(app).get('/employees').expect(200);

    expect(response.body).toEqual([]);
  });

  it('should return employees', async () => {
    await employeeRepo.save(employeeData);

    const response = await supertest(app).get('/employees').expect(200);

    expect(response.body.length).not.toBe(0);
  });
});
