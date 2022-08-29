import { User } from '@prisma/client';
import { compareHash, hashSync } from '../helpers/HashPassword';
import { IUserRepository } from '../interfaces/IUserRepository';

class UserService {
  repository: IUserRepository<User>;
  constructor(repository: IUserRepository<User>) {
    this.repository = repository;
  }

  async getAll(): Promise<User[] | undefined> {
    return this.repository.getAll();
  }

  async getById(id: string): Promise<User | undefined> {
    return this.repository.getById(id);
  }

  async create(user: Partial<User>): Promise<boolean | undefined> {
    if (user && user.password) {
      user.password = await hashSync(user.password, 10);
      return this.repository.create(user);
    }
  }

  async update(user: Partial<User>): Promise<boolean | undefined> {
    if (user && user.password) {
      user.password = await hashSync(user.password, 10);
      return this.repository.update(user);
    }
  }

  async delete(id: string): Promise<boolean | undefined> {
    return this.repository.delete(id);
  }

  async getByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | undefined> {
    const user = await this.repository.getByEmail(email);
    if (!user) {
      return;
    }
    if (!(await compareHash(password, user.password))) {
      return;
    }
    return user;
  }
}

export { UserService };
