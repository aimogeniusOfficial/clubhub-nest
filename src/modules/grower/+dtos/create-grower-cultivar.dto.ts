import { GrowthType, SeedType } from '@prisma/client';

export class CreateGrowerCultivarDto {
  growerId: string;
  name: string;
  description: string;
  seedType: SeedType;
  growthType: GrowthType;
  plantType: string;
}
