"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, CalendarDays, CalendarCheck, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { apiFetch, ApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description?: string;
  totalCopies?: number;
  availableCopies?: number;
};

const LOAN_DAYS = 14;

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const BorrowBooks = ({ book }: { book: Book }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if book has available copies
  const availableCopies = book.availableCopies ?? 0;
  const isAvailable = availableCopies > 0;

  // Dates shown in the modal (recomputed each render so they're always "today")
  const borrowDate = new Date();
  const returnDate = new Date();
  returnDate.setDate(borrowDate.getDate() + LOAN_DAYS);

  const handleOpen = () => {
    if (!user) {
      toast.error("Please log in to borrow this book.", {
        action: {
          label: "Log in",
          onClick: () => router.push("/login"),
        },
      });
      return;
    }
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || loading) return;

    const borrowData = {
      bookId: book._id,
      bookTitle: book.title,
      bookImage: book.image,
      userName: user.name,
      userEmail: user.email,
    };

    try {
      setLoading(true);
      const data = await apiFetch<{
        success?: boolean;
        message?: string;
        insertedId?: string;
      }>("/borrows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(borrowData),
      });

      if (data.insertedId || data.success) {
        setOpen(false);
        // Page refresh to update available copies counter on the UI
        router.refresh();

        toast.success("Book borrowed successfully!", {
          description: `Please return "${book.title}" by ${formatDate(returnDate)}.`,
          action: {
            label: "My Borrows",
            onClick: () => router.push("/my-borrows"),
          },
        });
      } else {
        // Show server messages (e.g. "Not available" or "Already borrowed")
        toast.error(data.message || "Failed to borrow the book.");
      }
    } catch (error) {
      if (error instanceof ApiError) {
        // Handles 400/404/409 errors directly from backend response
        toast.error(error.message || "Failed to borrow the book.");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Could not reach the server.", {
          description: "Please check your connection and try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        type="button"
        disabled={!isAvailable}
        className="h-12 w-full gap-2 bg-[#D97706] text-base font-semibold text-white shadow-md shadow-[#D97706]/25 hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
        onClick={handleOpen}
      >
        <BookOpen className="h-5 w-5" />
        {!isAvailable ? "Not Available" : "Borrow This Book"}
      </Button>

      <Dialog open={open} onOpenChange={(v) => !loading && setOpen(v)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Confirm your borrow</DialogTitle>
            <DialogDescription>
              Review the details below. You can keep the book for {LOAN_DAYS}{" "}
              days.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Book summary */}
            <div className="flex gap-4 rounded-lg border border-amber-200 bg-amber-50/60 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.image}
                alt={book.title}
                className="h-28 w-20 shrink-0 rounded-md object-cover shadow"
              />
              <div className="min-w-0 space-y-1">
                <h3 className="line-clamp-2 font-semibold text-gray-900">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600">by {book.author}</p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="inline-block rounded-full bg-[#D97706]/10 px-2.5 py-0.5 text-xs font-medium text-[#D97706]">
                    {book.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({availableCopies} copies left)
                  </span>
                </div>
              </div>
            </div>

            {/* User details (read-only) */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">User Name</Label>
                <Input
                  id="name"
                  value={user?.name ?? ""}
                  readOnly
                  className="cursor-not-allowed bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user?.email ?? ""}
                  readOnly
                  className="cursor-not-allowed bg-gray-50"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 rounded-lg border p-3 text-sm">
              <div className="flex items-start gap-2">
                <CalendarDays className="mt-0.5 h-4 w-4 text-[#D97706]" />
                <div>
                  <p className="text-xs text-gray-500">Borrow date</p>
                  <p className="font-medium">{formatDate(borrowDate)}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CalendarCheck className="mt-0.5 h-4 w-4 text-[#D97706]" />
                <div>
                  <p className="text-xs text-gray-500">Return by</p>
                  <p className="font-medium">{formatDate(returnDate)}</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              You can track this book anytime on your{" "}
              <Link href="/my-borrows" className="text-[#D97706] underline">
                My Borrows
              </Link>{" "}
              page.
            </p>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="min-w-36 bg-[#D97706] font-semibold text-white hover:bg-orange-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Borrowing...
                  </>
                ) : (
                  "Confirm Borrow"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BorrowBooks;
