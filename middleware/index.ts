import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/better-auth/auth";

export async function middleware(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        if (!session?.user) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware auth error:", error);
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
