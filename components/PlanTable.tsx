// ./components/PlanTable.tsx

import { PLANS } from '@/constants';
import getCurrentUser from '@/utils/db/get-current-user';
import createCheckoutSession from '@/utils/stripe/create-checkout-session';
import createStripeUserId from '@/utils/stripe/create-stripe-user-id';

export default async function PlanTable() {
  const user = await getCurrentUser();
  let stripeCustomerId = '';

  if (!user) return null;

  if (user?.stripeCustomerId) {
    stripeCustomerId = user.stripeCustomerId;
  } else {
    stripeCustomerId = await createStripeUserId({ user });
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-bold">Plans</p>
      <div className="grid grid-cols-2 w-full text-center gap-10">
        {PLANS.map(async (plan) => {
          if (plan.TIER === 'FREE') return null;

          const checkoutUrl = await createCheckoutSession({
            planId: plan.PLAN_ID,
            stripeCustomerId,
            user,
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
