import 'dotenv/config'
import 'reflect-metadata'

import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [`${__dirname}/**/entities/*{.ts, .js}`],
  migrations: [`${__dirname}/**/migrations/*{.ts, .js}`]
})