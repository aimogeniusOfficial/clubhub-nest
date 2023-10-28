import { IsNotEmpty } from 'class-validator';

export class UploadImageDto {
  @IsNotEmpty()
  bucket: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  image_url: string;
}
