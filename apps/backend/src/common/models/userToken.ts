import { Schema, model } from 'mongoose';
import { UserToken } from '../types/UserTypes';

const UserTokenSchema = new Schema<UserToken>(
	{
		refreshToken: { type: String, required: true },
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		toJSON: {
			transform(_doc, ret) {
				delete ret.__v;
			},
		},
	}
);

export default model('UserToken', UserTokenSchema);
