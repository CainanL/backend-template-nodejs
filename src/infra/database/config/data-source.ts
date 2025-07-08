import 'reflect-metadata';
import { DataSource } from 'typeorm'; // ajuste os imports conforme seus módulos
import * as  dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '12345678',
  database: process.env.DB_NAME || 'postgres',
  entities: [__dirname + "/../../../domain/entities/*.entity.{ts,js}"],
  migrations: [__dirname + "/../migrations/*.{ts,js}"],
  synchronize: false,
});