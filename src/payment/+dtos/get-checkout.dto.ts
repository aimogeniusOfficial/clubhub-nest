import { IsNotEmpty } from 'class-validator';
import Stripe from 'stripe';

export class PostCheckoutDto {
  @IsNotEmpty()
  itemsList: Stripe.Checkout.SessionCreateParams.LineItem[];

  // Turn this on later
  // @IsUUID()x
}
