// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Cookie-only check: fast, but it only proves a session cookie exists.
 * The Express API still verifies the JWT on every private request.
 */
export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Only real private routes belong here. `/AllBooks` and `/AllBooks/:id`
  // were reachable by guests; keep the details route protected only if it must
  // stay private, otherwise delete the "/AllBooks/:id" line below.
  matcher: [
    "/new",
    "/my-books",
    "/my-borrows",
    "/profile",
    "/AllBooks/:id",
  ],
};
