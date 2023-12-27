import * as process from 'process';
import { JwtModuleOptions } from '@nestjs/jwt';
import { configType } from './config.type';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

export const envFile: configType = {
  dbHost: process.env.DB_HOST || 'localhost',
  dbDatabase: process.env.DB_DATABASE || 'learn-mvp',
  dbPassword: process.env.DB_PASSWORD || 'root',
  dbPort: Number(process.env.DB_PORT) || 5432,
  dbUsername: process.env.DB_USERNAME || 'root',
  dbLog: Boolean(process.env.DB_LOG) || true,
  appPort: Number(process.env.APP_PORT) || 4000,
  jwtExpiresIn: process.env.JWT_EXPIRES || '7d',
  appPrefix: process.env.APP_PREFIX || '/api',
  swaggerUi: process.env.SWAGGER_UI || '/doc',
  jwtSecret: process.env.JWT_KEY || 'someSecret',
  appHost: process.env.APP_HOST || 'http://localhost:4000',
  swaggerEnable: Boolean(process.env.SWAGGER_ENABLE) || true,
};

export const dbConnectionOptions: DataSourceOptions = {
  type: 'postgres',
  host: envFile.dbHost,
  port: envFile.dbPort,
  username: envFile.dbUsername,
  password: envFile.dbPassword,
  database: envFile.dbDatabase,
  migrationsRun: true,
  logging: envFile.dbLog ? 'all' : ['error', 'warn'],
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  subscribers: [__dirname + '/../**/*.subscriber.{ts,js}'],
};

export const jwtOptions: JwtModuleOptions = {
  secret: envFile.jwtSecret,
  signOptions: {
    expiresIn: envFile.jwtExpiresIn,
  },
};

export default () => ({
  envFile: envFile,
  database: dbConnectionOptions,
  jwt: jwtOptions,
});
