import jwt from 'jsonwebtoken';
import config from '../configuration';
import { blacklist, isBlacklisted } from '../helpers/TokenBlacklist';

class AuthService {
  public async generateToken(userId: string): Promise<string> {
    const token = jwt.sign({ userId }, config.jwt.secret, {
      expiresIn: '1d',
    });

    return token;
  }

  public async blacklistToken(token: string): Promise<void> {
    await blacklist(token);
  }

  public async isBlacklisted(token: string): Promise<boolean> {
    return await isBlacklisted(token);
  }

  public async logout(authHeader: string): Promise<boolean> {
    const [, token] = authHeader.split(' ');
    await this.blacklistToken(token);

    const result = await isBlacklisted(token);
    return result;
  }
}

export { AuthService };
