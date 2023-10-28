import { PrismaClient } from '@prisma/client';

export const seedSubscriptionPlans = async (prisma: PrismaClient) => {
  await prisma.subscriptionPlan.createMany({
    data: [
      {
        id: 1,
        name: 'Free Plan',
        description: 'Description for Beginner Grower Plan',
        monthlyPrice: 0,
        yearlyPrice: 0,
        stripeMonthlyPriceId: null,
        stripeYearlyPriceId: null,
        productId: null,
        growSpaces: 2,
        activeGrowCycles: 4,
        plantsPerGrowCycle: 4,
      },
      {
        id: 2,
        name: 'Grower Plan',
        description: 'Description for Beginner Grower Plan',
        monthlyPrice: 4.99,
        yearlyPrice: 47.9,
        stripeMonthlyPriceId: 'price_1NfXL8EHJZQJszDES3YCkk5k',
        stripeYearlyPriceId: 'price_1NfXLdEHJZQJszDEnja65xog',
        productId: 'prod_O9UidXoqDA9sek',
        growSpaces: 4,
        activeGrowCycles: 8,
        plantsPerGrowCycle: 8,
      },
    ],
  });
};
