import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { IPlan } from '@/types';
import getUserById from '@/utils/db/get-user-by-id';
import { db } from '@/config';

export async function POST(request: Request) {
  try {
    const sig = request?.headers?.get('stripe-signature');
    const requestBody = await request.text();

    if (!sig) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      // Use the Stripe SDK and request info to verify this Webhook request actually came from Stripe
      event = stripe.webhooks.constructEvent(requestBody, sig, endpointSecret);
    } catch (e) {
      const { message } = e as { message: string };
      // eslint-disable-next-line no-console
      console.log(`⚠️  Webhook signature verification failed.`, message);
      return NextResponse.json(
        { error: `Webhook signature verification failed.` },
        { status: 400 }
      );
    }

    switch (event.type) {
      // Handle a subscription being created or updated
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const productId = subscription.items.data[0].price.product.toString();

        const userNewTier = (await stripe.products.retrieve(productId)).metadata
          .tier as IPlan['TIER'];

        const user = await getUserById({
          id: subscription.metadata.payingUserId,
        });

        if (!user) {
          return NextResponse.json({ error: 'No user found' }, { status: 400 });
        }

        // If the user is cancelling their subscription, return and handle it in the .deleted event
        if (subscription.status === 'canceled') {
          break;
        }

        await db.send(
          new UpdateCommand({
            TableName: process.env.DB_TABLE_NAME,
            Key: {
              pk: user?.pk,
              sk: user?.sk,
            },
            ExpressionAttributeNames: {
              '#s': 'subscriptionStatus',
              '#p': 'plan',
            },
            UpdateExpression: 'set #s = :a, #p = :p',
            ExpressionAttributeValues: {
              ':a': 'ACTIVE',
              ':p': userNewTier,
            },
            ReturnValues: 'ALL_NEW',
          })
        );

        break;
      }

      // Handle a subscription being cancelled
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;

        const user = await getUserById({
          id: subscription.metadata.payingUserId,
        });

        if (!user) {
          return NextResponse.json({ error: 'No user found' }, { status: 400 });
        }

        await db.send(
          new UpdateCommand({
            TableName: process.env.DB_TABLE_NAME,
            Key: {
              pk: user?.pk,
              sk: user?.sk,
            },
            ExpressionAttributeNames: {
              '#s': 'subscriptionStatus',
              '#p': 'plan',
            },
            UpdateExpression: 'set #s = :a, #p = :p',
            ExpressionAttributeValues: {
              ':a': 'CANCELLED',
              ':p': 'FREE',
            },
            ReturnValues: 'ALL_NEW',
          })
        );
        break;
      }
      default: {
        break;
      }
    }

    return NextResponse.json(
      {
        received: true,
      },
      { status: 200 }
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Stripe webhook error', e);
    return NextResponse.json(
      {
        received: false,
      },
      { status: 500 }
    );
  }
}
