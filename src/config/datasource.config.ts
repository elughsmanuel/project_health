import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_NAME),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/**/migrations/*.js'],
  logging: false,
  synchronize: false,
  migrationsRun: false,
});
