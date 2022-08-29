import { Router } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/UserService';
import { AuthService } from '../services/AuthService';
import { prisma } from '../infra/PrismaClient';

const authRoutes = Router();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const authService = new AuthService();

authRoutes.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (userService) {
    const user = await userService.getByEmailAndPassword(email, password);

    if (!user) {
      return res
        .status(400)
        .json({ error: 'User not found, verify your data and try again' });
    }

    const token = await authService.generateToken(user.id);

    return res.status(200).json({ token, userId: user.id });
  } else {
    return res.status(500).json({ error: 'AuthService not found' });
  }
});

authRoutes.post('/logout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Token not provided' });
    }
    const result = await authService.logout(authHeader);
    if (!result) {
      return res.status(400).json({ error: 'Token invalid' });
    }
    return res.json({ message: 'Logout successful' });
  } catch (error) {
    console.log(error);
  }
});

export { authRoutes };
