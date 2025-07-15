"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/client";

export const SignOutButton = () => {
	const [isPendingSignOut, startTransition] = useTransition();

	const router = useRouter();

	const onSignOut = async () => {
		startTransition(async () => {
			await signOut({
				fetchOptions: {
					onSuccess: () => {
						router.refresh();
						toast.success("Sign Out successful", {
							id: "sign-out-success",
							description: "You have been signed out",
						});
					},

					onError: (ctx) => {
						toast.error("Sign Out failed", {
							id: "sign-out-failed",
							description: ctx.error.message,
						});
					},
				},
			});
		});
	};
	return (
		<Button
			variant="destructive"
			size="sm"
			onClick={onSignOut}
			disabled={isPendingSignOut}
		>
			{isPendingSignOut ? (
				<>
					<Loader2Icon className="size-4 animate-spin" /> Sign Out
				</>
			) : (
				"Sign Out"
			)}
		</Button>
	);
};
