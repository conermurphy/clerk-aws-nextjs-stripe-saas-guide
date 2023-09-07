declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STRIPE_SECRET_KEY: string;
      STRIPE_WEBHOOK_SECRET: string;
      PRO_PROD_ID: string;
      PREMIUM_PROD_ID: string;
      PRO_PRICE_ID: string;
      PREMIUM_PRICE_ID: string;
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      CLERK_SECRET_KEY: string;
      NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
      NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
      AWS_ACCOUNT_ACCESS_KEY: string;
      AWS_ACCOUNT_SECRET_KEY: string;
      AWS_ACCOUNT_REGION: string;
      DB_TABLE_NAME: string;
    }
  }
}

export {};
