import dotenv from 'dotenv';
import 'reflect-metadata';
dotenv.config();

import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  entities: [`${__dirname}/**/entities/*{.ts,.js}`],
  migrations: [`${__dirname}/**/migrations/*{.ts,.js}`],
  host: process.env['DB_HOST'],
  database: process.env['DB_NAME'],
  username: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  port: 5432,
  synchronize: true
});
