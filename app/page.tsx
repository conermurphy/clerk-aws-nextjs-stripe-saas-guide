import { UserButton } from '@clerk/nextjs';
import getCurrentUser from '@/utils/db/get-current-user';
import Button from '@/components/Button';
import PlanTable from '@/components/PlanTable';
import getPlan from '@/utils/get-plan';
import CustomerPortal from '@/components/CustomerPortal';

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    return <p>Loading...</p>;
  }

  const { buttonClicks } = user;
  const plan = getPlan(user.plan);

  if (!plan) {
    return <p>No User Plan Found</p>;
  }

  const { BUTTON_CLICKS: BUTTON_CLICKS_LIMIT } = plan.LIMITATIONS;

  return (
    <div>
      <p>Current Plan: {user.plan}</p>
      <UserButton afterSignOutUrl="/" />
      <Button limit={BUTTON_CLICKS_LIMIT} current={buttonClicks} />
      {plan.TIER === 'FREE' ? <PlanTable /> : null}
      <CustomerPortal />
    </div>
  );
}
