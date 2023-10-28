import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InviteDto } from './dtos/invite.dto';
import { UserInvitationService } from './user-invitation.service';
import { InvitationStatus, UserInvitation } from '@prisma/client';

@Controller('invites')
export class InviteController {
  constructor(private readonly userInvitationService: UserInvitationService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllInvites(): Promise<UserInvitation[]> {
    return this.userInvitationService.getAllInvites();
  }

  @Post('auth/:invitationToken')
  async verifyUserInvitation(
    @Param('invitationToken') invitationToken: string,
  ): Promise<boolean> {
    const inviteRow =
      await this.userInvitationService.findUserInvitationByToken(
        invitationToken,
      );

    if (!inviteRow || !inviteRow.createdAt) {
      return false;
    }
    const now = new Date().valueOf();
    const createdAt = inviteRow.createdAt.valueOf();
    const expirationDate = inviteRow.expirationDate.valueOf();

    if (
      inviteRow.status === InvitationStatus.ACCEPTED ||
      now > expirationDate
    ) {
      if (now > expirationDate) {
        await this.userInvitationService.updateUserInvitationStatus(
          inviteRow.id,
          InvitationStatus.EXPIRED,
        );
      }
      return false;
    } else if (createdAt <= now && now <= expirationDate) {
      return true;
    }
    return false;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createInvite(@Body() data: InviteDto): Promise<InviteDto> {
    return this.userInvitationService.createInvite(data);
  }
}
