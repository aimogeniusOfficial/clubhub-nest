import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CurrentUserGuard } from '../../guards/current-user.guard';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { GrowerCultivarService } from './grower-cultivar.service';
import { Request, Response } from 'express';
import { GrowthType, SeedType, User } from '@prisma/client';
import { CreateGrowerCultivarDto } from './+dtos/create-grower-cultivar.dto';
import { GrowSpaceService } from '../grow-space/grow-space.service';
import { AuthenticatedRequest } from '../../+dtos/authenticated-request';
import { CultivarsService } from '../cultivars/cultivars.service';

@Controller('my')
export class CurrentGrowerController {
  constructor(
    private cultivarService: CultivarsService,
    private growerCultivarService: GrowerCultivarService,
    private growSpaceService: GrowSpaceService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('cultivars')
  async getMyCultivars(
    @Req() request: Request,
    @Query('plantType') plantType: string,
  ) {
    const userId = request.params.userId;
    const growerCultivars = await this.growerCultivarService.getGrowerCultivars(
      userId,
      plantType,
    );
    return growerCultivars;
  }

  @UseGuards(JwtAuthGuard)
  @Post('cultivars')
  async createCurrentGrowerCultivar(
    @Req() request: AuthenticatedRequest,
    @Body() createCultivarDto: CreateGrowerCultivarDto,
  ) {
    createCultivarDto.growerId = request.user.userId;
    const newCultivar = await this.growerCultivarService.createGrowerCultivar(
      createCultivarDto,
    );
    return newCultivar;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('cultivars/:cultivarId')
  async deleteCurrentGrowerCultivar(
    @Req() request: AuthenticatedRequest,
    @Res() response: Response,
    @Param('cultivarId') growerCultivarId: string,
  ) {
    const userId = request.user.userId;

    const cultivarToBeDeleted =
      await this.growerCultivarService.getGrowerCultivar(
        userId,
        growerCultivarId,
      );

    if (!cultivarToBeDeleted) {
      return response.status(404).send();
    }

    const result = await this.growerCultivarService.deleteGrowerCultivar(
      growerCultivarId,
    );

    if (!result) {
      return response.status(404).send();
    }

    return response.status(204).send();
  }

  @UseGuards(JwtAuthGuard)
  @Get('grow-spaces')
  async getCurrentGrowerGrowSpaces(@Req() request: AuthenticatedRequest) {
    const userId = request.user.userId;
    const growerGrowSpaces = await this.growSpaceService.getGrowSpacesByUserId(
      userId,
    );
    return growerGrowSpaces;
  }

  @UseGuards(JwtAuthGuard)
  @Get('breeder-cultivars')
  getMyBreederCultivars(@Req() request: Request) {
    return this.cultivarService.getAllCultivars();
  }
}
