import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { db } from '@/config';
import { IGetCommandOutput, IUser } from '@/types';

interface IProps {
  id: string;
}

export default async function getUserById({ id }: IProps) {
  const { Item: user } = (await db.send(
    new GetCommand({
      TableName: process.env.DB_TABLE_NAME,
      Key: {
        pk: id,
        sk: id,
      },
    })
  )) as IGetCommandOutput<IUser>;

  return user;
}
