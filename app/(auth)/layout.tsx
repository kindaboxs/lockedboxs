import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) return redirect("/");

	return (
		<div className="flex min-h-dvh w-full items-center justify-center">
			<main className="w-full max-w-md">{children}</main>
		</div>
	);
}
