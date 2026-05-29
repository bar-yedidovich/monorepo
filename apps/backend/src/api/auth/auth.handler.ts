import { SUCCESS_STATUS, UNAUTHORIZED_STATUS, notAllowedMessage } from '../../common/constants';
import { UserLoginData, UserRegisterData } from '../../common/types/UserTypes';
import { RequestHandler } from 'express';
import { login, logout, refreshAccessToken, register } from './auth.logic';

export const loginHandler: RequestHandler = async (req, res, next) => {
	try {
		// const accessToken = getTokenFromReq(req);
		const modelData: UserLoginData = req.body;
		const { refreshToken, ...result } = await login(modelData);
		return res
			.status(SUCCESS_STATUS)
			.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				sameSite: 'strict',
			})
			.send(result);
	} catch (err) {
		next(err);
	}
};

export const registerHandler: RequestHandler = async (req, res, next) => {
	try {
		const modelData: UserRegisterData = req.body;
		const { refreshToken, ...result } = await register(modelData);
		return res
			.status(SUCCESS_STATUS)
			.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
			.send(result);
	} catch (err) {
		next(err);
	}
};

export const logoutHandler: RequestHandler = async (req, res, next) => {
	try {
		const userFromAccessToken = req.user;
		const result = await logout(userFromAccessToken);
		return res
			.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'strict' })
			.status(SUCCESS_STATUS)
			.send(result);
	} catch (err) {
		next(err);
	}
};

export const refreshAccessTokenHandler: RequestHandler = (req, res, next) => {
	try {
		const userFromRefreshToken = req.user;
		const result = refreshAccessToken(userFromRefreshToken);
		return res.status(SUCCESS_STATUS).send(result);
	} catch (err) {
		next(err);
	}
};

// this uses the accessToken middleware
export const getUserWithAccessToken: RequestHandler = (req, res, next) => {
	try {
		const userFromAccessToken = req.user;
		if (userFromAccessToken) {
			return res.status(SUCCESS_STATUS).send(userFromAccessToken);
		}
		throw { message: notAllowedMessage, status: UNAUTHORIZED_STATUS };
	} catch (err) {
		next(err);
	}
};
