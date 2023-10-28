import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { Cultivar, SeedStatus, Vault } from '@prisma/client';
import { CreateSeedsDto } from './dtos/create-seeds.dto';

@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}

  createSeedsInUserVault(dto: CreateSeedsDto) {
    const { cultivar, quantity, userVault } = dto;
    const newSeeds = [];

    for (let i = 0; i < quantity; i++) {
      newSeeds.push({
        vaultId: userVault.id,
        cultivarId: cultivar.id,
        status: SeedStatus.AVAILABLE,
      });
    }
    return this.prisma.seed.createMany({
      data: newSeeds,
    });
  }

  async getAvailableUserVaultSeeds(vaultId: number) {
    return this.prisma.seed.findMany({
      where: {
        vaultId: vaultId,
        status: SeedStatus.AVAILABLE,
      },
      include: {
        cultivar: true,
      },
    });
  }

  // async addSeedToWishList(
  //   userId: string,
  //   payload: SeedVaultDto,
  // ): Promise<SeedVault> {
  //   const findSeed = await this.prisma.seedVault.findFirst({
  //     where: {
  //       cultivarId: payload.cultivarId,
  //       userId: userId,
  //     },
  //   });
  //   return this.prisma.seedVault.upsert({
  //     where: {
  //       id: findSeed ? findSeed.id : -1,
  //     },
  //     update: {
  //       isOnWithList: true,
  //     },
  //     create: {
  //       cultivarId: payload.cultivarId,
  //       userId: userId,
  //       isOnWithList: true,
  //     },
  //   });
  // }

  // async removeFromWishList(
  //   user_id: string,
  //   cultivar_id: string,
  // ): Promise<void> {
  //   const seed = await this.prisma.seed.findFirst({
  //     where: {
  //       cultivarId: BigInt(cultivar_id),
  //       userId: user_id,
  //     },
  //   });
  //   if (!seed) {
  //     throw new InternalServerErrorException(`
  //       Could not find seed to remove it from Wish List
  //     `);
  //   }
  //   if (seed.amount) {
  //     await this.prisma.seed.update({
  //       where: {
  //         id: seed.id,
  //       },
  //       +data: {
  //         isOnWithList: false,
  //       },
  //     });
  //   } else {
  //     await this.prisma.seed.delete({
  //       where: {
  //         id: seed.id,
  //       },
  //     });
  //   }
  // }
}
