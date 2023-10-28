import { IsNumberString } from 'class-validator';

export class PaginationDto {
  @IsNumberString()
  take: number;

  @IsNumberString()
  skip: number;
}
