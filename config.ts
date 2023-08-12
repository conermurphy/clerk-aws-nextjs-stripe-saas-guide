import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const awsCredetnials = {
  accessKeyId: process.env.AWS_ACCOUNT_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCOUNT_SECRET_KEY,
};

const dynamoConfig = {
  region: process.env.AWS_ACCOUNT_REGION,
  credentials: awsCredetnials,
} as {
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  region: string;
};

const db = DynamoDBDocument.from(new DynamoDB(dynamoConfig), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: false,
  },
});

const fetcher = async <T>(url: string) =>
  fetch(url).then((res) => res.json() as T);

export { db, fetcher };
