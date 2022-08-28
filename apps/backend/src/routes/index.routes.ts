import express from 'express';
import { usersRoutes } from './users.routes';
import { authRoutes } from './auth.routes';
import { cardsRoutes } from './cards.routes';

const apiRoutes = express.Router();

apiRoutes.use('/users', usersRoutes);
apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/cards', cardsRoutes);

export { apiRoutes };
