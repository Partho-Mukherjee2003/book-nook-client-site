"use client";

import { authClient } from "@/lib/auth-client";

/**
 * ⚠️ TEMPORARY AUTH SHIM — delete this file when JWT auth is restored.
 *
 * The app no longer sends Bearer tokens, so every page needs an identity for
 * the email-keyed queries (/my-books, /borrows). If somebody is signed in we
 * still use their real Better Auth session; otherwise we fall back to a fixed
 * test identity so nothing is blocked by a login screen.
 *
 * Override the fallback per-deployment with:
 *   NEXT_PUBLIC_DEV_USER_NAME
 *   NEXT_PUBLIC_DEV_USER_EMAIL
 */
export const DEV_USER = {
  name: process.env.NEXT_PUBLIC_DEV_USER_NAME || "Test Reader",
  email: process.env.NEXT_PUBLIC_DEV_USER_EMAIL || "test.reader@booknook.dev",
};

export function useCurrentUser() {
  const { data } = authClient.useSession();
  const sessionUser = data?.user;

  return {
    name: sessionUser?.name || DEV_USER.name,
    email: sessionUser?.email || DEV_USER.email,
    image: sessionUser?.image ?? null,
    /** true only when a real Better Auth session exists */
    isRealSession: Boolean(sessionUser),
  };
}
