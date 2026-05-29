import config from '../../config/config';
import mongoose from 'mongoose';

export const connectToDb = () => {
	return mongoose.connect(config.connectionString, {});
};
