import { PrismaClient } from '@prisma/client';

export const seedTerpenes = async (prisma: PrismaClient) => {
  await prisma.terpene.createMany({
    data: [
      {
        id: 1,
        name: 'Myrcene',
      },
      {
        id: 2,
        name: 'Pinene',
      },
      {
        id: 3,
        name: 'Limonene',
      },
      {
        id: 4,
        name: 'Caryophyllene',
      },
      {
        id: 5,
        name: 'Linalool',
      },
      {
        id: 6,
        name: 'Camphene',
      },
      {
        id: 7,
        name: 'Terpinolene',
      },
      {
        id: 8,
        name: 'Bisabolol',
      },
      {
        id: 9,
        name: 'Bornelol',
      },
      {
        id: 10,
        name: 'Delta 3 Carene',
      },
      {
        id: 11,
        name: 'Eucalyptol',
      },
      {
        id: 12,
        name: 'Geraniol',
      },
      {
        id: 13,
        name: 'Humulene',
      },
      {
        id: 14,
        name: 'Phytol',
      },
      {
        id: 15,
        name: 'Terpineol',
      },
      {
        id: 16,
        name: 'Trans-Nerolidol',
      },
      {
        id: 17,
        name: 'Valencene',
      },
    ],
  });
};
