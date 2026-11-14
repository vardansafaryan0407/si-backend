import { SequelizeModuleOptions } from '@nestjs/sequelize';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Database connection. Every value comes from the environment (see .env.example).
 * Schema changes go through database/migrations; `synchronize` is a local-development
 * convenience only and is never enabled in production.
 */
export const CONFIG_DB: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root',
  database: process.env.DB_NAME ?? 'si-core',
  autoLoadModels: true,
  synchronize: !isProduction && process.env.DB_SYNC === 'true',
  logging: false,
};
