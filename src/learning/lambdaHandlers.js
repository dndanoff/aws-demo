import { v4 as uuid } from 'uuid';

import { LearningResourceRepo } from './application/repository/aws/learningResourceRepo.js';
import { logger } from './logger.js';
import { ApiError } from './domain/service/error.js';
import { GetLearningResources } from './domain/service/query/getLearningResources.js';
import { CreateLearningResource } from './domain/service/command/createLearningResource.js';

const formatResponse = ({ body, status = 200 }) => ({
    statusCode: status,
    body,
});

const errorHandler = async (lambdaHandler) => {
    try {
        const response = await lambdaHandler();
        return response;
    } catch (err) {
        if (!(err instanceof ApiError)) {
            return new ApiError(err.message);
        }
        return err;
    }
};

const learningResourceRepo = new LearningResourceRepo();

export const getLearningResources = async (_event, _context, _callback) =>
    errorHandler(async () => {
        const log = logger.child({ request_uuid: uuid() });
        const getLearningResourcesService = new GetLearningResources({
            learningResourceRepo,
        });
        const resources = await getLearningResourcesService.execute();
        log.info({
            msg: 'Successfully called getLearningResources',
            resources,
            count: resources.length,
        });
        return formatResponse({
            body: { resources },
        });
    });

export const createLearningResource = async (event, _context, _callback) =>
    errorHandler(async () => {
        const log = logger.child({ request_uuid: uuid() });
        const createLearningResourceService = new CreateLearningResource({
            learningResourceRepo,
        });
        const params = JSON.parse(event.body);
        const resource = await createLearningResourceService.execute(params);
        log.info({
            msg: 'Successfully called createLearningResource',
            resource,
        });
        return formatResponse({
            body: { resource },
            status: 201,
        });
    });
