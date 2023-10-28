import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma_client/prisma.service';

@Injectable()
export class SubscriptionPlanService {
  constructor(private prisma: PrismaService) {}

  async getSubscriptionPlanByProductId(productId: string) {
    return this.prisma.subscriptionPlan.findFirst({
      where: {
        productId: productId,
      },
    });
  }
}
