import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { SupabaseClientModule } from '../../+supabase/supabase-client/supabase-client.module';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { UserService } from '../../user/user.service';
import { UserSubscriptionModule } from '../user-subscription/user-subscription.module';
import { VaultModule } from '../vault/vault.module';
import { VaultService } from '../vault/vault.service';
import { SeedModule } from '../seed/seed.module';
import { UserInvitationService } from '../../user/user-invitation/user-invitation.service';
import { UserModule } from '../../user/user.module';
import { InviteModule } from '../../user/user-invitation/invite.module';
import { AccessRoleModule } from '../access-role/access-role.module';

@Module({
  imports: [
    AccessRoleModule,
    SupabaseClientModule,
    PrismaModule,
    UserSubscriptionModule,
    SeedModule,
    VaultModule,
    InviteModule,
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, UserService, VaultService],
})
export class UserAuthModule {}
