import { z } from "zod";

export const signUpSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	email: z.string().email({ message: "Invalid email" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
	email: z.string().email({ message: "Invalid email" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
