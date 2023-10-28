import { PrismaClient } from '@prisma/client';
import { seedAccessRole } from './seed/seed-access-roles';
import { seedSubscriptionPlans } from './seed/seed-subscription-plans';
import { seedFeatureFlags } from './seed/seed-feature-flags';
import { seedFlavors } from './seed/seed-flavors';
import { seedTerpenes } from './seed/seed-terpenes';

const prisma = new PrismaClient();

async function seed() {
  try {
    await seedAccessRole(prisma);
    await seedSubscriptionPlans(prisma);
    await seedFeatureFlags(prisma);
    await seedFlavors(prisma);
    await seedTerpenes(prisma);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .then(() => {
    console.log('Seed successful');
  })
  .catch((error) => {
    console.error(`Seed failed: ${error.message}`);
  });
