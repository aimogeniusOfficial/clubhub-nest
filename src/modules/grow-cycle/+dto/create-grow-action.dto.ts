import { ActionMeasureType } from '@prisma/client';

export class CreateGrowActionDto {
  type: ActionMeasureType;
  isMeasurement?: boolean;
  value?: string;
  notes?: string;
  actionDate?: Date;
  growCycleId?: string;
}
