import Stripe from 'stripe';
import { IPlan } from '@/types';
import getCurrentUser from '../db/get-current-user';
import getPlan from '../get-plan';
import createStripeUserId from './create-stripe-user-id';

interface IProps {
  planTier: IPlan['TIER'];
}

export default async function createCheckoutSession({ planTier }: IProps) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
  });

  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  const plan = getPlan(planTier);

  let stripeCustomerId = '';

  if (user.stripeCustomerId) {
    stripeCustomerId = user.stripeCustomerId;
  } else {
    stripeCustomerId = await createStripeUserId({ user });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    allow_promotion_codes: true,
    customer: stripeCustomerId,
    customer_update: {
      address: 'auto',
    },
    line_items: [
      {
        price: plan?.PLAN_ID,
        quantity: 1,
      },
    ],
    success_url: `http://localhost:3000`,
    cancel_url: `http://localhost:3000`,
    subscription_data: {
      metadata: {
        payingUserId: user?.pk,
      },
    },
  });

  return checkoutSession.url;
}
