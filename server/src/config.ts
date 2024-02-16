import 'dotenv/config';
import { z } from 'zod';

const { env } = process;

if (!env.NODE_ENV) env.NODE_ENV = 'development';

const isTest = env.NODE_ENV === 'test';
const isDevTest = env.NODE_ENV === 'development' || isTest;

const isInMemory = env.DB_TYPE === 'pg-mem';

const schema = z
  .object({
    env: z
      .enum(['development', 'production', 'staging', 'test'])
      .default('development'),
    port: z.coerce.number().default(3000),
    database: z.object({
      type: z
        .enum(['postgres', 'mysql', 'better-sqlite3', 'pg-mem'])
        .default('postgres'),
      host: z.string().default('localhost'),
      port: z.coerce.number().default(5432),
      database: isInMemory ? z.string().optional() : z.string(),
      username: isInMemory ? z.string().optional() : z.string(),
      password: isInMemory ? z.string().optional() : z.string(),
      logging: z.preprocess(coerceBoolean, z.boolean().default(isDevTest)),
      synchronize: z.preprocess(coerceBoolean, z.boolean().default(isDevTest)),
    }),
    tokenKey: z.string(),
  })
  .readonly();

const config = schema.parse({
  env: env.NODE_ENV,
  port: env.PORT,

  database: {
    type: env.DB_TYPE,
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    logging: env.DB_LOGGING,
    synchronize: env.DB_SYNC,
  },

  tokenKey: env.TOKEN_KEY,
});

export default config;

function coerceBoolean(value: unknown) {
  if (typeof value === 'string') {
    return value === 'true' || value === '1';
  }

  return undefined;
}
