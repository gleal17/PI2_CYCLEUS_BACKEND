import 'reflect-metadata';
import express, { json } from 'express';
<<<<<<< HEAD
import { dataSource } from './config';
import cors from 'cors';
import { lock, user } from './handlers';
=======
import { routes } from './routes';
import { dataSource } from './config';
import cors from 'cors';
>>>>>>> 34dad58743e7e5dc28271bf34f601731c54796e9

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

<<<<<<< HEAD
// Middlewares
app.use(cors());
app.use(json());

// Rotas
app.use('/user', user);
app.use('/lock', lock);

app.listen(port, () => console.log(`rodando na porta ${port}`));
=======
app.use(cors());

app.use(json());
app.use('/user', routes);

app.listen(port, '0.0.0.0', () => console.log(`rodando na porta ${port}`));
>>>>>>> 34dad58743e7e5dc28271bf34f601731c54796e9
