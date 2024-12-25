import supertest from 'supertest';
import { it, afterAll, describe } from 'vitest';
import createApp from '@/app';
import { createTestDatabase } from './utils/createTestDatabase';

const database = await createTestDatabase();
const app = createApp(database);

afterAll(() => {
  database.destroy();
});

describe('route', () => {
  it('/health should return 200', async () => {
    await supertest(app).get('/health').expect(200);
  });

  it('should return 404 when not found', async () => {
    await supertest(app).get('/not-found').expect(404);
  });
});
