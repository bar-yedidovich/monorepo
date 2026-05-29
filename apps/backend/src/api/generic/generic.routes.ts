import { verifyAccessTokenMiddleware } from '../auth/middlewares/verifyToken.middleware';
import {
	createMultipleOrSingleData,
	deleteMultipleDataByIdsOrQuery,
	deleteSingleDataByIdOrQuery,
	getMultipleOrSingleDataByIdOrQuery,
	updateMultipleDataByIdOrQuery,
	updateSingleDataByIdOrQuery,
} from './generic.handler';
import express from 'express';

const genericRoutes = express.Router({ mergeParams: true });

genericRoutes.post('/:model', verifyAccessTokenMiddleware, createMultipleOrSingleData);

genericRoutes.get('/:model/:id*?', verifyAccessTokenMiddleware, getMultipleOrSingleDataByIdOrQuery);

genericRoutes.put('/single/:model/:id*?', verifyAccessTokenMiddleware, updateSingleDataByIdOrQuery);

genericRoutes.put(
	'/multiple/:model/:id*?',
	verifyAccessTokenMiddleware,
	updateMultipleDataByIdOrQuery
);

genericRoutes.delete('/single/:model/', verifyAccessTokenMiddleware, deleteSingleDataByIdOrQuery);

genericRoutes.delete(
	'/multiple/:model/:id*?',
	verifyAccessTokenMiddleware,
	deleteMultipleDataByIdsOrQuery
);

export default genericRoutes;
