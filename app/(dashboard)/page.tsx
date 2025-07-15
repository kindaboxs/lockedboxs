import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/global/sign-out-button";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) return redirect("/sign-in");

	return (
		<div className="container mx-auto space-y-4 p-4">
			<h1 className="text-3xl font-bold">Dashboard</h1>

			<div className="bg-card flex flex-col rounded-md">
				<div className="bg-card-foreground/50 flex items-center justify-between rounded-t-md p-4">
					<span className="text-lg font-semibold">Current Session</span>
					<SignOutButton />
				</div>
				<pre className="px-4 py-6 break-all whitespace-pre-wrap">
					{JSON.stringify(session, null, 2)}
				</pre>
			</div>
		</div>
	);
}
