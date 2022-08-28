//authorization middleware
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../configuration';
import { isBlacklisted } from '../helpers/TokenBlacklist';

interface ITokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as ITokenPayload;

    if (!decoded) {
      return res.status(401).json({ error: 'Token invalid' });
    }

    if (await isBlacklisted(token)) {
      return res.status(401).json({ error: 'Token invalid or blacklisted' });
    }

    if (decoded.exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({ error: 'Token expired' });
    }

    return next();
  } catch (error) {
    return res.status(401).json({ error: `Token invalid error: ${error}` });
  }
};
