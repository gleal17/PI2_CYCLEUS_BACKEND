import 'reflect-metadata';
import express, { json } from 'express';
import { dataSource } from './config';
import cors from 'cors';
import { lock, user } from './handlers';

dataSource
  .initialize()
  .then(() => {
    console.log('DataSource has been initialized!');
  })
  .catch(err => {
    console.error('Error DataSource:', err);
  });

const port = Number(process.env.PORT) || 4001;
const app = express();

// Middlewares
app.use(cors());
app.use(json());

// Rotas
app.use('/user', user);
app.use('/lock', lock);

app.listen(port, () => console.log(`rodando na porta ${port}`));
