import cors from 'cors';
import express from 'express';
import config from './configuration';
import { apiRoutes } from './routes/index.routes';

const app = express();
const PORT = config.server.port || 3333;

app.use(express.json());
app.use(cors());
app.use('/api', apiRoutes);

app.use('/api-docs', () => {});

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to the API',
    version: '1.0.0',
  });
});

export { PORT, app };
