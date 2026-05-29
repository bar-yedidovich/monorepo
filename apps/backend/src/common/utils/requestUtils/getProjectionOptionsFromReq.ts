import { Request } from 'express';

export const getProjectionOptionsFromReq = (req: Request) => {
	const projectionOptionsKeys = req.query.projection as string | string[] | undefined;
	return projectionOptionsKeys
		? Array.isArray(projectionOptionsKeys)
			? projectionOptionsKeys.reduce((prev, curr) => {
					return {
						...prev,
						[curr]: true,
					};
				}, {})
			: { [projectionOptionsKeys]: true }
		: undefined;
};
