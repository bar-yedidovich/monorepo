import { loggerMiddleware } from '../../common/middlewares/logger.middleware';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

export const useMiddlewaresBeforeRoutes = (app: Express) => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	// TODO: add url's to cors - make it from config
	app.use(
		cors({ origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true })
	);
	app.use(compression());
	app.use(helmet());
	app.use(morgan('tiny'));
	app.use(loggerMiddleware);
};
