import Stripe from 'stripe';
import { Provider } from '@nestjs/common';

export const STRIPE = 'STRIPE';

export const StripeProvider: Provider = {
  provide: STRIPE,
  useFactory: () => {
    return new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20' as any,
    });
  },
};
