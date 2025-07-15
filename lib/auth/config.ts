import { type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import { APP_NAME } from "@/constants";
import { env } from "@/env";
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
	},
	plugins: [nextCookies()],
} satisfies BetterAuthOptions;
