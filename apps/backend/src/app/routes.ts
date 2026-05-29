import authRoutes from '../api/auth/auth.routes';
import errorRoutes from '../api/error/error.routes';
import genericRoutes from '../api/generic/generic.routes';
import express from 'express';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/generic', genericRoutes);
router.use('/error', errorRoutes);

export default router;
