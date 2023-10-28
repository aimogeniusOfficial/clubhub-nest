import { IsNotEmpty } from 'class-validator';

export class ImageDto {
  @IsNotEmpty()
  image_url: string;
}
