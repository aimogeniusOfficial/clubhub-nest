import { PrismaClient } from '@prisma/client';

export const seedFlavors = async (prisma: PrismaClient) => {
  await prisma.flavor.createMany({
    data: [
      {
        id: 1,
        name: 'Earthy',
      },
      {
        id: 2,
        name: 'Skunky',
      },
      {
        id: 4,
        name: 'Citrus',
      },
      {
        id: 5,
        name: 'Pine',
      },
      {
        id: 6,
        name: 'Fruity',
      },
      {
        id: 7,
        name: 'Diesel',
      },
      {
        id: 8,
        name: 'Woody',
      },
      {
        id: 9,
        name: 'Herbal',
      },
      {
        id: 10,
        name: 'Cheese',
      },
      {
        id: 11,
        name: 'Tropical',
      },
      {
        id: 12,
        name: 'Blueberry',
      },
      {
        id: 13,
        name: 'Lavender',
      },
    ],
  });
};
