import config from '@/config';
import { createDatabase } from '@/database';

export async function createTestDatabase() {
  const db = createDatabase(config.database);

  await db.initialize();

  return db;
}
