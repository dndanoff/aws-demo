import { cleanEnv, str } from 'envalid';

const nodeEnvs = { local: 'local', dev: 'dev', qa: 'qa', prod: 'prod' };

const localDefaults = {
    NODE_ENV: 'local',
    AWS_REGION: 'us-east-1',
};

const devDefaults = {
    NODE_ENV: 'dev',
    AWS_REGION: 'us-east-1',
};

const qaDefaults = {
    NODE_ENV: 'qa',
    AWS_REGION: 'us-east-1',
};

const defaults = { local: localDefaults, dev: devDefaults, qa: qaDefaults };

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
    }
);

const config = {
    nodeEnv: env.NODE_ENV,
    loggerLevel: env.LOG_LEVEL,
    aws: {
        region: env.AWS_REGION,
        endpoint:
            env.NODE_ENV === nodeEnvs.local
                ? 'http://aws-demo-localstack_main:4566'
                : undefined,
    },
};

export { config, nodeEnvs };
