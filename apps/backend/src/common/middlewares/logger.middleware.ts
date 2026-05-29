import { RequestHandler } from 'express';

export const loggerMiddleware: RequestHandler = (req, _res, next) => {
	console.log(`%c> New ${req.method} Request path: ${req.path}`, 'color: yellow');
	next();
};
