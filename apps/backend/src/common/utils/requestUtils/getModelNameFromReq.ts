import type { ModelName } from '../../models';
import { Request } from 'express';

export const getModelNameFromReq = (req: Request) => {
	const model = req.params.model;
	const name = Array.isArray(model) ? model[0] : model;
	return name.toLowerCase() as ModelName;
};
