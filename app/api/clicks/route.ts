import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { NextResponse } from 'next/server';
import { db } from '@/config';
import getCurrentUser from '@/utils/db/get-current-user';
import getPlan from '@/utils/get-plan';

export async function POST() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.error();
  }

  const plan = getPlan(user.plan);

  if (!plan) {
    return NextResponse.error();
  }

  const { BUTTON_CLICKS: BUTTON_CLICKS_LIMIT } = plan.LIMITATIONS;

  if (BUTTON_CLICKS_LIMIT !== -1 && user.buttonClicks >= BUTTON_CLICKS_LIMIT) {
    return NextResponse.json(
      {
        error: `You have reached your limit of ${BUTTON_CLICKS_LIMIT} button clicks. Please upgrade to continue clicking.`,
      },
      {
        status: 403,
      }
    );
  }

  await db.send(
    new UpdateCommand({
      TableName: process.env.DB_TABLE_NAME,
      Key: {
        pk: user.pk,
        sk: user.sk,
      },
      UpdateExpression: 'ADD buttonClicks :inc',
      ExpressionAttributeValues: {
        ':inc': 1,
      },
    })
  );

  return NextResponse.json({ status: 204 });
}

export async function GET() {
  const user = await getCurrentUser();

  return NextResponse.json(user?.buttonClicks);
}
