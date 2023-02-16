import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

import { config } from '../../../config.js';

export const dbClient = new DynamoDBClient({
    region: config.aws.region,
    endpoint: config.aws.endpoint,
});
