import { Module } from '@nestjs/common';
import { SeedModule } from '../seed/seed.module';
import { VaultController } from './vault.controller';
import { VaultService } from './vault.service';
import { PrismaService } from '../../prisma_client/prisma.service';

@Module({
  imports: [SeedModule],
  controllers: [VaultController],
  providers: [VaultService, PrismaService],
  exports: [VaultService],
})
export class VaultModule {}
