import { NOT_FOUND_STATUS } from '../../common/constants';
import express from 'express';

const errorRoutes = express.Router({ mergeParams: true });

errorRoutes.get('/notFound', (req, res) => {
	const url = req.query.originalPath || req.path;
	res.status(NOT_FOUND_STATUS).send(`The URL: ${url} you are trying to reach does not exist.`);
});

export default errorRoutes;
