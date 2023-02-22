import { ApiError } from './domain/service/error.js';
import { config, nodeEnvs } from './config.js';

export const formatResponse = ({ body, status = 200 }) => ({
    statusCode: status,
    body: config.nodeEnv === nodeEnvs.offline ? JSON.stringify(body) : body,
});

export const errorHandler = async (log, lambdaHandler) => {
    try {
        const response = await lambdaHandler();
        return response;
    } catch (err) {
        log.error({
            msg: 'Error while processing request.',
            err,
        });
        if (!(err instanceof ApiError)) {
            return new ApiError(err.message);
        }
        return err;
    }
};
