/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, RequestHandler } from 'express';
import { GENERAL_ERROR_STATUS } from '../constants';

// because err is the first param (meaning we need all four params in the function definition) express catches errors given to the 'next' function in the controllers
export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, _next) => {
	const error = err.message || err;
	const logError = err.logError || error || '--No log error was provided--';
	console.log(`%c> ERROR: ${req.method} Request path: ${req.path} => ${logError}`, 'color: red');
	res.status(err.status || GENERAL_ERROR_STATUS).send({ message: error });
};

export const invalidPathHandler: RequestHandler = (req, res, _next) => {
	res.redirect(`/api/error/notFound?originalPath=${req.originalUrl}`);
};
