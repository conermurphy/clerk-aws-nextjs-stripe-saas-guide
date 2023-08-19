import { PLANS } from '@/constants';
import createCheckoutSession from '@/utils/stripe/create-checkout-session';

export default function PlanTable() {
  return (
    <div>
      <p>Plans</p>
      {PLANS.map(async (plan) => {
        if (plan.TIER === 'FREE') return null;

        const checkoutUrl = await createCheckoutSession({
          planTier: plan?.TIER,
        });

        return (
          <div>
            <p>{plan?.TIER}</p>
            {checkoutUrl ? (
              <a href={checkoutUrl}>Buy {plan?.TIER}</a>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
