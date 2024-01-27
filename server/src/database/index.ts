import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as entities from '../entities';

export function createDatabase(options: Partial<DataSourceOptions>) {
  return new DataSource({
    type: 'postgres',
    synchronize: true,
    logging: false,
    entities,
    migrations: [],
    namingStrategy: new SnakeNamingStrategy(),
    ...options,
  } as any);
}

export type Database = DataSource;
