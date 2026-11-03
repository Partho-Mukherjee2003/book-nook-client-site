import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

// Never fall back to localhost in production: a missing env var would make the
// browser try to reach the developer's machine, so login, sessions and
// authClient.token() would all fail on Vercel.
const baseURL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.replace(/\/+$/, "") ||
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "") ||
  (typeof window === "undefined" ? undefined : window.location.origin);

export const authClient = createAuthClient({
  baseURL,
  plugins: [jwtClient()],
  fetchOptions: {
    credentials: "include",
  },
});
