"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { apiFetch, ApiError } from "@/lib/api";
import {
  CATEGORIES,
  SessionExpiredError,
  uploadImage,
  getAuthHeaders,
} from "@/lib/book-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddBookPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState(0); // used to reset the file input
  const [loading, setLoading] = useState(false);

  // Private route: redirect guests to login
  useEffect(() => {
    if (!isPending && !user) router.push("/login"); // change to your login route
  }, [isPending, user, router]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || loading) return;

    if (!category) return toast.error("Please select a category.");
    if (!file) return toast.error("Please upload a book image.");

    try {
      setLoading(true);

      // 1. upload image to imgbb
      const imageUrl = await uploadImage(file);

      // 2. get a fresh JWT for the Authorization header
      const authHeaders = await getAuthHeaders();

      // 3. save the book. These keys must match the Express schema exactly.
      const data = await apiFetch<{
        success?: boolean;
        message?: string;
        insertedId?: string;
      }>("/my-books", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({
          title: title.trim(),
          author: author.trim(),
          category,
          image: imageUrl,
          description: description.trim(),
          userName: user.name,
        }),
      });

      if (data.insertedId) {
        toast.success("Book added successfully!", {
          action: {
            label: "My Books",
            onClick: () => router.push("/my-books"),
          },
        });
        // reset the form
        setTitle("");
        setAuthor("");
        setCategory("");
        setDescription("");
        setFile(null);
        setPreview(null);
        setFileKey((k) => k + 1);
      } else {
        toast.error(data.message || "Failed to add the book.");
      }
    } catch (error) {
      // An expired/missing JWT or a 401 from Express both mean "log in again".
      if (
        error instanceof SessionExpiredError ||
        (error instanceof ApiError && error.status === 401)
      ) {
        toast.error("Your session has expired.", {
          description: "Please log in again to add a book.",
          action: {
            label: "Log in",
            onClick: () => router.push("/login?redirect=/new"),
          },
        });
        return;
      }

      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !user) {
    return (
      <div className="flex items-center justify-center gap-2 py-20 text-gray-600">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">Add a New Book</h1>
      <p className="mb-6 text-sm text-gray-600">
        Share a book with the Book Nook community.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border bg-white p-6 shadow-sm"
      >
        <div className="space-y-2">
          <Label htmlFor="title">Book Title</Label>
          <Input
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Clean Code"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="author">Author Name</Label>
            <Input
              id="author"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Robert C. Martin"
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={category}
              onValueChange={(v) => setCategory(v ?? "")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Book Image</Label>
          <div className="flex items-center gap-4">
            <div className="flex h-28 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-dashed bg-gray-50">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImagePlus className="h-6 w-6 text-gray-400" />
              )}
            </div>
            <Input
              key={fileKey}
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFile}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Short Description</Label>
          <Textarea
            id="description"
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this book about?"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">User Name</Label>
            <Input
              id="name"
              value={user.name ?? ""}
              readOnly
              className="cursor-not-allowed bg-gray-50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={user.email ?? ""}
              readOnly
              className="cursor-not-allowed bg-gray-50"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full bg-[#D97706] font-semibold text-white hover:bg-orange-700"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding book...
            </>
          ) : (
            "Add Book"
          )}
        </Button>
      </form>
    </section>
  );
}
