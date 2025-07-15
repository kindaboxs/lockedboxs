import { type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import { APP_NAME } from "@/constants";
import { env } from "@/env";
import { hashPassword, verifyPassword } from "@/lib/argon2";
import { db } from "@/server/db";

export const authConfig = {
	appName: APP_NAME,
	baseURL: env.NEXT_PUBLIC_APP_URL,
	trustedOrigins: [env.NEXT_PUBLIC_APP_URL],
	logger: {
		level: "debug",
		disabled: env.NODE_ENV === "production",
	},
	database: prismaAdapter(db, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 8,
		maxPasswordLength: 64,
		autoSignIn: false,
		password: {
			hash(password) {
				return hashPassword(password);
			},
			verify(data) {
				return verifyPassword(data);
			},
		},
	},
	plugins: [nextCookies()],
	advanced: {
		database: {
			generateId: false,
		},
	},
	secret: env.BETTER_AUTH_SECRET,
} satisfies BetterAuthOptions;
