import { describe, it, expect, afterAll, afterEach } from 'vitest';
import supertest from 'supertest';
import { BusinessTime } from '../../../entities';
import createApp from '../../../app';
import { createTestDatabase } from '../../../../tests/utils/createTestDatabase';
import businessData from '../../../database/seed/utils/businessData';

const database = await createTestDatabase();
const app = createApp(database);

const businessTimeRepo = database.getRepository(BusinessTime);

afterEach(() => {
  businessTimeRepo.delete({});
});

afterAll(() => {
  database.destroy();
});

describe('/business-times', () => {
  it('should return 204 when there is no business times', async () => {
    await supertest(app).get('/business-times').expect(204);
  });

  it('should return business time', async () => {
    await businessTimeRepo.save(businessData);
    const response = await supertest(app).get('/business-times').expect(200);
    expect(response.body.id).toEqual(1);
  });
});
