'use client';
import { authClient } from '@/lib/auth-client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description?: string;
  userName?: string;
  userEmail?: string;
};


const BorrowBooks = ({ book }: { book: Book }) => {

  const {data:session} = authClient.useSession();
  const user = session?.user;

  const handleBorrow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to borrow this book.");
      return;
    }
    const borrowData = {
      userName: user?.name,
      userEmail: user?.email, // userId এর বদলে আমরা email ব্যবহার করতে পারি ট্র্যাকিংয়ের জন্য
      userImage: user?.image,
      bookId: book._id, // ব্যাকএন্ড ঠিক এই নামটাই খুঁজছে
      title: book.title, // পরবর্তীতে 'My Borrows' পেজে দেখানোর জন্য এই ডাটাগুলোও সেভ রাখা ভালো
      author: book.author,
      image: book.image,
      category: book.category,
    };
    const res = await fetch("http://localhost:5000/borrowed",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(borrowData),
    });
    const data = await res.json();
    if(data.insertedId){
      toast.success("Book borrowed successfully!");
    }
    else{
      toast.error("Failed to borrow the book. Please try again.");
    }
  };
  return (
    <div>

        <Button
          type="button"
          className="h-12 w-full gap-2 bg-[#D97706] text-base font-semibold text-white shadow-md shadow-[#D97706]/25 hover:bg-orange-700"
          onClick={handleBorrow}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path d="M12 7.25C10.6 6.05 8.8 5.4 6.75 5.4H4.5A1.5 1.5 0 0 0 3 6.9v11.1a1.5 1.5 0 0 0 1.5 1.5h2.25c2.05 0 3.85.65 5.25 1.85 1.4-1.2 3.2-1.85 5.25-1.85h2.25a1.5 1.5 0 0 0 1.5-1.5V6.9a1.5 1.5 0 0 0-1.5-1.5h-2.25c-2.05 0-3.85.65-5.25 1.85Z" />
            <path d="M12 7.25v14.1" />
          </svg>
          Borrow This Book
        </Button>

    </div>
  );
};

export default BorrowBooks;
