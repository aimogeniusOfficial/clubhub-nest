import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma_client/prisma.service';

@Injectable()
export class GrowSpaceService {
  constructor(private prisma: PrismaService) {}

  getGrowSpacesByUserId(userId: string) {
    return this.prisma.growSpace.findMany({
      where: {
        userId,
      },
    });
  }
}
