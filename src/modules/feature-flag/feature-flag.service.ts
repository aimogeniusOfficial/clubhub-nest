import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma_client/prisma.service';

@Injectable()
export class FeatureFlagService {
  constructor(private prisma: PrismaService) {}

  async isFeatureEnabled(featureName: string) {
    const featureFlag = await this.prisma.featureFlag.findUnique({
      where: {
        name: featureName,
      },
    });

    return featureFlag?.isEnabled || false;
  }
}
