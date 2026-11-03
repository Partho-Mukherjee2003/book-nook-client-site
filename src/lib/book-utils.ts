import { authClient } from "@/lib/auth-client";
import { API_BASE_URL, apiUrl } from "@/lib/api";

export { API_BASE_URL, apiUrl };

export const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

/** Thrown when the Better Auth session/JWT is missing or has expired. */
export class SessionExpiredError extends Error {
  constructor() {
    super("Your session has expired. Please log in again.");
    this.name = "SessionExpiredError";
  }
}

// Upload an image file to imgbb and return its public URL
export async function uploadImage(file: File): Promise<string> {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!key) {
    throw new Error(
      "Image upload is not configured (NEXT_PUBLIC_IMGBB_API_KEY is missing).",
    );
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.success) {
    throw new Error(data?.error?.message ?? "Image upload failed");
  }

  return data.data.url as string;
}

export async function getAuthHeaders(): Promise<Record<string, string>> {
  const { data, error } = await authClient.token();

  if (error || !data?.token) throw new SessionExpiredError();

  return { Authorization: `Bearer ${data.token}` };
}
