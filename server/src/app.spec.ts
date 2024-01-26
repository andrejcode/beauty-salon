import supertest from 'supertest';
import app from './app';

it('can launch the app', async () => {
  await supertest(app).get('/health').expect(200, 'OK');
});
