import IRepository from '../interfaces/IRepository';
import { Card, PrismaClient } from '@prisma/client';
import { ICardRepository } from '../interfaces/ICardRepository';

class CardsRepository implements ICardRepository<Card> {
  private databaseHandler: PrismaClient;

  constructor(databaseHandler: PrismaClient) {
    this.databaseHandler = databaseHandler;
  }

  async getAllCardsForUser(id: string): Promise<Card[] | undefined> {
    try {
      const cards = await this.databaseHandler.card.findMany({
        where: {
          userId: id,
        },
      });

      if (cards) {
        return cards;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id: string): Promise<Card | undefined> {
    try {
      const card = await this.databaseHandler.card.findFirst({
        where: {
          id,
        },
      });

      if (card) {
        return card;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async create(card: Card): Promise<boolean | undefined> {
    try {
      const newCard = await this.databaseHandler.card.create({
        data: {
          ...card,
        },
      });

      console.log(newCard);

      return newCard ? true : false;
    } catch (error) {
      console.log(error);
    }
  }

  async update(card: Card): Promise<boolean | undefined> {
    try {
      const updatedCard = await this.databaseHandler.card.update({
        where: {
          id: card.id,
        },
        data: {
          ...card,
        },
      });

      return updatedCard ? true : false;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: string): Promise<boolean | undefined> {
    try {
      const deletedCard = await this.databaseHandler.card.delete({
        where: {
          id,
        },
      });

      return deletedCard ? true : false;
    } catch (error) {
      console.log(error);
    }
  }
}

export { CardsRepository };
