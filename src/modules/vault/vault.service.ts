import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma_client/prisma.service';
import { SeedService } from '../seed/seed.service';
import { AddSeedsToVaultDto } from '../seed/dtos/add-seeds-to-vault.dto';

@Injectable()
export class VaultService {
  constructor(
    private prismaService: PrismaService,
    private seedService: SeedService,
  ) {}

  async getUserVault(userId: string): Promise<any> {
    const userVaultWithSeeds = await this.prismaService.vault.findUnique({
      where: {
        userId,
      },
      include: {
        seeds: {
          include: {
            cultivar: true,
          },
        },
      },
    });

    const cultivarToSeeds = {};

    userVaultWithSeeds.seeds.forEach((seed) => {
      const cultivarId = seed.cultivarId.toString();

      if (!cultivarToSeeds[cultivarId]) {
        cultivarToSeeds[cultivarId] = {
          cultivarId: cultivarId,
          cultivarName: seed.cultivar.name, // You can use other properties as well if needed
          AVAILABLE: 0,
          LOCKED: 0,
          GERMINATED: 0,
        };
      }
      cultivarToSeeds[cultivarId][seed.status]++;
    });

    return Object.values(cultivarToSeeds);
  }

  async addSeedsToUserVault(userId: string, payload: AddSeedsToVaultDto) {
    const userVault = await this.getVaultByUserId(userId);
    // Need to reselect cultivar from db to make sure it exists
    const cultivar = await this.getCultivarById(payload.cultivarId);
    await this.seedService.createSeedsInUserVault({
      userVault,
      cultivar,
      quantity: payload.amount,
    });
  }

  getVaultByUserId(userId: string) {
    return this.prismaService.vault.findUnique({
      where: {
        userId,
      },
    });
  }

  // TODO migrate to Cultivar Service
  private async getCultivarById(cultivarId: bigint) {
    return this.prismaService.cultivar.findUnique({
      where: {
        id: cultivarId,
      },
    });
  }

  createUserVault(userId: string) {
    return this.prismaService.vault.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
