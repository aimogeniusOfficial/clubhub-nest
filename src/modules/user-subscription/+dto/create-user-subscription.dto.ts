import { PaymentStatusType } from '@prisma/client';

export class CreateUserSubscriptionDto {
  userId: string;
  subscriptionPlanId: bigint;
  activationDate: Date;
  expiryDate: Date;
  paymentStatus: PaymentStatusType;
  stripeSubscriptionId: string;
}
