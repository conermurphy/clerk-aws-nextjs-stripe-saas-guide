// ./utils/stripe/create-checkout-session.ts

import Stripe from 'stripe';
import { IPlan, IUser } from '@/types';
import { appUrl } from '@/config';

interface IProps {
  planId: IPlan['PLAN_ID'];
  stripeCustomerId: string;
  user: IUser;
}

export default async function createCheckoutSession({
  planId,
  stripeCustomerId,
  user,
}: IProps) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    allow_promotion_codes: true,
    customer: stripeCustomerId,
    customer_update: {
      address: 'auto',
    },
    line_items: [
      {
        price: planId,
        quantity: 1,
      },
    ],
    success_url: appUrl,
    cancel_url: appUrl,
    subscription_data: {
      metadata: {
        payingUserId: user?.pk,
      },
    },
  });

  return checkoutSession.url;
}
