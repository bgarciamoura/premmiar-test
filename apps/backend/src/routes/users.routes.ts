import { Router } from 'express';
import { prisma } from '../infra/PrismaClient';

import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/UserService';
import { authMiddleware } from '../middleware/AuthMiddleware';

const usersRoutes = Router();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

usersRoutes.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await userService.getAll();

    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
});

usersRoutes.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
});

usersRoutes.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userToSave = {
      name,
      email,
      password,
    };

    const result = await userService.create(userToSave);

    if (result) {
      return res.status(201).json({ message: 'User created' });
    }

    return res.status(400).json({ message: 'User not created' });
  } catch (error) {
    console.log(error);
  }
});

usersRoutes.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const userToUpdate = {
      name,
      email,
      password,
      id,
    };

    const result = await userService.update(userToUpdate);
    return res.json({ result: result ? 'User updated' : 'User not updated' });
  } catch (error) {
    console.log(error);
  }
});

usersRoutes.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.delete(id);
    res.json({ result: result ? 'User deleted' : 'User not deleted' });
  } catch (error) {
    console.log(error);
  }
});

export { usersRoutes };
