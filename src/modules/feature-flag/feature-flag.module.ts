import { Global, Module } from '@nestjs/common';
import { FeatureFlagService } from './feature-flag.service';
import { PrismaService } from '../../prisma_client/prisma.service';

@Global()
@Module({
  providers: [FeatureFlagService, PrismaService],
  exports: [FeatureFlagService],
})
export class FeatureFlagModule {}
