import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GrowSpaceService } from '../modules/grow-space/grow-space.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUserGuard } from '../guards/current-user.guard';
import { VaultService } from '../modules/vault/vault.service';
import { SeedService } from '../modules/seed/seed.service';

@Controller('users')
export class UsersController {
  constructor(
    private growSpaceService: GrowSpaceService,
    private seedService: SeedService,
    private vaultService: VaultService,
  ) {}
  @UseGuards(JwtAuthGuard, CurrentUserGuard)
  @Get(':userId/grow-spaces')
  async getUserGrowSpaces(@Param('userId') userId: string) {
    return this.growSpaceService.getGrowSpacesByUserId(userId);
  }

  @UseGuards(JwtAuthGuard, CurrentUserGuard)
  @Get(':userId/cultivars')
  async getUserCultivars(@Param('userId') userId: string) {
    const userVault = await this.vaultService.getVaultByUserId(userId);
    const userSeeds = await this.seedService.getAvailableUserVaultSeeds(
      userVault.id,
    );

    const uniqueCultivars = userSeeds.reduce((acc, seed) => {
      const { id, name } = seed.cultivar;
      if (!acc[Number(id)]) {
        acc[Number(id)] = { id, name };
      }
      return acc;
    }, {});

    return Object.values(uniqueCultivars);
  }
}
