"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  borrowDate: string;
  returnDate: string;
  status: "borrowed" | "returned";
};

const API = "http://localhost:5000";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function MyBorrows() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return; // wait until the session loads

    fetch(`${API}/borrows?email=${encodeURIComponent(email)}`)
      .then((res) => res.json())
      .then((data) => setBorrows(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Could not load your borrowed books."))
      .finally(() => setLoading(false));
  }, [email]);

  const handleReturn = async (id: string) => {
    if (!email) return;

    try {
      setReturningId(id);
      const res = await fetch(`${API}/borrows/${id}/return`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        // update the row locally, no need to refetch
        setBorrows((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "returned" } : b)),
        );
        toast.success("Book returned successfully!");
      } else {
        toast.error(data.message || "Failed to return the book.");
      }
    } catch {
      toast.error("Could not reach the server.");
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
        <table className="w-full min-w-[640px] text-left text-sm">
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
                        onClick={() => handleReturn(b._id)}
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
    </section>
  );
}
