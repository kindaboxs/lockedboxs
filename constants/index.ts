import { env } from "@/env";

export const APP_NAME =
	env.NODE_ENV === "production" ? "LockedBoxs" : `${env.NODE_ENV} LockedBoxs`;
