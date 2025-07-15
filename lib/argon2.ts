import { hash, verify, type Options } from "@node-rs/argon2";

const hashOptions = {
	memoryCost: 19456,
	timeCost: 2,
	outputLen: 32,
	parallelism: 1,
} satisfies Options;

export const hashPassword = async (password: string) => {
	const hashedPassword = await hash(password, hashOptions);

	return hashedPassword;
};

export const verifyPassword = async (data: {
	password: string;
	hash: string;
}) => {
	const { password, hash } = data;

	const isValid = await verify(hash, password, hashOptions);

	return isValid;
};
