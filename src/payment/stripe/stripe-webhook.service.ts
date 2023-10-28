import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeWebhookService {
  private stripe: Stripe;
  private webhookSigningSecret: string;
  constructor(private configService: ConfigService) {
    // TODO consider refactor into a singleton - similar instance in StripeService
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
    this.webhookSigningSecret = this.configService.get<string>(
      'STRIPE_WEBHOOK_SIGNING_SECRET',
    );
  }

  constructStripeEventFromBody(body: any): Stripe.Event | undefined {
    const payloadString = JSON.stringify(body);
    const webhookStripeSignatureHeader =
      this.stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: this.webhookSigningSecret,
      });

    try {
      return this.stripe.webhooks.constructEvent(
        payloadString,
        webhookStripeSignatureHeader,
        this.webhookSigningSecret,
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
    }
  }
}
