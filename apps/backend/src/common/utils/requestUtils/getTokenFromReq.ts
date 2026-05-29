import { Request } from 'express';

export const getAccessTokenFromReq = (req: Request) => {
	return (
		req.headers.authorization?.split('Bearer ')[1] ||
		// these are not in use
		req.body.token ||
		req.query.token ||
		req.headers['x-access-token']
	);
};

export const getRefreshTokenFromReq = (req: Request) => {
	return req.headers.cookie?.split('refreshToken=')[1];
};
