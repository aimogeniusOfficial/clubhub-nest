import { Module } from '@nestjs/common';
import { GrowSpaceService } from './grow-space.service';
import { PrismaService } from '../../prisma_client/prisma.service';

@Module({
  imports: [],
  providers: [GrowSpaceService, PrismaService],
  exports: [GrowSpaceService],
})
export class GrowSpaceModule {}
