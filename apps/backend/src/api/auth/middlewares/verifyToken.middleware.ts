import { getUser, verifyAndDecodeAccessToken, verifyAndDecodeRefreshToken } from '../auth.services';
import { NOT_ALLOWED_STATUS, notAllowedMessage } from '../../../common/constants';
import { getAccessTokenFromReq, getRefreshTokenFromReq } from '../../../common/utils';
import { RequestHandler } from 'express';

export const verifyAccessTokenMiddleware: RequestHandler = async (req, res, next) => {
	try {
		const accessToken = getAccessTokenFromReq(req);
		if (!accessToken) {
			return res.status(NOT_ALLOWED_STATUS).send(notAllowedMessage);
		}
		const decodedData = verifyAndDecodeAccessToken(accessToken);
		if (decodedData && decodedData.userId) {
			req.user = await getUser({ _id: decodedData.userId });
			return next();
		} else {
			return res.status(NOT_ALLOWED_STATUS).send(notAllowedMessage);
		}
	} catch (err) {
		return res.status(NOT_ALLOWED_STATUS).send(err.message || err);
	}
};

export const verifyRefreshTokenMiddleware: RequestHandler = async (req, res, next) => {
	try {
		const refreshToken = getRefreshTokenFromReq(req);
		if (!refreshToken) {
			return res.status(NOT_ALLOWED_STATUS).send(notAllowedMessage);
		}
		const decodedData = verifyAndDecodeRefreshToken(refreshToken);
		if (decodedData && decodedData.userId) {
			req.user = await getUser({ _id: decodedData.userId });
			return next();
		} else {
			return res.status(NOT_ALLOWED_STATUS).send(notAllowedMessage);
		}
	} catch (err) {
		return res.status(NOT_ALLOWED_STATUS).send(err.message || err);
	}
};
