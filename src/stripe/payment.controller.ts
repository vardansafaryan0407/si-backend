import { Body, Controller, Headers, HttpCode, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('upgrade')
  async upgrade(@Body('userId') userId: number) {
    return this.paymentService.createCheckoutSessionForUser(userId);
  }

  @Post('webhook')
  @HttpCode(200)
  async webhook(
    @Req() req: Request,
    @Headers('stripe-signature') signature: string,
  ) {
    return this.paymentService.handleWebhook(req.body as Buffer, signature);
  }
}
