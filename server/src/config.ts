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
      type: z.enum(['postgres', 'pg-mem']).default('postgres'),
      host: z.string().default('localhost'),
      port: z.coerce.number().default(5432),
      database: isInMemory ? z.string().optional() : z.string(),
      username: isInMemory ? z.string().optional() : z.string(),
      password: isInMemory ? z.string().optional() : z.string(),
      logging: z.preprocess(coerceBoolean, z.boolean().default(isDevTest)),
      synchronize: z.preprocess(coerceBoolean, z.boolean().default(isDevTest)),
      extra: z.object({
        sslmode: z.string().default('require'),
        ssl: z.preprocess(coerceBoolean, z.boolean().default(!isDevTest)),
      }),
    }),
    tokenKey: z.string().default(() => {
      if (isDevTest) {
        return 'tokenkey';
      }

      throw new Error('You must provide a token key in production env!');
    }),
    adminEmail: z.string().default(() => {
      if (isDevTest) {
        return 'admin@admin.com';
      }

      throw new Error('You must provide an admin email in production env!');
    }),
    adminPassword: z.string().default(() => {
      if (isDevTest) {
        return 'Admin123';
      }

      throw new Error('You must provide an admin password in production env!');
    }),
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
    extra: { ssl: env.DB_SSL },
  },

  tokenKey: env.TOKEN_KEY,

  adminEmail: env.ADMIN_EMAIL,
  adminPassword: env.ADMIN_PASSWORD,
});

export default config;

function coerceBoolean(value: unknown) {
  if (typeof value === 'string') {
    return value === 'true' || value === '1';
  }

  return undefined;
}
