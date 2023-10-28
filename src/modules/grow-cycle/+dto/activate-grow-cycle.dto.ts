import { GrowCycleStatus, GrowStage } from '@prisma/client';

export interface ActivateGrowCycleDto {
  growCycleId: string;
  status: GrowCycleStatus;
  startingGrowStage: GrowStage;
}
