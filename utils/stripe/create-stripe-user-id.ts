import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import Stripe from 'stripe';
import { IUser } from '@/types';
import { db } from '@/config';

interface IProps {
  user: IUser;
}

export default async function createStripeUserId({ user }: IProps) {
  let stripeCustomerId = '';

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
  });

  const { data } = await stripe.customers.list({
    email: user.email,
  });

  if (!data.length) {
    const stripeCustomer = await stripe.customers.create({
      email: user.email,
    });

    stripeCustomerId = stripeCustomer.id;
  } else {
    stripeCustomerId = data?.[0]?.id;
  }

  await db.send(
    new UpdateCommand({
      TableName: process.env.DB_TABLE_NAME,
      Key: {
        pk: user.pk,
        sk: user.sk,
      },
      UpdateExpression: 'SET stripeCustomerId = :stripeCustomerId',
      ExpressionAttributeValues: {
        ':stripeCustomerId': stripeCustomerId,
      },
    })
  );

  return stripeCustomerId;
}
