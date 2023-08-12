import { GetCommandOutput } from '@aws-sdk/lib-dynamodb';

export type IUser = {
  pk: string;
  sk: string;
  email: string;
  createdAt: string;
  plan: 'FREE' | 'PRO' | 'PREMIUM';
  buttonClicks: number;
  subscriptionStatus?: string;
  stripeCustomerId: string;
};

export type IPlan = {
  TIER: 'FREE' | 'PRO' | 'PREMIUM';
  LIMITATIONS: {
    BUTTON_CLICKS: number;
  };
  PRODUCT_ID?: string;
  PLAN_IDS?: {
    MONTHLY?: string;
  };
};

export type IGetCommandOutput<T> = Omit<GetCommandOutput, 'Item'> & {
  Item?: T;
};
