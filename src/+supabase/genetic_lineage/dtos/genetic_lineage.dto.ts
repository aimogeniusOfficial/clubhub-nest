import { IsNotEmpty } from 'class-validator';

export class GeneticLineageDto {
  @IsNotEmpty()
  cultivarId: bigint;

  @IsNotEmpty()
  motherId: bigint;

  @IsNotEmpty()
  fatherId: bigint;
}
