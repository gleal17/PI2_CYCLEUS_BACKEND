import { express, json } from 'express'
import cors from 'cors'

import routes from 'routes.js'
import { AppDataSource } from './database/config';

AppDataSource.initialize().then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Unable to connect to database', err);
  })

const app = express();
const port = Number(process.env.PORT || 4002);

app.use(cors());

app.use(json())
app.use('users', routes)

app.get('/', (req, res) => {
  console.log('get /');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
