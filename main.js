//imports
import express from 'express'
import cors from 'cors'
import { json } from 'express'
import routes from './routes'
import { dataSource } from './db/config';

dataSource
  .initialize()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Unable to connect to database', err);
  })


//iniciar express
const app = express();
const port = Number(process.env.PORT || 8080);
//middlewares
app.use(cors());

app.use(json())
app.use('users', routes)

app.get('/', (req, res) => {
  console.log('get /');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
