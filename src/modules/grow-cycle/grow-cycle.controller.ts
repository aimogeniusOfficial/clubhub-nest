import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UserGrowCycleService } from './user-grow-cycle/user-grow-cycle.service';
import { CreateGrowCycleDto } from './+dto/create-grow-cycle.dto';
import { AuthenticatedRequest } from '../../+dtos/authenticated-request';
import { GrowCycleStatus } from '@prisma/client';
import { UpdateGrowCycleDto } from './+dto/update-grow-cycle.dto';
import { CreateGrowActionDto } from './+dto/create-grow-action.dto';

@Controller('grow-cycles')
export class GrowCycleController {
  constructor(private userGrowCycleService: UserGrowCycleService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':growCycleId')
  getGrowCycle(
    @Req() request: AuthenticatedRequest,
    @Param('growCycleId') growCycleId: string,
  ) {
    const userId = request.user.userId;
    return this.userGrowCycleService.getGrowCycleByIdAndUserId(
      userId,
      growCycleId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getUserGrowCycles(@Req() request: AuthenticatedRequest) {
    const userId = request.user.userId;
    return this.userGrowCycleService.getGrowCycleByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  createGrowCycle(
    @Req() request: AuthenticatedRequest,
    @Body() createGrowCycleDto: CreateGrowCycleDto,
  ) {
    const userId = request.user.userId;
    return this.userGrowCycleService.createGrowCycle(
      userId,
      createGrowCycleDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':growCycleId')
  async updateGrowCycle(
    @Req() request: AuthenticatedRequest,
    @Res() response: Response,
    @Param('growCycleId') growCycleId: string,
    @Body() updateGrowCycleDto: UpdateGrowCycleDto,
  ) {
    const userId = request.user.userId;

    //verify if grow cycle belongs to user
    const growCycle = await this.userGrowCycleService.getGrowCycleByIdAndUserId(
      userId,
      growCycleId,
    );

    if (!growCycle) {
      return response.status(404).send('Grow cycle not found');
    }

    const updatedGrowCycle = await this.userGrowCycleService.updateGrowCycle(
      growCycleId,
      updateGrowCycleDto,
    );

    return response.status(200).send(updatedGrowCycle);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getGrowCycles(@Req() request: AuthenticatedRequest) {
    const userId = request.user.userId;
    return this.userGrowCycleService.getGrowCycleByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':growCycleId/status')
  async updateGrowCycleStatus(
    @Req() request: AuthenticatedRequest,
    @Param('growCycleId') growCycleId: string,
    @Body('status') status: GrowCycleStatus,
  ) {
    const userId = request.user.userId;

    const growCycle = await this.userGrowCycleService.getGrowCycleByIdAndUserId(
      userId,
      growCycleId,
    );

    if (status === GrowCycleStatus.ACTIVE) {
      console.log('Transitioning grow cycle to active');
      growCycle.status = status;
      await this.userGrowCycleService.updateGrowCycleStatus({
        growCycleId,
        status,
        startingGrowStage: growCycle.startingGrowStage,
      });
    }

    return growCycle;
  }

  @UseGuards(JwtAuthGuard)
  @Get('action/:growCycleId')
  async getGrowActions(
    @Req() request: AuthenticatedRequest,
    @Param('growCycleId') growCycleId: string,
  ) {
    return this.userGrowCycleService.getGrowActionsByGrowCycleId(growCycleId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('action/:growCycleId')
  async createGrowAction(
    @Req() request: AuthenticatedRequest,
    @Body() createGrowActionDto: CreateGrowActionDto,
  ) {
    return this.userGrowCycleService.createGrowAction(
      request.user.userId,
      request.body,
    );
  }
}
