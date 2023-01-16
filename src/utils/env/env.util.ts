import { config } from 'dotenv';

import { EnvMode } from './env.type';
import { envSchema } from './schema';

import type { IEnv } from './env.type';
config();

const processEnvMode = process.env.NODE_ENV?.toLowerCase() as EnvMode;
const envMode = Object.values(EnvMode).includes(processEnvMode) ? processEnvMode : EnvMode.DEV_ENV;

const isEnv = (mode: EnvMode) => envMode.toLowerCase() === mode;

export const getEnvMode = () => envMode;

export const isDevEnv = () => isEnv(EnvMode.DEV_ENV);

export const isProdEnv = () => isEnv(EnvMode.PROD_ENV);

export const isTestEnv = () => isEnv(EnvMode.TEST_ENV);

const mapEnvValues = {
  bool: (envValue: string) => envValue === 'true',
  number: (envValue: string, defaultValue: number) => {
    const value = Number(envValue);

    return Number.isNaN(value) ? defaultValue : value;
  },
  array: (envValue: string, delimiter = ',') => envValue.split(delimiter).filter(Boolean),
  includes: (envValue?: string, values: Array<string> = [], defaultValue?: string) => {
    if (!envValue) {
      return defaultValue ?? '';
    }
    return values.includes(envValue) ? envValue : defaultValue ?? '';
  },
};

const defaultDbPort = 5432;

const mapEnv = () => {
  const parsed: IEnv = {
    project: {
      port: mapEnvValues.number(process.env.PORT || '', 5000),
    },
    database: {
      host: process.env.DATABASE_HOST || '',
      port: mapEnvValues.number(process.env.DATABASE_PORT || '', defaultDbPort),
      username: process.env.DATABASE_USERNAME || '',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE_DATABASE || '',
    },
    auth: {
      jwtSecret: process.env.JWT_SECRET || '',
      jwtForgotSecret: process.env.JWT_FORGOT_SECRET || '',
      jwtVerifySecret: process.env.JWT_VERIFY_SECRET || '',
      authTokenDuration: process.env.AUTH_TOKEN_EXPIRATION || '',
      refreshTokenDuration: process.env.REFRESH_TOKEN_EXPIRATION || '',
      otpExpiration: process.env.OTP_TOKEN_EXPIRATION || '',
    },
  };
  return Object.freeze(parsed);
};

let env: IEnv;
export const getEnv = (): Readonly<IEnv> => {
  if (!env) {
    env = mapEnv();
    envSchema.validateSync(env);
  }
  return env;
};
