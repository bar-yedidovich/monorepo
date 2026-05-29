// TODO BAR: fix relative imports
import { ModelName } from '../../models';
import { Request } from 'express';

export const getModelNameFromReq = (req: Request) => {
	return req.params.model.toLowerCase() as ModelName;
};
