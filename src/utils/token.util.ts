import { ApplicationError } from '@errors';
import { envUtil } from '@utils';
import jwt from 'jsonwebtoken';

import type { IRequestUser } from '@types';

const env = envUtil.getEnv();

export const createJwtToken = (
  data: IRequestUser,
  expirationTime: string = env.auth.authTokenDuration,
  secret = env.auth.jwtSecret,
) => {
  const token = jwt.sign(
    {
      ...data,
    },
    secret,
    { expiresIn: expirationTime },
  );

  return token;
};

export const verifyJwtToken = (token: string, secret = env.auth.jwtSecret) => jwt.verify(token, secret) as IRequestUser;

export const ensureJwtTokenVerified = (token: string, errorMessage: string, secret = env.auth.jwtSecret) => {
  try {
    return jwt.verify(token, secret) as IRequestUser;
  } catch {
    throw new ApplicationError(errorMessage);
  }
};

const tokenUtil = {
  createJwtToken,
  verifyJwtToken,
  ensureJwtTokenVerified,
};

export default tokenUtil;
