import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma_client/prisma.service';
import { GrowCycleStatus } from '@prisma/client';

@Injectable()
export class GrowCycleService {
  constructor(private prisma: PrismaService) {}

  getActiveGrowCycles(growSpaceId: string) {
    return this.prisma.growCycle.findMany({
      where: {
        growSpaceId,
        status: GrowCycleStatus.ACTIVE,
      },
    });
  }
}
