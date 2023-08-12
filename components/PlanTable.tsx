import { PLANS } from '@/constants';
import PlanCard from './PlanCard';

export default function PlanTable() {
  return (
    <div>
      <p>Plans</p>
      {PLANS.map((plan) =>
        plan.TIER !== 'FREE' ? <PlanCard {...plan} /> : null
      )}
    </div>
  );
}
