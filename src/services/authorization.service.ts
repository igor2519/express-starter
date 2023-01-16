import { errorConstants } from '@constants';
import { userCreator } from '@dto-creators';
import { ApplicationError } from '@errors';
import { usersRepository } from '@repositories';
import { tokenUtil, envUtil } from '@utils';
import bcrypt from 'bcrypt';
import { ValidationError } from 'sequelize';

import type { IUserCreateRequest } from '@types';
import type { UserRole } from 'enums';

const env = envUtil.getEnv();

const createAuthTokens = (id: string, role: UserRole) => {
  const accessToken = tokenUtil.createJwtToken({ id, role }, env.auth.authTokenDuration);

  const refreshToken = tokenUtil.createJwtToken({ id, role }, env.auth.refreshTokenDuration);

  return {
    accessToken,
    refreshToken,
  };
};

const cryptPass = (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync());

const getUser = async (id: string) => {
  const user = await usersRepository.getOneByFilter({ id });
  if (!user) {
    throw new ApplicationError(errorConstants.unauthorized);
  }

  return userCreator.createFullUserDto(user);
};

const signIn = async (email: string, password: string) => {
  const user = await usersRepository.getOneByFilter({ email });

  if (!user || !user.password || !bcrypt.compareSync(password, user.password)) {
    throw new ApplicationError(errorConstants.invalidAuthorizationToken);
  }

  return createAuthTokens(user.id, user.role);
};

const refreshToken = async (token: string) => {
  const authData = tokenUtil.ensureJwtTokenVerified(token, errorConstants.invalidAuthorizationToken);
  if (!authData || authData.role == null) {
    throw new ApplicationError(errorConstants.invalidAuthorizationToken);
  }

  const user = await usersRepository.getOneByFilter({ id: authData.id });
  if (!user) {
    throw new ApplicationError(errorConstants.notExist('User'));
  }

  return createAuthTokens(authData.id, user.role);
};

const signUp = async (userPayload: IUserCreateRequest) => {
  try {
    const user = await usersRepository.create({
      ...userPayload,
      password: cryptPass(userPayload.password),
    });

    const token = tokenUtil.createJwtToken(
      { id: user.id, role: user.role },
      env.auth.otpExpiration,
      env.auth.jwtVerifySecret,
    );
    return token;
  } catch (e) {
    if (e instanceof ValidationError) {
      throw new ApplicationError(errorConstants.alreadyExist('User'));
    }
    throw e;
  }
};

const authorizationService = {
  getUser,
  signIn,
  refreshToken,
  signUp,
};
export default authorizationService;
