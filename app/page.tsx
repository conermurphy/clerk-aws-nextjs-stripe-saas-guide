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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row py-4 border-b justify-between items-center">
        <UserButton afterSignOutUrl="/" />
        <p className="text-xl">
          Your Current Plan: <span className="font-bold">{user.plan}</span>
        </p>
      </div>
      <Button plan={plan} current={buttonClicks} />
      {plan.TIER === 'FREE' ? <PlanTable /> : null}
      <CustomerPortal />
    </div>
  );
}
