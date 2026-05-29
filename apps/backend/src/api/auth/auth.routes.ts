import express from 'express';
import {
	getUserWithAccessToken,
	loginHandler,
	logoutHandler,
	refreshAccessTokenHandler,
	registerHandler,
} from './auth.handler';
import {
	verifyAccessTokenMiddleware,
	verifyRefreshTokenMiddleware,
} from './middlewares/verifyToken.middleware';

const authRoutes = express.Router({ mergeParams: true });

authRoutes.post('/login', loginHandler);

authRoutes.post('/register', registerHandler);

authRoutes.get('/logout', verifyAccessTokenMiddleware, logoutHandler);

authRoutes.post('/refreshAccessToken', verifyRefreshTokenMiddleware, refreshAccessTokenHandler);

authRoutes.post('/getUserWithAccessToken', verifyAccessTokenMiddleware, getUserWithAccessToken);

export default authRoutes;
