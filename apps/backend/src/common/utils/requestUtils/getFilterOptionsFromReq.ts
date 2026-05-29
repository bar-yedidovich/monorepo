import { Request } from 'express';

export const getFilterOptionsFromReq = (req: Request, defaultIdKey = '_id') => {
	const idKey = (req.query?.idKey as string) || defaultIdKey;
	const filterOptions = req.params?.id
		? { [idKey]: req.params.id }
		: req.query.ids || req.query.id
			? { [idKey]: req.query.ids || req.query.id }
			: { ...req.query };
	return filterOptions;
};
