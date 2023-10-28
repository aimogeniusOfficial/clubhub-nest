import { IsNotEmpty } from 'class-validator';

export class EmailDto {
  @IsNotEmpty()
  recipientEmail: string;
  template: string;
  token: string;
}
