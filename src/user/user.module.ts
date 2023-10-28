import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../prisma_client/prisma.service';
import { UserProfileService } from './user-profile.service';
import { UserSubscriptionModule } from '../modules/user-subscription/user-subscription.module';
import { UserSubscriptionUsageService } from './user-subscription-usage.service';
import { GrowCycleModule } from '../modules/grow-cycle/grow-cycle.module';
import { GrowSpaceModule } from '../modules/grow-space/grow-space.module';
import { UsersController } from './users.controller';
import { VaultModule } from '../modules/vault/vault.module';
import { SeedModule } from '../modules/seed/seed.module';

@Global()
@Module({
  imports: [
    UserSubscriptionModule,
    GrowCycleModule,
    GrowSpaceModule,
    SeedModule,
    VaultModule,
  ],
  controllers: [UsersController],
  providers: [
    UserService,
    PrismaService,
    UserProfileService,
    UserSubscriptionUsageService,
  ],
  exports: [UserService, UserProfileService],
})
export class UserModule {}
