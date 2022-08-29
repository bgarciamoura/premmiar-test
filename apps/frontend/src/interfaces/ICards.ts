interface ICards {
  id: string;
  name: string;
  cmc: number;
  type: string;
  rarity: string;
  text: string;
  artist: string;
  power: number;
  toughness: number;
  createdAt: Date;
  updatedAt: Date;
}

export type { ICards };
