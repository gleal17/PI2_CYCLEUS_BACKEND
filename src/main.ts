import 'reflect-metadata';
import express, { json } from 'express';
import { routes } from './routes';
import { dataSource } from './config';
import cors from 'cors';

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

app.use(cors());

app.use(json());
app.use('/user', routes);

app.listen(port, '0.0.0.0', () => console.log(`rodando na porta ${port}`));
