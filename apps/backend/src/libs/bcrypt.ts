import config from '../config/config';
import bcrypt from 'bcrypt';

const saltRounds = 11;
const pepper = config.pepper;

export const cryptPassword = (password: string) => {
	const salt = bcrypt.genSaltSync(saltRounds);
	const pepperedPassword = password + pepper;
	return bcrypt.hashSync(pepperedPassword, salt);
};

export const verifyPassword = (password: string, hashedPassword: string) => {
	const pepperedPassword = password + pepper;
	return bcrypt.compareSync(pepperedPassword, hashedPassword);
};
