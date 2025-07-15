"use client";

import { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth/client";
import { signUpSchema, type SignUpSchemaType } from "@/models/auth/schemas";

export const SignUpView = () => {
	const [pending, startTransition] = useTransition();

	const form = useForm<SignUpSchemaType>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
		mode: "all",
	});

	const onSubmitSignUp = async (data: SignUpSchemaType) => {
		startTransition(async () => {
			await signUp.email({
				name: data.name,
				email: data.email,
				password: data.password,
				fetchOptions: {
					onSuccess: () => {
						toast.success("Sign Up successful", {
							id: "sign-up-success",
							description: "Your account has been created",
						});
						form.reset();
					},
					onError: (ctx) => {
						toast.error("Sign Up failed", {
							id: "sign-up-failed",
							description: ctx.error.message,
						});
					},
				},
			});
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
				<CardDescription className="text-base">
					Create an account, it takes less than a minute
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmitSignUp)}
						className="space-y-6"
					>
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="John Doe" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="me@example.com"
												type="email"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="********"
												type="password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Button
							type="submit"
							className="w-full"
							disabled={
								pending ||
								form.formState.isSubmitting ||
								!form.formState.isValid
							}
						>
							{pending ? (
								<>
									<Loader2Icon className="size-4 animate-spin" /> Sign Up
								</>
							) : (
								"Sign Up"
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
