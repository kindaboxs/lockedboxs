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
import { signIn } from "@/lib/auth/client";
import { signInSchema, type SignInSchemaType } from "@/models/auth/schemas";

export const SignInView = () => {
	const [pending, startTransition] = useTransition();

	const form = useForm<SignInSchemaType>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "all",
	});

	const onSubmitSignIn = async (data: SignInSchemaType) => {
		startTransition(async () => {
			await signIn.email({
				email: data.email,
				password: data.password,
				fetchOptions: {
					onSuccess: () => {
						toast.success("Sign In successful", {
							id: "sign-In-success",
							description: "You have been signed in",
						});
						form.reset();
					},
					onError: (ctx) => {
						toast.error("Sign In failed", {
							id: "sign-In-failed",
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
				<CardTitle className="text-2xl font-bold">Sign In</CardTitle>
				<CardDescription className="text-base">
					Sign in to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmitSignIn)}
						className="space-y-6"
					>
						<div className="space-y-4">
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
									<Loader2Icon className="size-4 animate-spin" /> Sign In
								</>
							) : (
								"Sign In"
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
