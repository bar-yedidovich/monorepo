import { Types } from 'mongoose';

export type IdFilterData = {
	_id: Types.ObjectId;
};

export type User = {
	_id: Types.ObjectId;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
	birthDate: Date;
	role: Types.ObjectId;
};

export type Role = {
	_id: Types.ObjectId;
	name: string;
	level: 1 | 2 | 3;
};

export type UserToken = { _id: Types.ObjectId; user: Types.ObjectId; refreshToken: string };

export type UserLoginData = { email?: string; password?: string };

export type TokenPayload = { email: string; userId: Types.ObjectId };

export type UserRegisterData = Omit<User, 'role' | '_id'>;

export type UserCreateData = Omit<User, '_id'>;

export type UserReturnData = Omit<User, 'role' | 'password'>;

export type RefreshTokenData = { userId: Types.ObjectId; refreshToken: string };
