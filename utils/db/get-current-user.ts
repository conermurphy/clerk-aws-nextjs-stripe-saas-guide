import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { currentUser } from '@clerk/nextjs';
import { db } from '@/config';
import { IGetCommandOutput, IUser } from '@/types';

export default async function getCurrentUser() {
  const currentUserData = await currentUser();

  if (!currentUserData) {
    return null;
  }

  const { Item: user } = (await db.send(
    new GetCommand({
      TableName: process.env.DB_TABLE_NAME,
      Key: {
        pk: `USER#${currentUserData?.id}`,
        sk: `USER#${currentUserData?.id}`,
      },
    })
  )) as IGetCommandOutput<IUser>;

  return user;
}
