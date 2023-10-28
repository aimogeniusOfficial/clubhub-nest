import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { StripeService } from './stripe/stripe.service';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionPlanService } from './subscription-plan/subscription-plan.service';
import { UserModule } from '../user/user.module';
import { UserSubscriptionService } from '../modules/user-subscription/user-subscription.service';
import { StripeWebhookHandler } from './stripe/stripe-webhook.handler';
import { StripeWebhookService } from './stripe/stripe-webhook.service';
import { UserSubscriptionModule } from '../modules/user-subscription/user-subscription.module';

@Module({
  imports: [UserModule, UserSubscriptionModule],
  controllers: [PaymentController],
  providers: [
    PrismaService,
    StripeService,
    StripeWebhookHandler,
    StripeWebhookService,
    SubscriptionPlanService,
  ],
})
export class PaymentModule {}
