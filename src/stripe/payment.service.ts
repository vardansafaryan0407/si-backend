import { Injectable, Logger, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { InjectModel } from '@nestjs/sequelize';
import { PremiumUser } from 'src/modules/user/premium-user';
import { UserService } from 'src/modules/user/user.service';
import { STRIPE } from './strtipe.provider';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class PaymentService {

  constructor(
    @Inject(STRIPE) private readonly stripe: Stripe,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    @InjectModel(PremiumUser) private readonly premiumModel: typeof PremiumUser,
  ) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-02-24.acacia' as any,
    });
  }



  async createCheckoutSessionForUser(userId: number) {
    const user = await this.userService.find(userId);
    if (!user) throw new Error('User not found');

    const priceId = this.configService.get<string>('STRIPE_PRICE_ID');
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId!, quantity: 1 }],
      success_url: `${frontendUrl}/account?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/account/cancel`,
      customer_email: user.email,
      allow_promotion_codes: true,
      metadata: { userId: String(user.id) },
    });

    return { url: session.url, id: session.id };
  }

  async markPremiumActiveByUserId(userId: number) {
        console.log(`Incoming userId: ${userId}`);

    const user = await this.userService.find(userId);
    if (!user) {
       console.log(`User not found: ${userId}`);
      return;
    }

let premium = await this.premiumModel.findOne({ where: { user_id: userId } });

if (!premium) {
  try {
    premium = await this.premiumModel.create({ user_id: userId, status: 'premium' });
     console.log('PremiumUser created:');
  } catch (err) {
   console.log('Error creating PremiumUser:', err);
  }
} else if (premium.status !== 'premium') {
  await premium.update({ status: 'premium' });
   console.log('PremiumUser updated to premium:');
} else {
    console.log('PremiumUser already active');
}
  }

async handleWebhook(rawBody: Buffer, signature: string) {
    const signingSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(rawBody, signature, signingSecret);
    } catch (err) {
      return { error: `Webhook Error: ${err.message}` };
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = Number(session.metadata?.userId);

    if (!userId || isNaN(userId)) {
      console.log
      ('Invalid userId in checkout.session.completed');
      break;
    }

    if (session.payment_status === 'paid') {
      await this.markPremiumActiveByUserId(userId);
    }
    break;
  }

      case 'payment_intent.succeeded': {
        const intent = event.data.object as Stripe.PaymentIntent;
        const userId = Number(intent.metadata?.userId);

        if (userId) {
          await this.markPremiumActiveByUserId(userId);
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const intent = event.data.object as Stripe.PaymentIntent;
        const userId = Number(intent.metadata?.userId);

        if (userId) {
          console.log(userId);
          
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return { received: true };
  }
  }
