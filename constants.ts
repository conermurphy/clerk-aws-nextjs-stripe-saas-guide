import { IPlan } from './types';

export const PLANS: IPlan[] = [
  {
    TIER: 'FREE',
    LIMITATIONS: {
      BUTTON_CLICKS: 3,
    },
  },
  {
    TIER: 'PRO',
    PRODUCT_ID: process.env.PRO_PROD_ID,
    PLAN_ID: process.env.PRO_PRICE_ID,
    LIMITATIONS: {
      BUTTON_CLICKS: 10,
    },
  },
  {
    TIER: 'PREMIUM',
    PRODUCT_ID: process.env.PREMIUM_PROD_ID,
    PLAN_ID: process.env.PREMIUM_PRICE_ID,
    LIMITATIONS: {
      BUTTON_CLICKS: -1,
    },
  },
];
