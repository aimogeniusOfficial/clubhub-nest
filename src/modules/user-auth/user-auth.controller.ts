import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sing-up.dto';
import { UserAuthService } from './user-auth.service';
import { OtpSignInDto } from './dtos/otp-sign-in.dto';
import { VerifyEmailOtpParams } from '@supabase/supabase-js';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('sign-up')
  signUp(@Body() payload: SignUpDto) {
    return this.userAuthService.handleSignUp(payload);
  }

  @Post('sign-in')
  signIn(@Body() payload: SignInDto) {
    return this.userAuthService.handleSignIn(payload);
  }

  @Post('otp-sign-in')
  otpSignIn(@Body() payload: OtpSignInDto) {
    return this.userAuthService.handleSignInWithOTP(payload);
  }

  @Post('verify-otp')
  verify(@Body() payload: VerifyEmailOtpParams) {
    return this.userAuthService.verifyOTP(payload);
  }

  @Post('get-username')
  getUsername(@Body() payload: { id: string }) {
    // TODO this is not protected
    return this.userAuthService.getUsernameById(payload.id);
  }

  @Post('validate-username')
  isValidUsername(@Body() payload: { username: string }) {
    return this.userAuthService.handleUsernameValidation(payload.username);
  }
}
