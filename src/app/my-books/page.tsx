"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { API, CATEGORIES, uploadImage, getAuthHeaders } from "@/lib/book-utils";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type MyBook = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description?: string;
  addedAt: string;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

/* ---------------------------- Edit form (modal) ---------------------------- */
function EditBookDialog({
  book,
  onClose,
  onSaved,
}: {
  book: MyBook;
  onClose: () => void;
  onSaved: (updated: MyBook) => void;
}) {
  // form starts with the old data already filled in
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [category, setCategory] = useState(book.category);
  const [description, setDescription] = useState(book.description ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(book.image);
  const [saving, setSaving] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (saving) return;

    try {
      setSaving(true);
      // upload a new image only if the user picked one, otherwise keep the old URL
      const image = file ? await uploadImage(file) : book.image;
      const authHeaders = await getAuthHeaders();

      const res = await fetch(`${API}/my-books/${book._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({ title, author, category, image, description }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Book updated successfully!");
        onSaved({ ...book, title, author, category, image, description });
      } else {
        toast.error(data.message || "Failed to update the book.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && !saving && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit book</DialogTitle>
          <DialogDescription>
            Change the details and save. Leave the image as it is to keep the
            current one.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Book Title</Label>
            <Input
              id="edit-title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-author">Author Name</Label>
              <Input
                id="edit-author"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v ?? "")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
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
            <Label htmlFor="edit-image">Book Image</Label>
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Book cover"
                className="h-24 w-16 shrink-0 rounded-md object-cover shadow"
              />
              <Input
                id="edit-image"
                type="file"
                accept="image/*"
                onChange={handleFile}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Short Description</Label>
            <Textarea
              id="edit-description"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              disabled={saving}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="min-w-32 bg-[#D97706] text-white hover:bg-orange-700"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* --------------------------------- Page ---------------------------------- */
export default function MyBooksPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const [books, setBooks] = useState<MyBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<MyBook | null>(null);
  const [deleting, setDeleting] = useState<MyBook | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Private route: redirect guests to login
  useEffect(() => {
    if (!isPending && !session?.user) router.push("/login"); // change to your login route
  }, [isPending, session, router]);

  // Load only the logged-in user's books (server reads the email from the JWT)
  useEffect(() => {
    if (!email) return;

    (async () => {
      try {
        const authHeaders = await getAuthHeaders();
        const res = await fetch(`${API}/my-books`, { headers: authHeaders });
        const data = await res.json();
        setBooks(Array.isArray(data) ? data : []);
      } catch {
        toast.error("Could not load your books.");
      } finally {
        setLoading(false);
      }
    })();
  }, [email]);

  const handleDelete = async () => {
    if (!deleting) return;

    try {
      setDeleteLoading(true);
      const authHeaders = await getAuthHeaders();
      const res = await fetch(`${API}/my-books/${deleting._id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      const data = await res.json();

      if (data.success) {
        // remove from the UI (it's already removed from the database)
        setBooks((prev) => prev.filter((b) => b._id !== deleting._id));
        toast.success("Book deleted successfully!");
        setDeleting(null);
      } else {
        toast.error(data.message || "Failed to delete the book.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not reach the server.",
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  if (isPending || (email && loading)) {
    return (
      <div className="flex items-center justify-center gap-2 py-20 text-gray-600">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading your books...
      </div>
    );
  }

  if (!email) return null; // redirecting to login

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Books</h1>
        <Link
          href="/new"
          className="inline-flex h-9 items-center justify-center rounded-lg bg-[#D97706] px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-700"
        >
          Add New Book
        </Link>
      </div>

      {books.length === 0 ? (
        <p className="rounded-lg border py-16 text-center text-gray-600">
          You haven&apos;t added any books yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-amber-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Image</th>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Author</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Added</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {books.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.image}
                      alt={b.title}
                      className="h-20 w-14 rounded object-cover shadow-sm"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {b.title}
                  </td>
                  <td className="px-4 py-3">{b.author}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#D97706]/10 px-2.5 py-0.5 text-xs font-medium text-[#D97706]">
                      {b.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">{formatDate(b.addedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditing(b)}
                      >
                        <Pencil className="mr-1 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleting(b)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit modal (key resets the form for each book) */}
      {editing && (
        <EditBookDialog
          key={editing._id}
          book={editing}
          onClose={() => setEditing(null)}
          onSaved={(updated) => {
            setBooks((prev) =>
              prev.map((b) => (b._id === updated._id ? updated : b)),
            );
            setEditing(null);
          }}
        />
      )}

      {/* Delete confirm modal */}
      <AlertDialog
        open={!!deleting}
        onOpenChange={(open) => !open && !deleteLoading && setDeleting(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this book?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{deleting?.title}&rdquo; will be permanently removed. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>
              Cancel
            </AlertDialogCancel>
            <Button
              disabled={deleteLoading}
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {deleteLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Yes, delete"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
