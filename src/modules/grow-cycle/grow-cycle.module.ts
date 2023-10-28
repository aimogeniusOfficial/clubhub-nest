import { Module } from '@nestjs/common';
import { GrowCycleService } from './grow-cycle.service';
import { PrismaService } from '../../prisma_client/prisma.service';
import { UserGrowCycleService } from './user-grow-cycle/user-grow-cycle.service';
import { GrowCycleController } from './grow-cycle.controller';

@Module({
  imports: [],
  controllers: [GrowCycleController],
  providers: [GrowCycleService, PrismaService, UserGrowCycleService],
  exports: [GrowCycleService],
})
export class GrowCycleModule {}
