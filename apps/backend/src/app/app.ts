import { connectToDb } from '../libs/db/mongoose';
import express from 'express';
import { useMiddlewaresAfterRoutes, useMiddlewaresBeforeRoutes } from './middlewares';
import router from './routes';

const createApp = async () => {
	const app = express();

	useMiddlewaresBeforeRoutes(app);
	app.use('/api', router);
	useMiddlewaresAfterRoutes(app);
	await connectToDb();

	return app;
};

export default createApp;
