import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma_client/prisma.service';
import { CreateGrowerCultivarDto } from './+dtos/create-grower-cultivar.dto';

@Injectable()
export class GrowerCultivarService {
  constructor(private prisma: PrismaService) {}

  getGrowerCultivar(growerId: string, cultivarId: string) {
    return this.prisma.growerCultivar.findFirst({
      where: {
        id: cultivarId,
        growerId: growerId,
      },
    });
  }

  getGrowerCultivars(growerId: string, plantType: string) {
    if (!plantType || plantType === '') {
      return this.prisma.growerCultivar.findMany({
        where: {
          growerId: growerId,
        },
      });
    }

    return this.prisma.growerCultivar.findMany({
      where: {
        growerId: growerId,
        plantType,
      },
    });
  }

  createGrowerCultivar(dto: CreateGrowerCultivarDto) {
    // Other than plantTypes
    if (dto.plantType) {
      return this.prisma.growerCultivar.create({
        data: {
          growerId: dto.growerId,
          name: dto.name,
          description: dto.description,
          plantType: dto.plantType,
        },
      });
    }

    return this.prisma.growerCultivar.create({
      data: {
        growerId: dto.growerId,
        name: dto.name,
        description: dto.description,
        seedType: dto.seedType,
        growthType: dto.growthType,
        plantType: 'Cannabis',
      },
    });
  }

  deleteGrowerCultivar(growerCultivarId: string) {
    return this.prisma.growerCultivar.delete({
      where: {
        id: growerCultivarId,
      },
    });
  }
}
