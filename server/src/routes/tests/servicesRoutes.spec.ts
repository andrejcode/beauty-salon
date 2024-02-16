import { describe, it, expect, afterAll, afterEach } from 'vitest';
import supertest from 'supertest';
import { Service } from '../../entities';
import { createTestDatabase } from '../../../tests/utils/createTestDatabase';
import createApp from '../../app';
import serviceData from '../../database/seed/utils/serviceData';

const database = await createTestDatabase();
const app = createApp(database);

const serviceRepo = database.getRepository(Service);

afterEach(() => {
  serviceRepo.delete({});
});

afterAll(() => {
  database.destroy();
});

describe('/services', () => {
  it('should return empty array when there are no services', async () => {
    const response = await supertest(app).get('/services').expect(200);

    expect(response.body).toEqual([]);
  });

  it('should return services', async () => {
    await serviceRepo.save(serviceData);

    const response = await supertest(app).get('/services').expect(200);

    expect(response.body.length).not.toBe(0);
  });
});
