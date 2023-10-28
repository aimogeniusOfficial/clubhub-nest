import { Module } from '@nestjs/common';
import { CreateFeatureFlagCommand } from './create-feature-flag.command';
import { PrismaModule } from '../prisma_client/prisma.module';
import { ToggleFeatureFlagCommand } from './toggle-feature-flag.command';

@Module({
  imports: [PrismaModule],
  providers: [CreateFeatureFlagCommand, ToggleFeatureFlagCommand],
})
export class CommanderModule {}
