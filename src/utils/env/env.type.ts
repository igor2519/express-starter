export enum EnvMode {
  DEV_ENV = 'development',
  PROD_ENV = 'production',
  TEST_ENV = 'test',
}

interface IDatabaseConfigs {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface IAuthConfigs {
  jwtSecret: string;
  jwtForgotSecret: string;
  jwtVerifySecret: string;
  authTokenDuration: string;
  refreshTokenDuration: string;
  otpExpiration: string;
}

interface IProjectConfigs {
  port: number;
}

export interface IEnv {
  project: IProjectConfigs;
  database: IDatabaseConfigs;
  auth: IAuthConfigs;
}
