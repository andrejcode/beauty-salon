import 'dotenv/config';
import { z } from 'zod';

const { env } = process;

export const port = env.PORT;

const schema = z
  .object({
    port: z.coerce.number().default(3000),
    database: z.object({
      host: z.string().default('localhost'),
      port: z.coerce.number().default(5432),
      database: z.string(),
      username: z.string(),
      password: z.string(),
    }),
  })
  .readonly();

const config = schema.parse({
  port: env.PORT,

  database: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
  },
});

export default config;
