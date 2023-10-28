import { Injectable } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { UserMembershipDto } from '../+dtos/user-membership.dto';
import { StripeWebhookService } from './stripe-webhook.service';
import { UserSubscription } from '@prisma/client';

@Injectable()
export class StripeWebhookHandler {
  constructor(
    private stripeService: StripeService,
    private stripeWebhookService: StripeWebhookService,
  ) {}

  public handle(body: any): Promise<UserSubscription> {
    const receivedEvent =
      this.stripeWebhookService.constructStripeEventFromBody(body);

    // TODO different types of webhooks would be handled here
    switch (receivedEvent.type) {
      case 'checkout.session.completed':
        return this.stripeService.handleSuccessfulPayment(receivedEvent);
      default:
        console.log(`Unhandled event type ${receivedEvent?.type}.`);
    }
  }
}
