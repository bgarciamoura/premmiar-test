import { Card } from '@prisma/client';
import { ICardRepository } from '../interfaces/ICardRepository';

class CardsService {
  repository: ICardRepository<Card>;
  constructor(repository: ICardRepository<Card>) {
    this.repository = repository;
  }

  async getAllCards(id: string): Promise<Card[] | undefined> {
    return this.repository.getAllCardsForUser(id);
  }

  async getById(id: string): Promise<Card | undefined> {
    return this.repository.getById(id);
  }

  async create(card: Partial<Card>): Promise<boolean | undefined> {
    if (card) {
      return this.repository.create(card);
    }
  }

  async update(card: Partial<Card>): Promise<boolean | undefined> {
    if (card) {
      return this.repository.update(card);
    }
  }

  async delete(id: string): Promise<boolean | undefined> {
    return this.repository.delete(id);
  }
}

export { CardsService };
