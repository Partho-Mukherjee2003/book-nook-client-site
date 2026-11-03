"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { apiFetch, ApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  borrowDate: string;
  returnDate: string;
  status: "borrowed" | "returned";
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function MyBorrows() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;
  const [confirmBorrow, setConfirmBorrow] = useState<Borrow | null>(null);
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return; // wait until the session loads

    const controller = new AbortController();

    (async () => {
      try {
        const data = await apiFetch<Borrow[]>(
          `/borrows?email=${encodeURIComponent(email)}`,
          { signal: controller.signal },
        );
        if (!controller.signal.aborted) {
          setBorrows(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          toast.error(
            error instanceof ApiError
              ? error.message
              : "Could not load your borrowed books.",
          );
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [email]);

  const handleReturn = async () => {
    if (!email || !confirmBorrow) return;

    try {
      setReturningId(confirmBorrow._id);
      await apiFetch(
        `/borrows/${confirmBorrow._id}?email=${encodeURIComponent(email)}`,
        { method: "DELETE" },
      );

      // remove the row from the table
      setBorrows((prev) => prev.filter((b) => b._id !== confirmBorrow._id));
      toast.success("Book returned successfully!");
      setConfirmBorrow(null);
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "Could not reach the server.",
      );
    } finally {
      setReturningId(null);
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

  if (!email) {
    return (
      <p className="py-20 text-center text-gray-600">
        Please log in to see your borrowed books.
      </p>
    );
  }

  if (borrows.length === 0) {
    return (
      <p className="py-20 text-center text-gray-600">
        You haven&apos;t borrowed any books yet.
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        My Borrowed Books ({borrows.length})
      </h1>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-160 text-left text-sm">
          <thead className="bg-amber-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 font-semibold">Image</th>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Borrow Date</th>
              <th className="px-4 py-3 font-semibold">Return Date</th>
              <th className="px-4 py-3 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {borrows.map((b) => {
              const isReturned = b.status === "returned";
              const isReturning = returningId === b._id;

              return (
                <tr key={b._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Image
                      src={b.bookImage}
                      alt={b.bookTitle}
                      width={56}
                      height={80}
                      className="h-20 w-14 rounded object-cover shadow-sm"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {b.bookTitle}
                  </td>
                  <td className="px-4 py-3">{formatDate(b.borrowDate)}</td>
                  <td className="px-4 py-3">{formatDate(b.returnDate)}</td>
                  <td className="px-4 py-3 text-right">
                    {isReturned ? (
                      <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        Returned
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        disabled={isReturning}
                        onClick={() => setConfirmBorrow(b)}
                        className="bg-[#D97706] text-white hover:bg-orange-700"
                      >
                        {isReturning ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Returning...
                          </>
                        ) : (
                          "Return Book"
                        )}
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
            <AlertDialog
        open={!!confirmBorrow}
        onOpenChange={(open) => !open && !returningId && setConfirmBorrow(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Return this book?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to return &ldquo;{confirmBorrow?.bookTitle}&rdquo;.
              It will be removed from your borrowed list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={!!returningId}>Cancel</AlertDialogCancel>
            <Button
              disabled={!!returningId}
              onClick={handleReturn}
              className="bg-[#D97706] text-white hover:bg-orange-700"
            >
              {returningId ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Returning...
                </>
              ) : (
                "Yes, return"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>

  );
}
