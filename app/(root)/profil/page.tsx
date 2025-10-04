import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteCurrentUser } from "@/lib/actions/auth.actions";
import { Button } from "@/components/ui/button";

export default async function Page() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-200">
                    Profile
                </h1>
                <p className="text-gray-500">
                    Manage your account information.
                </p>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-800 bg-gray-900/40">
                <Avatar className="h-16 w-16">
                    <AvatarImage src="https://avatars.githubusercontent.com/u/57532296?s=400&u=de8dbc238f2d11b84ccb6146ce5d16a5c0cbb624&v=4" />
                    <AvatarFallback className="bg-[#00E560] text-gray-950 font-bold">
                        {user?.name?.[0] ?? "U"}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-300">
                        {user?.name ?? "Unknown User"}
                    </span>
                    <span className="text-sm text-gray-500">
                        {user?.email ?? "—"}
                    </span>
                </div>
                <form
                    action={async () => {
                        "use server";
                        // simple confirm guard via thrown redirect if not confirmed would require client; keep server-only
                        await deleteCurrentUser();
                    }}
                    className="ml-auto"
                >
                    <Button
                        type="submit"
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-500"
                    >
                        Delete my account
                    </Button>
                </form>
            </div>
        </section>
    );
}
