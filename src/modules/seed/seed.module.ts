import { Module } from '@nestjs/common';
import { SeedVaultController } from './seed.controller';
import { SeedService } from './seed.service';
import { PrismaModule } from 'src/prisma_client/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SeedVaultController],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
