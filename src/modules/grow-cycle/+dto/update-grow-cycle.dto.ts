import { IsDate, IsOptional } from 'class-validator';

export class UpdateGrowCycleDto {
  @IsOptional()
  expectedFlowerStartDate: Date | any;

  @IsOptional()
  expectedHarvestDate: Date | any;

  @IsOptional()
  startingGrowStage: string;

  @IsOptional()
  initialPlantCount: number;
}
