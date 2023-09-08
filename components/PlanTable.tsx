import { PLANS } from '@/constants';
import createCheckoutSession from '@/utils/stripe/create-checkout-session';

export default function PlanTable() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-bold">Plans</p>
      <div className="grid grid-cols-2 w-full text-center gap-10">
        {PLANS.map(async (plan) => {
          if (plan.TIER === 'FREE') return null;

          const checkoutUrl = await createCheckoutSession({
            planId: plan.PLAN_ID,
          });

          return checkoutUrl ? (
            <a
              href={checkoutUrl}
              className="bg-blue-200 border-blue-400 border-2 text-blue-600 px-3 py-2 rounded-md drop-shadow-md font-bold"
            >
              Buy {plan?.TIER}
            </a>
          ) : (
            <p>Loading...</p>
          );
        })}
      </div>
    </div>
  );
}
