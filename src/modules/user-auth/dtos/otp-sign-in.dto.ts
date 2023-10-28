import { IsEmail } from 'class-validator';

export class OtpSignInDto {
  @IsEmail()
  email: string;
}
