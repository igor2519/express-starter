import { object, string } from 'yup';

export const signInSchema = object()
  .noUnknown()
  .shape({
    email: string().email().required().max(255),
    password: string().required().max(255),
  });

export const refreshTokenSchema = object()
  .noUnknown()
  .shape({
    token: string().max(1000).required(),
  });

export const signUpSchema = object()
  .noUnknown()
  .shape({
    fullName: string().min(2).max(100).required(),
    email: string().email().required().max(100),
    password: string().required().max(100),
  });
