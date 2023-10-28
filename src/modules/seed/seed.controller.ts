import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('my-vault')
export class SeedVaultController {
  constructor(private readonly seedVaultService: SeedService) {}

  // @Post(':user_id/seeds/wishlist')
  // @UseGuards(JwtAuthGuard, CurrentUserGuard)
  // addSeedToWishList(
  //   @Param('user_id') user_id: string,
  //   @Body() payload: SeedVaultDto,
  // ): Promise<SeedVault> {
  //   return this.seedVaultService.addSeedToWishList(user_id, payload);
  // }

  // @Delete(':user_id/seeds/wishlist')
  // @UseGuards(JwtAuthGuard, CurrentUserGuard)
  // removeFromWishList(
  //   @Param('user_id') user_id: string,
  //   @Query('cultivar') cultivar_id: string,
  // ): Promise<void> {
  //   return this.seedVaultService.removeFromWishList(user_id, cultivar_id);
  // }
}
