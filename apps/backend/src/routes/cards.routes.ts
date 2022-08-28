import { Router } from 'express';
import { prisma } from '../infra/PrismaClient';
import { authMiddleware } from '../middleware/AuthMiddleware';
import { CardsRepository } from '../repositories/CardsRepository';
import { CardsService } from '../services/CardsService';

const cardsRoutes = Router();
const cardsRepository = new CardsRepository(prisma);
const cardsService = new CardsService(cardsRepository);

cardsRoutes.get('/user-cards/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const cards = await cardsService.getAllCards(userId);
    return res.json({ cards });
  } catch (error) {
    console.log(error);
  }
});

cardsRoutes.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const card = await cardsService.getById(id);
    return res.json(card);
  } catch (error) {
    console.log(error);
  }
});

cardsRoutes.post('/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, cmc, type, rarity, text, artist, power, toughness } =
      req.body;

    const cardToSave = {
      name,
      cmc,
      type,
      rarity,
      text,
      artist,
      power: power ? power : null,
      toughness: toughness ? toughness : null,
      userId,
    };

    const result = await cardsService.create(cardToSave);
    return res.json({ result: result ? 'Card created' : 'Card not created' });
  } catch (error) {
    console.log(error);
  }
});

cardsRoutes.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cmc, type, rarity, text, artist, power, toughness } =
      req.body;
    const cardToUpdate = {
      name,
      cmc,
      type,
      rarity,
      text,
      artist,
      power: power ? power : null,
      toughness: toughness ? toughness : null,
      id,
    };

    const result = await cardsService.update(cardToUpdate);
    return res.json({ result: result ? 'Card updated' : 'Card not updated' });
  } catch (error) {
    console.log(error);
  }
});

cardsRoutes.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await cardsService.delete(id);
    res.json({ result: result ? 'Card deleted' : 'Card not deleted' });
  } catch (error) {
    console.log(error);
  }
});

export { cardsRoutes };
