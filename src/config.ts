<<<<<<< HEAD
import dotenv from 'dotenv';
import 'reflect-metadata';
dotenv.config();
=======
import 'dotenv/config';
import 'reflect-metadata';
>>>>>>> 34dad58743e7e5dc28271bf34f601731c54796e9

import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  entities: [`${__dirname}/**/entities/*{.ts,.js}`],
  migrations: [`${__dirname}/**/migrations/*{.ts,.js}`],
<<<<<<< HEAD
  host: process.env['DB_HOST'],
  database: process.env['DB_NAME'],
  username: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  port: 5432,
  synchronize: true
=======
  password: 'admin',
  username: 'postgres',
  database: 'postgres',
  host: 'localhost',
  port: 5432
>>>>>>> 34dad58743e7e5dc28271bf34f601731c54796e9
});
