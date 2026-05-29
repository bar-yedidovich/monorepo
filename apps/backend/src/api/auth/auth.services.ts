import {
	IdFilterData,
	RefreshTokenData,
	TokenPayload,
	User,
	UserCreateData,
	UserLoginData,
	UserReturnData,
} from '../../common/types/UserTypes';
import { createModels, deleteModel, getModels, updateModel } from '../../data';
import { verifyPassword } from '../../libs/bcrypt';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';
import { accessExp, accessJwtKey, refreshExp, refreshJwtKey } from './auth.constants';

export const extractReturnUserData = (data: Document<unknown, object, User>): UserReturnData => {
	const dataValues = data.toObject();
	// TODO: check about this
	// delete dataValues.__v;
	delete dataValues.password;
	delete dataValues.role;
	return dataValues;
};

const createToken = (payload: object, key: string, expiresIn: string | number) => {
	return jwt.sign({ ...payload }, key, { expiresIn: expiresIn });
};

export const createAccessToken = (tokenPayload: TokenPayload) => {
	return createToken({ ...tokenPayload }, accessJwtKey, accessExp);
};

export const createTokensForUser = (tokenPayload: TokenPayload) => {
	const accessToken = createAccessToken(tokenPayload);
	const refreshToken = createToken({ ...tokenPayload }, refreshJwtKey, refreshExp);
	return {
		accessToken,
		refreshToken,
	};
};

export const comparePasswords = (passwordToCheck: string, passwordToCheckAgainst: string) => {
	return verifyPassword(passwordToCheck, passwordToCheckAgainst);
};

export const getUser = async (userData: UserLoginData | IdFilterData) => {
	const userResult = await getModels('user', {
		filter: { ...userData },
		options: { populate: ['role'] },
	});
	return (userResult && userResult[0]) || null;
};

export const createUser = async (userData: UserCreateData) => {
	const newUserResult = await createModels('user', {
		data: userData,
	});
	return (newUserResult && newUserResult[0]) || null;
};

export const getLowestRole = async () => {
	const roleResult = await getModels('role', {
		options: { sort: 'level' },
	});
	return (roleResult && roleResult[0]) || null;
};

// upsert the token
export const saveRefreshToken = async (userTokenPayload: RefreshTokenData) => {
	const userTokenResult = await updateModel('userToken', {
		newData: {
			user: userTokenPayload.userId,
			refreshToken: userTokenPayload.refreshToken,
		},
		filter: {
			user: userTokenPayload.userId,
		},
		options: {
			upsert: true,
		},
	});
	return (userTokenResult && userTokenResult[0]) || null;
};

const verifyAndDecodeToken = (token: string, key: string) => {
	if (token) {
		const decoded = jwt.verify(token, key);
		return decoded as TokenPayload;
	}
	return null;
};

export const verifyAndDecodeAccessToken = (token: string) => {
	return verifyAndDecodeToken(token, accessJwtKey);
};

export const verifyAndDecodeRefreshToken = (token: string) => {
	return verifyAndDecodeToken(token, refreshJwtKey);
};

export const deleteRefreshToken = (user: User) => {
	return deleteModel('userToken', { filter: { _id: user._id } });
};
