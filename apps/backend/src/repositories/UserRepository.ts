import { IUserRepository } from '../interfaces/IUserRepository';
import { PrismaClient, User } from '@prisma/client';

class UserRepository implements IUserRepository<User> {
  private databaseHandler: PrismaClient;

  constructor(databaseHandler: PrismaClient) {
    this.databaseHandler = databaseHandler;
  }

  async getAll(): Promise<User[] | undefined> {
    try {
      const users = await this.databaseHandler.user.findMany();

      if (users) {
        return users;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id: string): Promise<User | undefined> {
    try {
      const user = await this.databaseHandler.user.findFirst({
        where: {
          id,
        },
      });

      if (user) {
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async create(user: User): Promise<boolean | undefined> {
    try {
      const newUser = await this.databaseHandler.user.create({
        data: {
          ...user,
        },
      });

      return newUser ? true : false;
    } catch (error) {
      console.log(error);
    }
  }

  async update(user: User): Promise<boolean | undefined> {
    try {
      const updatedUser = await this.databaseHandler.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...user,
        },
      });

      return updatedUser ? true : false;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: string): Promise<boolean | undefined> {
    try {
      const deletedUser = await this.databaseHandler.user.delete({
        where: {
          id,
        },
      });

      return deletedUser ? true : false;
    } catch (error) {
      console.log(error);
    }
  }

  async getByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.databaseHandler.user.findFirst({
        where: {
          email,
        },
      });

      if (user) {
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export { UserRepository };
