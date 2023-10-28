import { Injectable } from '@nestjs/common';
import { UserSubscriptionService } from '../modules/user-subscription/user-subscription.service';
import { UserProfile, UserService } from './user.service';
import { UserSubscriptionUsageService } from './user-subscription-usage.service';

@Injectable()
export class UserProfileService {
  constructor(
    private userSubscriptionService: UserSubscriptionService,
    private userSubscriptionUsageService: UserSubscriptionUsageService,
    private userService: UserService,
  ) {}

  async getCurrentUserProfile(id: string): Promise<UserProfile> {
    const user = await this.userService.findUserById(id);
    if (!user) {
      throw new Error('User not found');
    }

    const userSubscription =
      await this.userSubscriptionService.findUserActiveSubscriptionByUserId(
        user.id,
      );

    const subscriptionUsage =
      await this.userSubscriptionUsageService.getUserSubscriptionUsage(user.id);

    // TODO need to make sure to get only active and current subscription

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      subscriptionPlan: userSubscription?.subscriptionPlan,
      subscriptionPlanId:
        userSubscription?.subscriptionPlanId as unknown as number,
      subscriptionUsage,
      roles: user.userRoles,
      subscription: {
        activationDate: userSubscription?.activationDate,
        expiryDate: userSubscription?.expiryDate,
      },
    };
  }
}
