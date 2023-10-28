import { Injectable } from '@nestjs/common';
import { GrowSpaceService } from '../modules/grow-space/grow-space.service';
import { GrowCycleService } from '../modules/grow-cycle/grow-cycle.service';

@Injectable()
export class UserSubscriptionUsageService {
  constructor(
    private growCycle: GrowCycleService,
    private growSpaceService: GrowSpaceService,
  ) {}

  async getUserSubscriptionUsage(userId: string) {
    const growSpaces = await this.growSpaceService.getGrowSpacesByUserId(
      userId,
    );
    const growCycles = await this.growCycle.getActiveGrowCycles(userId);
    // TODO plants

    return {
      userGrowSpaceCount: growSpaces.length,
      userActiveGrowCycleCount: growCycles.length,
      activePlantsCount: 2,
    };
  }
}
