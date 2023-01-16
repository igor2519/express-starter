import { NextFunction, Request, Response } from 'express';

import { errorConstants } from '@constants';

import { ApplicationError } from '@errors';
import { tokenUtil } from '@utils';

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = String(req.header('Authorization'));
    req.user = tokenUtil.verifyJwtToken(token);
    if (!req.user) {
      throw new ApplicationError(errorConstants.unauthorized, 401);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const verifyRole = (role: string[]) => (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!role.find((i) => i === req.user.role)) {
      throw new ApplicationError(errorConstants.forbidden, 403);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default {
  checkToken,
  verifyRole,
};
