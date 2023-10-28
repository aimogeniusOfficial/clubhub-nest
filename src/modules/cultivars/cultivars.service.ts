import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { CultivarsDto } from './dtos/cultivars.dto';
import { Cultivar, SeedStatus } from '@prisma/client';
import { CultivarsUpdateDto } from './dtos/cultivars_update.dto';

@Injectable()
export class CultivarsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCultivars(): Promise<Cultivar[]> {
    try {
      return await this.prisma.cultivar.findMany({
        include: {
          breeder: true,
        },
        orderBy: {
          breederId: 'asc',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Something went wrong... ${error.message}`,
      );
    }
  }

  async createCultivar(data: CultivarsDto): Promise<Cultivar> {
    try {
      return await this.prisma.cultivar.create({
        data: {
          ...data,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Something went wrong ${error.message}`,
      );
    }
  }

  getAvailableSeedByVaultId(vaultId: number) {
    return this.prisma.seed.findMany({
      where: {
        vaultId,
        status: SeedStatus.AVAILABLE,
      },
    });
  }

  async updateCultivar(
    id: number,
    updateData: CultivarsUpdateDto,
  ): Promise<Cultivar> {
    try {
      return await this.prisma.cultivar.update({
        where: {
          id: id,
        },
        data: {
          ...updateData,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error updating the cultivar: ${error.message}`,
      );
    }
  }
}
