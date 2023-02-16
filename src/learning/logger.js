import pino from 'pino';
import { config } from './config.js';

const createLogStreams = () => [{ stream: process.stdout }];

export const logger = pino(
    {
        level: config.loggerLevel || 'info',
        formatters: {
            level: (label) => ({ level: label }),
        },
    },
    pino.multistream(createLogStreams())
);
