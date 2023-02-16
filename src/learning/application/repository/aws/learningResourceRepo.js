import { v4 as uuid } from 'uuid';

import { ScanCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { LearningResource } from '../../../domain/model/learningResource.js';
import { dbClient } from './dbClient.js';

export class LearningResourceRepo {
    #dbClient;
    constructor() {
        this.#dbClient = dbClient;
    }

    async getAll() {
        const command = new ScanCommand({ TableName: 'LEARNING_RESOURCES' });
        const data = await this.#dbClient.send(command);

        return data.Items.map((item) =>
            LearningResource.create(item.id.S, {
                courseName: item.courseName.S,
                platform: item.platform.S,
                url: item.url.S,
                account: item.account.S,
                expertise: item.expertise.S,
                seniorityLevel: item.seniorityLevel.S,
                updatedAt: item.updatedAt.S,
            })
        );
    }

    async create(learningResource) {
        const newId = uuid();
        const command = new PutItemCommand({
            TableName: 'LEARNING_RESOURCES',
            Item: {
                id: { S: newId },
                courseName: { S: learningResource.getCourseName() },
                platform: { S: learningResource.getPlatform() },
                url: { S: learningResource.getUrl() },
                account: { S: learningResource.getAccount() },
                expertise: { S: learningResource.getExpertise() },
                seniorityLevel: { S: learningResource.getSeniorityLevel() },
                updatedAt: { S: learningResource.getUpdatedAt() },
            },
        });
        await this.#dbClient.send(command);

        return LearningResource.copy(newId, learningResource);
    }
}
