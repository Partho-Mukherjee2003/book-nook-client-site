// Single source of truth for the Express API base URL.
// NEXT_PUBLIC_* values are inlined at build time, so changing this in Vercel
// requires a redeploy, not just a "restart".
const RAW_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").trim();

/** API origin without a trailing slash, e.g. "https://booknook-server-site.vercel.app". */
export const API_BASE_URL = RAW_BASE_URL.replace(/\/+$/, "");

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Join the API base URL with a path.
 * Throws a readable error instead of silently requesting "undefined/..." or
 * a relative URL (which would hit Vercel and return HTML instead of JSON).
 */
export function apiUrl(path: string): string {
  if (!API_BASE_URL) {
    throw new ApiError(
      "NEXT_PUBLIC_API_URL is not configured. Add it in Vercel → Project Settings → Environment Variables and redeploy.",
      0,
    );
  }

  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** fetch + JSON parsing + HTTP error handling in one place. */
export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(apiUrl(path), init);
  const raw = await response.text();

  let data: unknown = null;
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status);
  }

  return data as T;
}
