import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma_client/prisma.service';
import { SubscriptionPlanType } from '../../user/user.service';
import { CreateUserSubscriptionDto } from './+dto/create-user-subscription.dto';
import { PaymentStatusType } from '@prisma/client';

@Injectable()
export class UserSubscriptionService {
  constructor(private prisma: PrismaService) {}

  async createUserSubscription(dto: CreateUserSubscriptionDto) {
    return this.prisma.userSubscription.create({
      data: {
        userId: dto.userId,
        subscriptionPlanId: dto.subscriptionPlanId,
        activationDate: dto.activationDate,
        expiryDate: dto.expiryDate,
        paymentStatus: dto.paymentStatus,
        stripeSubscriptionId: dto.stripeSubscriptionId,
      },
    });
  }

  async deactivateAllActiveUserSubscriptions(userId: string) {
    return this.prisma.userSubscription.updateMany({
      where: {
        userId,
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });
  }

  findUserActiveSubscriptionByUserId(userId: string) {
    return this.prisma.userSubscription.findFirst({
      where: {
        userId,
        isActive: true,
      },
      orderBy: {
        activationDate: 'desc',
      },
      include: {
        subscriptionPlan: true,
      },
    });
  }

  createInitialFreeSubscription(userId: string) {
    return this.prisma.userSubscription.create({
      data: {
        userId: userId,
        subscriptionPlanId: 1,
        paymentStatus: PaymentStatusType.FREE,
        activationDate: new Date(),
        expiryDate: null,
        stripeSubscriptionId: null,
      },
    });
  }
}
