import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma_client/prisma.service';
import { CreateGrowCycleDto } from '../+dto/create-grow-cycle.dto';
import { GrowCycleStatus, User } from '@prisma/client';
import { UpdateGrowCycleDto } from '../+dto/update-grow-cycle.dto';
import { CreateGrowActionDto } from '../+dto/create-grow-action.dto';
import { ActivateGrowCycleDto } from '../+dto/activate-grow-cycle.dto';

@Injectable()
export class UserGrowCycleService {
  constructor(private prisma: PrismaService) {}

  getGrowCycleByUserId(userId: string) {
    return this.prisma.growCycle.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async getGrowCycleByIdAndUserId(userId: string, growCycleId: string) {
    return this.prisma.growCycle.findFirst({
      where: {
        userId: userId,
        id: growCycleId,
      },
    });
  }

  createGrowCycle(userId: string, dto: CreateGrowCycleDto) {
    return this.prisma.growCycle.create({
      data: {
        name: dto.name,
        description: dto.description,
        status: GrowCycleStatus.DRAFT,
        userId,
        growSpaceId: dto.growSpaceId,
        cultivarId: dto.breederCultivarId ? +dto.breederCultivarId : null,
        growerCultivarId: dto.cultivarId || null,
      },
    });
  }

  async updateGrowCycle(growCycleId: string, dto: UpdateGrowCycleDto) {
    const updateData: any = {};

    if (dto.expectedFlowerStartDate) {
      updateData.expectedFlowerStartDate = dto.expectedFlowerStartDate;
    }

    if (dto.expectedHarvestDate) {
      updateData.expectedHarvestDate = dto.expectedHarvestDate;
    }

    if (dto.startingGrowStage) {
      updateData.startingGrowStage = dto.startingGrowStage;
    }

    if (dto.initialPlantCount) {
      updateData.initialPlantCount = dto.initialPlantCount;
    }

    return this.prisma.growCycle.update({
      where: {
        id: growCycleId,
      },
      data: updateData,
    });
  }

  updateGrowCycleStatus(dto: ActivateGrowCycleDto) {
    const { growCycleId, status, startingGrowStage } = dto;

    return this.prisma.growCycle.update({
      where: {
        id: growCycleId,
      },
      data: {
        status,
        currentGrowStage: startingGrowStage,
      },
    });
  }

  async createGrowAction(userId: string, data: CreateGrowActionDto) {
    return this.prisma.growAction.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async getGrowActionsByGrowCycleId(growCycleId: string) {
    return this.prisma.growAction.findMany({
      where: {
        growCycleId,
      },
      orderBy: {
        actionDate: 'asc',
      },
    });
  }
}
