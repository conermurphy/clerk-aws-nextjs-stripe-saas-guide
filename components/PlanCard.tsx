import { IPlan } from '@/types';
import createCheckoutSession from '@/utils/stripe/create-checkout-session';

export default async function PlanCard({ TIER }: IPlan) {
  const checkoutUrl = await createCheckoutSession({
    planTier: TIER,
  });

  return (
    <div>
      <p>{TIER}</p>
      {checkoutUrl ? <a href={checkoutUrl}>Buy {TIER}</a> : <p>Loading...</p>}
    </div>
  );
}
