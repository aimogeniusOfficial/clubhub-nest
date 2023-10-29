import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { EmailModule } from './email/email.module';
import { InviteModule } from './user/user-invitation/invite.module';
import { InviteController } from './user/user-invitation/invite.controller';
import { UserInvitationService } from './user/user-invitation/user-invitation.service';
import { PrismaModule } from './prisma_client/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UserAuthModule } from './modules/user-auth/user-auth.module';
import { UserAuthController } from './modules/user-auth/user-auth.controller';
import { UserAuthService } from './modules/user-auth/user-auth.service';
import { SupabaseClientModule } from './+supabase/supabase-client/supabase-client.module';
import { BreedersModule } from './+supabase/breeders/breeders.module';
import { CultivarsModule } from './modules/cultivars/cultivars.module';
import { BreedersController } from './+supabase/breeders/breeders.controller';
import { CultivarsController } from './modules/cultivars/cultivars.controller';
import { BreedersService } from './+supabase/breeders/breeders.service';
import { CultivarsService } from './modules/cultivars/cultivars.service';
import { StorageModule } from './+supabase/storage/storage.module';
import { StorageController } from './+supabase/storage/storage.controller';
import { StorageService } from './+supabase/storage/storage.service';
import { SeedModule } from './modules/seed/seed.module';
import { SeedVaultController } from './modules/seed/seed.controller';
import { SeedService } from './modules/seed/seed.service';
import { JournalEntryModule } from './journal/journal.module';
import { JournalController } from './journal/journal.controller';
import { JournalService } from './journal/journal.service';
import { CommanderModule } from './commander/commander.module';
import { UserSubscriptionModule } from './modules/user-subscription/user-subscription.module';
import { GrowSpaceModule } from './modules/grow-space/grow-space.module';
import { GrowCycleModule } from './modules/grow-cycle/grow-cycle.module';
import { GeneticLineageModule } from './+supabase/genetic_lineage/genetic_lineage.module';
import { GeneticLineageController } from './+supabase/genetic_lineage/genetic_lineage.controller';
import { GeneticLineageService } from './+supabase/genetic_lineage/genetic_lineage.service';
import { VaultModule } from './modules/vault/vault.module';
import { FeatureFlagModule } from './modules/feature-flag/feature-flag.module';
import { AccessRoleModule } from './modules/access-role/access-role.module';
import { GrowerModule } from './modules/grower/grower.module';
import { CnnModule } from './cnn/cnn.module';
import { ClubsModule } from './+supabase/clubs/clubs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CnnModule,
    PaymentModule,
    StorageModule,
    EmailModule,
    InviteModule,
    BreedersModule,
    CultivarsModule,
    SeedModule,
    PrismaModule,
    SupabaseClientModule,
    UserAuthModule,
    AuthModule,
    UserModule,
    JournalEntryModule,
    CommanderModule,
    UserSubscriptionModule,
    GrowSpaceModule,
    GrowCycleModule,
    GeneticLineageModule,
    VaultModule,
    FeatureFlagModule,
    AccessRoleModule,
    GrowerModule,
    ClubsModule,
  ],
  controllers: [
    AppController,
    StorageController,
    InviteController,
    UserAuthController,
    BreedersController,
    CultivarsController,
    SeedVaultController,
    JournalController,
    GeneticLineageController,
  ],
  providers: [
    AppService,
    StorageService,
    UserInvitationService,
    UserAuthService,
    BreedersService,
    CultivarsService,
    SeedService,
    JournalService,
    GeneticLineageService,
  ],
})
export class AppModule {}
