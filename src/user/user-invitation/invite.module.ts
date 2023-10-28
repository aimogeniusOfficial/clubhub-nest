import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { InviteController } from './invite.controller';
import { UserInvitationService } from './user-invitation.service';

@Module({
  imports: [EmailModule, PrismaModule],
  controllers: [InviteController],
  providers: [UserInvitationService],
  exports: [UserInvitationService],
})
export class InviteModule {}
