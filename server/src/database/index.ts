import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataType, newDb } from 'pg-mem';
import * as entities from '../entities';

export function createDatabase(
  options: Partial<DataSourceOptions | { type: 'pg-mem' }>
) {
  if (options.type === 'pg-mem') {
    return createMemoryDatabase();
  }

  return new DataSource({
    entities,
    migrations: ['src/database/migrations/**/*.ts'],
    namingStrategy: new SnakeNamingStrategy(),
    ...options,
  } as any);
}

function createMemoryDatabase(): DataSource {
  const pgMemory = newDb();

  pgMemory.public.registerFunction({
    name: 'current_database',
    implementation: () => 'test',
  });

  pgMemory.public.registerFunction({
    name: 'version',
    implementation: () => '1',
  });

  pgMemory.public.registerFunction({
    name: 'obj_description',
    args: [DataType.regclass, DataType.text],
    returns: DataType.text,
    implementation: (_regclass, object_name) => `Description: ${object_name}`,
  });

  return pgMemory.adapters.createTypeormDataSource({
    type: 'postgres',
    entities,
    synchronize: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
  });
}

export type Database = DataSource;
