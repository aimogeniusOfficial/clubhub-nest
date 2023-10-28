import { IsNotEmpty } from 'class-validator';

export class InviteEmailDto {
  @IsNotEmpty()
  recipientEmail: string;
  @IsNotEmpty()
  token: string;
}
