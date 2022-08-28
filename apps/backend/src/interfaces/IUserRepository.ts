import IRepository from './IRepository';

interface IUserRepository<T> extends IRepository<T> {
  getAll(): Promise<T[] | undefined>;

  getByEmail(email: string): Promise<T | undefined>;
}

export type { IUserRepository };
