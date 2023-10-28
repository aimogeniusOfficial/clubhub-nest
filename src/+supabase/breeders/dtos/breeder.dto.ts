import { IsNotEmpty } from 'class-validator';

export class BreedersDto {
  @IsNotEmpty()
  name: string;

  country: string | null;
  state: string | null;
  website: string | null;
}
