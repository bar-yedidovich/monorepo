import {
	UNAUTHORIZED_STATUS,
	emailNotMatching,
	noCreateUserMessage,
	noDataMessage,
	noUserToLogout,
	notAllowedMessage,
	passwordNotMatching,
} from '../../common/constants';
import { User, UserLoginData, UserRegisterData } from '../../common/types/UserTypes';
import {
	comparePasswords,
	createAccessToken,
	createTokensForUser,
	createUser,
	deleteRefreshToken,
	extractReturnUserData,
	// extractUserData,
	getLowestRole,
	getUser,
	saveRefreshToken,
} from './auth.services';

// TODO: customize errors by your needs
export const login = async (modelData?: UserLoginData) => {
	if (modelData.email) {
		const user = await getUser({ email: modelData.email });
		if (user) {
			if (comparePasswords(modelData.password, user.password)) {
				const { accessToken, refreshToken } = createTokensForUser({
					userId: user._id,
					email: user.email,
				});
				await saveRefreshToken({ refreshToken, userId: user._id });
				const result = { accessToken, refreshToken, ...extractReturnUserData(user) };
				return result;
			} else {
				throw { message: passwordNotMatching, status: UNAUTHORIZED_STATUS };
			}
		}
		throw { message: emailNotMatching, status: UNAUTHORIZED_STATUS };
	}
	throw { message: noDataMessage, status: UNAUTHORIZED_STATUS };
};

export const register = async (modelData: UserRegisterData) => {
	const lowestRole = await getLowestRole();
	const newUser = await createUser({ ...modelData, role: lowestRole?._id });
	const { accessToken, refreshToken } = createTokensForUser({
		userId: newUser._id,
		email: newUser.email,
	});
	await saveRefreshToken({ refreshToken, userId: newUser._id });
	if (newUser) {
		const result = { accessToken, refreshToken, ...extractReturnUserData(newUser) };
		return result;
	}
	throw { message: noCreateUserMessage };
};

export const logout = async (user: User) => {
	if (user) {
		await deleteRefreshToken(user);
		return true;
	}
	throw { message: noUserToLogout };
};

export const refreshAccessToken = (user: User) => {
	if (user) {
		const accessToken = createAccessToken({ userId: user._id, email: user.email });
		return accessToken;
	}
	throw { message: notAllowedMessage, status: UNAUTHORIZED_STATUS };
};
