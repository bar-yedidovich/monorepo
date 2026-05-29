import { Schema, model } from 'mongoose';
import { Role } from '../types/UserTypes';

const RoleSchema = new Schema<Role>(
	{
		name: { type: String, required: true },
		level: { type: Number, required: true },
	},
	{
		toJSON: {
			transform(_doc, ret) {
				delete ret.__v;
			},
		},
	}
);

export default model('Role', RoleSchema);
