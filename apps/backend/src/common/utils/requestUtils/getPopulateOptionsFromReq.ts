import { Request } from 'express';

export const getPopulateOptionsFromReq = (req: Request) => {
	const populateOptions = req.query.populate as string | string[] | undefined;
	return populateOptions
		? Array.isArray(populateOptions)
			? populateOptions
			: [populateOptions]
		: [];
};
