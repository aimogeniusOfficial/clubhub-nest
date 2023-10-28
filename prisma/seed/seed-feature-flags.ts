import { PrismaClient } from '@prisma/client';

export const seedFeatureFlags = async (prisma: PrismaClient) => {
  await prisma.featureFlag.create({
    data: {
      id: 1,
      name: 'INVITE_ONLY_SIGNUP',
      description: 'Controls how users signup open or invitation only',
      isEnabled: false,
    },
  });
};
