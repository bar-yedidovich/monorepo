import { Model } from 'mongoose';
import { Role, User, UserToken } from '../types/UserTypes';
import RoleModel from './role';
import UserModel from './user';
import UserTokenModal from './userToken';

export type ModelTypes = {
	user: User;
	role: Role;
	userToken: UserToken;
};

// TODO: maybe go through all model files and map their names
const models: { [K in keyof ModelTypes]: Model<ModelTypes[K]> } = {
	user: UserModel,
	role: RoleModel,
	userToken: UserTokenModal,
};

export type ModelName = keyof typeof models;

export default models;
