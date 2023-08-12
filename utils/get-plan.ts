import { PLANS } from '@/constants';
import { IPlan } from '@/types';

export default function getPlan(tier: IPlan['TIER']) {
  const userPlan = PLANS?.find((plan) => plan.TIER === tier);

  return userPlan;
}
