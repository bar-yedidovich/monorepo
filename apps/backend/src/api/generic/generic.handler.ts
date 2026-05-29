import { SUCCESS_STATUS } from '../../common/constants';
import {
	getFilterOptionsFromReq,
	getModelNameFromReq,
	getPopulateOptionsFromReq,
	getProjectionOptionsFromReq,
} from '../../common/utils';
import {
	createModels,
	deleteModel,
	deleteModels,
	getModels,
	updateModel,
	updateModels,
} from '../../data';
import { RequestHandler } from 'express';

export const createMultipleOrSingleData: RequestHandler = async (req, res, next) => {
	try {
		const modelName = getModelNameFromReq(req);
		const modelData = req.body;
		const result = await createModels(modelName, modelData);
		return res.status(SUCCESS_STATUS).send(result);
	} catch (err) {
		next(err);
	}
};

export const getMultipleOrSingleDataByIdOrQuery: RequestHandler = async (req, res, next) => {
	try {
		const modelName = getModelNameFromReq(req);
		const filter = getFilterOptionsFromReq(req);
		const projection = getProjectionOptionsFromReq(req);
		const populate = getPopulateOptionsFromReq(req);
		const result = await getModels(modelName, {
			filter,
			projection,
			options: { populate },
		});
		return res.status(SUCCESS_STATUS).send(result);
	} catch (err) {
		next(err);
	}
};

export const updateSingleDataByIdOrQuery: RequestHandler = async (req, res, next) => {
	try {
		const modelName = getModelNameFromReq(req);
		const newData = req.body;
		const filter = getFilterOptionsFromReq(req);
		const result = await updateModel(modelName, {
			newData,
			filter,
		});
		return res.status(SUCCESS_STATUS).send(result);
	} catch (err) {
		next(err);
	}
};

export const updateMultipleDataByIdOrQuery: RequestHandler = async (req, res, next) => {
	try {
		const modelName = getModelNameFromReq(req);
		const newData = req.body;
		const filter = getFilterOptionsFromReq(req);
		const result = await updateModels(modelName, {
			newData,
			filter,
		});
		return res.status(SUCCESS_STATUS).send(result);
	} catch (err) {
		next(err);
	}
};

export const deleteSingleDataByIdOrQuery: RequestHandler = async (req, res, next) => {
	try {
		const modelName = getModelNameFromReq(req);
		const filter = getFilterOptionsFromReq(req);
		const result = await deleteModel(modelName, { filter });
		return res.status(SUCCESS_STATUS).send(result);
	} catch (err) {
		next(err);
	}
};

export const deleteMultipleDataByIdsOrQuery: RequestHandler = async (req, res, next) => {
	try {
		const modelName = getModelNameFromReq(req);
		const filter = getFilterOptionsFromReq(req);
		const result = await deleteModels(modelName, { filter });
		return res.status(SUCCESS_STATUS).send(result);
	} catch (err) {
		next(err);
	}
};
