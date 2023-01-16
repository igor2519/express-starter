import { number, object, string } from 'yup';

const validationMessage = (field: string, type: string) =>
  `Please enter correct ${field} field type (${type}) in .env file`;

const databaseSchema = object().shape({
  host: string()
    .required(validationMessage('AWS_DATABASE_API_VERSION', 'string'))
    .typeError(validationMessage('AWS_DATABASE_API_VERSION', 'string')),
  port: string()
    .required(validationMessage('AWS_DATABASE_API_VERSION', 'string'))
    .typeError(validationMessage('AWS_DATABASE_API_VERSION', 'string')),
  username: string()
    .required(validationMessage('AWS_DATABASE_API_VERSION', 'string'))
    .typeError(validationMessage('AWS_DATABASE_API_VERSION', 'string')),
  password: string()
    .required(validationMessage('AWS_DATABASE_API_VERSION', 'string'))
    .typeError(validationMessage('AWS_DATABASE_API_VERSION', 'string')),
  database: string()
    .required(validationMessage('AWS_DATABASE_API_VERSION', 'string'))
    .typeError(validationMessage('AWS_DATABASE_API_VERSION', 'string')),
});

const authSchema = object().shape({
  jwtSecret: string()
    .required(validationMessage('JWT_SECRET', 'string'))
    .typeError(validationMessage('JWT_SECRET', 'string')),
  jwtForgotSecret: string()
    .required(validationMessage('JWT_FORGOT_SECRET', 'string'))
    .typeError(validationMessage('JWT_FORGOT_SECRET', 'string')),
  jwtVerifySecret: string()
    .required(validationMessage('JWT_VERIFY_SECRET', 'string'))
    .typeError(validationMessage('JWT_VERIFY_SECRET', 'string')),
  authTokenDuration: string()
    .required(validationMessage('AUTH_TOKEN_EXPIRATION', 'string'))
    .typeError(validationMessage('AUTH_TOKEN_EXPIRATION', 'string')),
  refreshTokenDuration: string()
    .required(validationMessage('REFRESH_TOKEN_EXPIRATION', 'string'))
    .typeError(validationMessage('REFRESH_TOKEN_EXPIRATION', 'string')),
  otpExpiration: string()
    .required(validationMessage('OTP_TOKEN_EXPIRATION', 'string'))
    .typeError(validationMessage('OTP_TOKEN_EXPIRATION', 'string')),
});

const projectSchema = object().shape({
  port: number(),
});

export const envSchema = object()
  .shape({
    project: projectSchema,
    database: databaseSchema,
    auth: authSchema,
  })
  .noUnknown();
