import { createDatabase } from '.';
import config from '../config';

// DataSource used exclusively for TypeORM migrations
export const migrationDataSource = createDatabase(config.database);
