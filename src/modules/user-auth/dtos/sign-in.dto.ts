import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  usernameOrEmail: string;

  @IsNotEmpty()
  password: string;

  options?: {
    captchaToken?: string;
  };
}
