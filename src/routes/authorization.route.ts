import { authController } from '@controllers';
import { authMiddleware, errorMiddleware } from '@middlewares';
import { Router } from 'express';

const router = Router();
const controller = errorMiddleware.errorHandler(authController);

router.get('/user', authMiddleware.checkToken, controller.getUser);

router.post('/sign-in', controller.signIn);

router.post('/refresh', controller.refreshToken);

router.post('/sign-up', controller.signUp);

export default router;
