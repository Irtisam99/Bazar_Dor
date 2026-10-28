
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {

    // Get session from the incoming request
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    // Check authenticated user
    if (!session?.user) {
        return NextResponse.redirect(
            new URL("/signin?reason=unauthorized", request.url)
        );
    }

    // Allow authenticated users to continue
    return NextResponse.next();
}

export const config = {
    matcher: ["/profile", "/product/:path*"],
};
