import config from '../../../src/config';
import { createDatabase } from '../../../src/database';

export async function createTestDatabase() {
  const db = createDatabase(config.database);

  await db.initialize();

  return db;
}
