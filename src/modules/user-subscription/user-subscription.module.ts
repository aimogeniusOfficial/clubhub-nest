import { Module } from '@nestjs/common';
import { UserSubscriptionService } from './user-subscription.service';
import { PrismaModule } from '../../prisma_client/prisma.module';
import { PrismaService } from '../../prisma_client/prisma.service';

@Module({
  imports: [],
  providers: [UserSubscriptionService, PrismaService],
  exports: [UserSubscriptionService],
})
export class UserSubscriptionModule {}
