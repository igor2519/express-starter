import { authorizationService } from '@services';
import { signInSchema, signUpSchema, refreshTokenSchema } from '@validation';
import { UserRole } from 'enums';

import type { Request, Response } from 'express';

const getUser = async (req: Request, res: Response) => {
  const user = await authorizationService.getUser(req.user.id);
  res.json(user);
};

const signIn = async (req: Request, res: Response) => {
  const payload = await signInSchema.validate(req.body);
  const authData = await authorizationService.signIn(payload.email, payload.password);
  res.json(authData);
};

const refreshToken = async (req: Request, res: Response) => {
  const payload = await refreshTokenSchema.validate(req.body);
  const authData = await authorizationService.refreshToken(payload.token);
  res.json(authData);
};

const signUp = async (req: Request, res: Response) => {
  const payload = await signUpSchema.validate(req.body);
  const token = await authorizationService.signUp({ ...payload, role: UserRole.User });
  res.json({ token });
};

export default {
  getUser,
  signIn,
  refreshToken,
  signUp,
};
