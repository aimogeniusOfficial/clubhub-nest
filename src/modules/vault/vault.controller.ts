import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CurrentUserGuard } from '../../guards/current-user.guard';
import { VaultService } from './vault.service';
import { SeedVaultDto } from '../seed/dtos/seed_vault.dto';
import { AddSeedsToVaultDto } from '../seed/dtos/add-seeds-to-vault.dto';

@Controller('vault')
export class VaultController {
  constructor(private vaultService: VaultService) {}

  @UseGuards(JwtAuthGuard, CurrentUserGuard)
  @Post(':userId/seeds')
  async addSeedToVault(
    @Param('userId') userId: string,
    @Body() payload: AddSeedsToVaultDto,
  ) {
    await this.vaultService.addSeedsToUserVault(userId, payload);
    return 'addSeedToVault';
  }

  @UseGuards(JwtAuthGuard, CurrentUserGuard)
  @Get(':userId')
  async getUserVault(@Param('userId') userId: string) {
    return await this.vaultService.getUserVault(userId);
  }
}
