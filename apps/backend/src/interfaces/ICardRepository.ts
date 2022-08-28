import IRepository from './IRepository';

interface ICardRepository<T> extends IRepository<T> {
  getAllCardsForUser(id: string): Promise<T[] | undefined>;
}

export type { ICardRepository };
