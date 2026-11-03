import { authClient } from "@/lib/auth-client";
export const API = `${process.env.NEXT_PUBLIC_API_URL}`;

export const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

// Upload an image file to imgbb and return its public URL
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    { method: "POST", body: formData },
  );
  const data = await res.json();

  if (!data.success) throw new Error("Image upload failed");
  return data.data.url as string;
}


export async function getAuthHeaders(): Promise<Record<string, string>> {
  const { data } = await authClient.token();
  if (!data?.token) throw new Error("Session expired. Please log in again.");
  return { Authorization: `Bearer ${data.token}` };
}
