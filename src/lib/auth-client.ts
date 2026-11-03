import { createAuthClient } from "better-auth/react";

// TEMPORARY: the `jwtClient()` plugin was removed — no Bearer tokens are
// requested anywhere in the app. Session cookies still work.
const baseURL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.replace(/\/+$/, "") ||
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "") ||
  (typeof window === "undefined" ? undefined : window.location.origin);

export const authClient = createAuthClient({
  baseURL,
  fetchOptions: {
    credentials: "include",
  },
});
