import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { SubscriptionPlanService } from '../subscription-plan/subscription-plan.service';
import { UserMembershipDto } from '../+dtos/user-membership.dto';
import { getStripeSubscriptionStartEndDates } from '../+utils/get-stripe-subscription-start-end-dates';
import { UserService } from '../../user/user.service';
import { UserSubscriptionService } from '../../modules/user-subscription/user-subscription.service';
import { PaymentStatusType, UserSubscription } from '@prisma/client';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private shamanWebUrl: string = this.configService.get('SHAMAN_WEB_URL');

  constructor(
    private configService: ConfigService,
    private subscriptionPlanService: SubscriptionPlanService,
    private userService: UserService,
    private userSubscriptionService: UserSubscriptionService,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
    this.shamanWebUrl = this.configService.get('SHAMAN_WEB_URL');
  }

  async createCheckoutSession(
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  ) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'subscription',
      success_url: `${this.shamanWebUrl}/success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.shamanWebUrl}`,
      custom_fields: [],
    });
    session.success_url = session.success_url.replace(
      '{CHECKOUT_SESSION_ID}',
      session.id,
    );

    return session;
  }

  async getPlan(sessionId: string) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);

      const subscription = await this.stripe.subscriptions.retrieve(
        session.subscription as string,
      );
      const plan = subscription.items.data[0].plan;

      const subscriptionPlan =
        await this.subscriptionPlanService.getSubscriptionPlanByProductId(
          plan.product as string, // not sure why need to be casted to string
        );

      const serializedMembership = {
        ...subscriptionPlan,
        id: subscriptionPlan.id.toString(),
      };

      return { plan, subscription: serializedMembership };
    } catch (error) {
      throw new Error('Plan not found');
    }
  }

  async handleSuccessfulPayment(
    event: Stripe.Event,
  ): Promise<UserSubscription> {
    try {
      const invoice = event.data.object as Stripe.Invoice;

      const subscription = await this.stripe.subscriptions.retrieve(
        invoice.subscription as string,
      );

      const customer = (await this.stripe.customers.retrieve(
        invoice.customer as string,
      )) as Stripe.Customer;

      const { periodStart, periodEnd } =
        getStripeSubscriptionStartEndDates(subscription);

      // TODO user can specify another email and we should be able to handle it
      const user = await this.userService.findUserByEmail(customer.email);

      const product = subscription.items.data[0].plan.product as string;

      const subscriptionPlan =
        await this.subscriptionPlanService.getSubscriptionPlanByProductId(
          product,
        );

      // @ts-ignore
      const yearlyInterval = subscription.plan.interval === 'year';

      await this.userSubscriptionService.deactivateAllActiveUserSubscriptions(
        user.id,
      );

      return this.userSubscriptionService.createUserSubscription({
        userId: user.id,
        subscriptionPlanId: subscriptionPlan.id,
        activationDate: periodStart,
        expiryDate: periodEnd,
        paymentStatus: yearlyInterval
          ? PaymentStatusType.PAID_YEARLY
          : PaymentStatusType.PAID_MONTHLY,
        stripeSubscriptionId: subscription.id,
      });
    } catch (error) {
      throw new BadRequestException(`Bad request, ${error.message}`);
    }
  }
}
