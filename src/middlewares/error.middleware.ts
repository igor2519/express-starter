import { errorConstants } from '@constants';
import { envUtil } from '@utils';
import { ApplicationError } from 'errors';
import { ValidationError } from 'yup';

import type { NextFunction, Request, Response } from 'express';

const getClientError = (error: ApplicationError) => {
  if (error.payload) {
    return { message: error.message, errors: error.payload };
  }

  return { message: error.message };
};

const getServerError = (error: Error) => {
  if (envUtil.isDevEnv()) {
    return { message: error.message, stack: error.stack };
  }

  return { message: errorConstants.internalError };
};

const createResponse = (res: Response, err: Error) => {
  if (err instanceof ApplicationError) {
    res.status(err.status).json(getClientError(err));
    return;
  }

  if (err instanceof ValidationError) {
    res.status(400).json(err);
    return;
  }

  res.status(500).json(getServerError(err));
};

type AsyncRequestHandler =
  | ((req: Request, res: Response, next: NextFunction) => Promise<void>)
  | ((req: Request, res: Response, next: NextFunction) => void);

const errorHandler = (controller: Record<string, AsyncRequestHandler>) =>
  Object.entries(controller).reduce(
    (acc: Record<string, AsyncRequestHandler>, [key, handler]) => ({
      ...acc,
      [key]: async (req: Request, res: Response, next: NextFunction) => {
        try {
          await handler(req, res, next);
        } catch (e) {
          next(e);
        }
      },
    }),
    {},
  );

export default { createResponse, errorHandler };
