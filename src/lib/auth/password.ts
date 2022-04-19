import bcrypt from "bcrypt";

const hashRounds = 10;

export const hashPassword = (password: string): Promise<string> => {
	return bcrypt.hash(password, hashRounds);
};

export const validatePassword = (password: string, hash: string): Promise<boolean> => {
	return bcrypt.compare(password, hash);
};
