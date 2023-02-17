import { v4 as uuid } from 'uuid';

import { LearningResourceRepo } from './application/repository/aws/learningResourceRepo.js';
import { logger } from './logger.js';
import { errorHandler, formatResponse } from './lambdaUtils.js';
import { GetLearningResources } from './domain/service/query/getLearningResources.js';
import { CreateLearningResource } from './domain/service/command/createLearningResource.js';

let learningResourceRepo;
// Lazy load to speed up initialization phaze. This is just an example of a good practice https://aws.amazon.com/blogs/compute/operating-lambda-performance-optimization-part-2/
const initRepo = () => {
    if (!learningResourceRepo) {
        learningResourceRepo = new LearningResourceRepo();
    }

    return learningResourceRepo;
};

export const getLearningResources = async (_event, _context, _callback) =>
    errorHandler(async () => {
        const log = logger.child({ request_uuid: uuid() });
        const getLearningResourcesService = new GetLearningResources({
            learningResourceRepo: initRepo(),
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
            learningResourceRepo: initRepo(),
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
