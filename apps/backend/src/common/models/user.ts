import { cryptPassword } from '../../libs/bcrypt';
import { Schema, model } from 'mongoose';
import { User } from '../types/UserTypes';

const UserSchema = new Schema<User>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		birthDate: { type: Date, required: false },
		role: {
			type: Schema.Types.ObjectId,
			ref: 'Role',
		},
	},
	{
		toJSON: {
			transform(_doc, ret) {
				delete ret.password;
				delete ret.__v;
			},
		},
	}
);

UserSchema.pre('save', function (next) {
	const user = this as User;
	if (this.isModified('password')) {
		user.password = cryptPassword(user.password);
	}
	next();
});

export default model('User', UserSchema);
