import { IsNotEmpty } from 'class-validator';

export class CultivarGeneticLineageDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  breederId: bigint;

  landrace: 'Afghan' | 'Thai' | 'Columbian' | 'Mexican' | 'Jamaican' | null;
  isVerified: boolean | null;
  imageUrl: string | null;
  isUnknown: boolean | null;
  isAutoflower: boolean | null;
  motherId: bigint | null;
  fatherId: bigint | null;
}
