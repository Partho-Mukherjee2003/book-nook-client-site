import { API_BASE_URL, apiUrl } from "@/lib/api";

export { API_BASE_URL, apiUrl };

export const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

// TEMPORARY: getAuthHeaders()/SessionExpiredError were removed together with
// the JWT layer. Re-add them when Bearer auth comes back.

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
