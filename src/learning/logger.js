import fs from 'fs';
import path from 'path';
import pino from 'pino';
import { config, nodeEnvs } from './config.js';

const createLogStreams = () => {
    const streams = [{ stream: process.stdout }];
    if (config.nodeEnv === nodeEnvs.offline) {
        const logsDir = path.join('.', 'logs');
        fs.mkdirSync(logsDir, { recursive: true });
        // TODO Logs do not rotate for this we need another library such as logrotate
        streams.push({
            stream: pino.destination({
                dest: path.join(logsDir, 'output.log'),
                sync: false,
            }),
        });
    }
    return streams;
};

export const logger = pino(
    {
        level: config.loggerLevel || 'info',
        formatters: {
            level: (label) => ({ level: label }),
        },
    },
    pino.multistream(createLogStreams())
);
