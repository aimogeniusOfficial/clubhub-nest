import { IsNotEmpty } from 'class-validator';

export class CultivarsUpdateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  breederId: bigint;

  landrace: 'Afghan' | 'Thai' | 'Columbian' | 'Mexican' | 'Jamaican' | null;
  isVerified: boolean | null;
  imageUrl: string | null;
  isUnknown: boolean | null;
  isAutoflower: boolean | null;
}
