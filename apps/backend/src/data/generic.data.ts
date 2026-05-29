import models, { ModelName, ModelTypes } from '../common/models';
import { DeleteOptions, UpdateOptions } from 'mongodb';
import { FilterQuery, ProjectionType, QueryOptions, SaveOptions, UpdateQuery } from 'mongoose';

export const createModels = <M extends ModelName>(
	modelName: M,
	{
		data,
		options,
	}: {
		data: Omit<ModelTypes[M], '_id'> | Omit<ModelTypes[M], '_id'>[];
		options?: SaveOptions;
	}
) => {
	const model = models[modelName];
	const modelData = Array.isArray(data) ? data : [data];
	return model.create(modelData, options);
};

export const getModels = <M extends ModelName>(
	modelName: M,
	{
		filter = {},
		projection,
		options,
	}: {
		filter?: FilterQuery<ModelTypes[M]>;
		projection?: ProjectionType<ModelTypes[M]>;
		options?: QueryOptions<ModelTypes[M]>;
	}
) => {
	const model = models[modelName];
	return model.find(filter, projection, options).exec();
};

export const updateModel = <M extends ModelName>(
	modelName: M,
	{
		newData,
		filter,
		options,
	}: {
		newData: UpdateQuery<ModelTypes[M]>;
		filter: FilterQuery<ModelTypes[M]>;
		options?: UpdateOptions & QueryOptions<ModelTypes[M]>;
	}
) => {
	const model = models[modelName];
	return model.updateOne(filter, newData, options);
};

export const updateModels = <M extends ModelName>(
	modelName: M,
	{
		newData,
		filter = {},
		options,
	}: {
		newData: UpdateQuery<ModelTypes[M]>;
		filter: FilterQuery<ModelTypes[M]>;
		options?: UpdateOptions & QueryOptions<ModelTypes[M]>;
	}
) => {
	const model = models[modelName];
	return model.updateMany(filter, newData, options);
};

export const deleteModel = <M extends ModelName>(
	modelName: M,
	{
		filter,
		options,
	}: { filter: FilterQuery<ModelTypes[M]>; options?: DeleteOptions & QueryOptions<ModelTypes[M]> }
) => {
	const model = models[modelName];
	return model.deleteOne(filter, options);
};

export const deleteModels = <M extends ModelName>(
	modelName: M,
	{
		filter,
		options,
	}: { filter: FilterQuery<ModelTypes[M]>; options?: DeleteOptions & QueryOptions<ModelTypes[M]> }
) => {
	const model = models[modelName];
	return model.deleteMany(filter, options);
};
