import { PrismaClient } from '@prisma/client';

export const seedAccessRole = async (prisma: PrismaClient) => {
  await prisma.accessRole.createMany({
    data: [
      {
        id: 1,
        createdAt: new Date(),
        name: 'admin',
        rank: 100,
        description: 'Shaman Admin',
      },
      {
        id: 2,
        createdAt: new Date(),
        name: 'staff',
        rank: 70,
        description: 'Shaman Staff',
      },
      {
        id: 3,
        createdAt: new Date(),
        name: 'breeder',
        rank: 20,
        description: 'Genetics breeder',
      },
      {
        id: 4,
        createdAt: new Date(),
        name: 'grower',
        rank: 10,
        description: 'Grower',
      },
    ],
  });
};
