import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserService } from './user/user.service';
import { UserProfileService } from './user/user-profile.service';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private userProfileService: UserProfileService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUserProfile(@Request() req): Promise<any> {
    return this.userProfileService.getCurrentUserProfile(req.user.userId);
  }
}
