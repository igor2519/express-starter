import { Router } from 'express';

import authRouter from './authorization.route';

const router = Router();

router.use('/auth', authRouter);

export default router;
