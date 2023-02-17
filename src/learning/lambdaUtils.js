import { ApiError } from './domain/service/error.js';

export const formatResponse = ({ body, status = 200 }) => ({
    statusCode: status,
    body,
});

export const errorHandler = async (lambdaHandler) => {
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
