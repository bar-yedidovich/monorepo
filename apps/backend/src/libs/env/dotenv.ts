import dotenv from 'dotenv';

export const useEnv = () => {
	dotenv.config({ path: `environments/.env.${process.env.NODE_ENV}` });
};
