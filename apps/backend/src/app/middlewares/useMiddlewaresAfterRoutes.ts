import {
	errorHandlerMiddleware,
	invalidPathHandler,
} from '../../common/middlewares/errorHandlers.middleware';
import { Express } from 'express';

export const useMiddlewaresAfterRoutes = (app: Express) => {
	app.use(errorHandlerMiddleware);
	app.use(invalidPathHandler);
};
