import { Controller, Post, Body, Req, Res, Get, Param } from '@nestjs/common';
import { PostCheckoutDto } from './+dtos/get-checkout.dto';
import { Request, Response } from 'express';
import { StripeWebhookHandler } from './stripe/stripe-webhook.handler';
import { StripeService } from './stripe/stripe.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly stripeWebhookHandler: StripeWebhookHandler,
  ) {}

  @Post('checkout')
  async createCheckoutPage(
    @Body() postCheckoutDto: PostCheckoutDto,
  ): Promise<{ session_url: string }> {
    const { itemsList } = postCheckoutDto;
    const session = await this.stripeService.createCheckoutSession(itemsList);
    return { session_url: session.url };
  }

  @Post('webhook')
  async handleWebhook(@Req() request: Request, @Res() response: Response) {
    await this.stripeWebhookHandler.handle(request.body);
    // TODO return the response
    return response.status(200).send();
  }

  @Get(':sessionId')
  getSession(@Param('sessionId') sessionId: string) {
    return this.stripeService.getPlan(sessionId);
  }
}
