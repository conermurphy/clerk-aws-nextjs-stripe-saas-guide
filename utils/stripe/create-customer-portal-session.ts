import Stripe from 'stripe';
import getCurrentUser from '../db/get-current-user';
import { appUrl } from '@/config';

export default async function createCustomerPortalSession() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
  });

  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId || '',
    return_url: appUrl,
  });

  return portalSession.url;
}
