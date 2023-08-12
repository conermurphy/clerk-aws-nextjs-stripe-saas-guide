import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { db } from '@/config';

export async function POST() {
  const currentUserData = await currentUser();

  if (!currentUserData) {
    return NextResponse.error();
  }

  await db.send(
    new PutCommand({
      TableName: process.env.DB_TABLE_NAME,
      Item: {
        pk: `USER#${currentUserData?.id}`,
        sk: `USER#${currentUserData?.id}`,
        email: currentUserData.emailAddresses[0].emailAddress,
        createdAt: currentUserData.createdAt,
        plan: 'FREE',
        buttonClicks: 0,
      },
    })
  );

  return NextResponse.json({});
}
