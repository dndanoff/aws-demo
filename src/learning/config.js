import { cleanEnv, str } from 'envalid';

const offlineDefaults = {
    NODE_ENV: 'offline',
    AWS_REGION: 'offline',
    AWS_ENDPOINT: 'http://localhost:8000',
};

const localDefaults = {
    NODE_ENV: 'local',
    AWS_REGION: 'us-east-1',
    AWS_ENDPOINT: 'http://aws-demo-localstack_main:4566',
};

const devDefaults = {
    NODE_ENV: 'dev',
    AWS_REGION: 'us-east-1',
};

const qaDefaults = {
    NODE_ENV: 'qa',
    AWS_REGION: 'us-east-1',
};

const defaults = {
    offline: offlineDefaults,
    local: localDefaults,
    dev: devDefaults,
    qa: qaDefaults,
};

const { NODE_ENV } = process.env;

const env = cleanEnv(
    { ...(defaults[NODE_ENV] ?? defaults.local), ...process.env },
    {
        NODE_ENV: str({
            desc: 'NODE_ENV is used by various libraries. We use only the standard values.',
        }),
        LOG_LEVEL: str({
            desc: 'Logger level.',
            default: 'info',
        }),
        AWS_REGION: str({
            desc: 'AWS Region',
        }),
        AWS_ENDPOINT: str({
            desc: 'Specifies different endpoint used for local development',
            default: undefined,
        }),
    }
);

export const config = {
    nodeEnv: env.NODE_ENV,
    loggerLevel: env.LOG_LEVEL,
    aws: {
        region: env.AWS_REGION,
        endpoint: env.AWS_ENDPOINT,
    },
};

export const nodeEnvs = {
    offline: 'offline',
    local: 'local',
    dev: 'dev',
    qa: 'qa',
    prod: 'prod',
};
