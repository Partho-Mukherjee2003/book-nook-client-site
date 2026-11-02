"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const inputClass =
  "h-11 focus-visible:border-[#166534] focus-visible:ring-[#166534]/30";
const labelClass = "font-semibold text-[#1F2937]";
const nativeFieldClass =
  "w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-[#166534] focus-visible:ring-[3px] focus-visible:ring-[#166534]/30";
const readOnlyClass =
  "h-11 cursor-not-allowed bg-[#166534]/5 text-[#1F2937]/70";

const AddBookPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const imageFile = formData.get("image") as File;

    try {
      // 1. Image ImgBB-te upload
      const imgForm = new FormData();
      imgForm.append("image", imageFile);

      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: imgForm },
      );
      const imgData = await imgRes.json();

      if (!imgData.success) {
        console.error("Image upload failed:", imgData);
        return;
      }

      const imageUrl: string = imgData.data.url;

      // 2. Baki data + image URL backend-e pathao
      const data = {
        ...Object.fromEntries(formData.entries()),
        image: imageUrl, // File-er jaygay URL boshlo
      };

      const res = await fetch("http://localhost:5000/allbooks", {
        cache: "no-store",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result);

      if (result.success) form.reset();
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FDFBF7] px-4 py-12 sm:py-16">
      {/* Decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#D97706]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-[#166534]/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-2xl">
        {/* Heading */}
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D97706] text-white shadow-lg shadow-[#D97706]/25">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-7 w-7"
            >
              <path d="M12 7.25C10.6 6.05 8.8 5.4 6.75 5.4H4.5A1.5 1.5 0 0 0 3 6.9v11.1a1.5 1.5 0 0 0 1.5 1.5h2.25c2.05 0 3.85.65 5.25 1.85 1.4-1.2 3.2-1.85 5.25-1.85h2.25a1.5 1.5 0 0 0 1.5-1.5V6.9a1.5 1.5 0 0 0-1.5-1.5h-2.25c-2.05 0-3.85.65-5.25 1.85Z" />
              <path d="M12 7.25v14.1" />
            </svg>
          </span>

          <h1 className="mt-5 font-serif text-3xl font-bold tracking-tight text-[#166534] sm:text-4xl">
            Add a New Book
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#1F2937]/70 sm:text-base">
            Share a book with the BookNook community.
          </p>
        </div>

        {/* Card */}
        <div className="mt-8 rounded-2xl border border-[#166534]/10 bg-white p-6 shadow-xl shadow-[#166534]/5 sm:p-8">
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* Title + Author */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="book-title" className={labelClass}>
                    Book Title
                  </FieldLabel>
                  <Input
                    id="book-title"
                    name="title"
                    type="text"
                    placeholder="e.g. Atomic Habits"
                    required
                    className={inputClass}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="book-author" className={labelClass}>
                    Author Name
                  </FieldLabel>
                  <Input
                    id="book-author"
                    name="author"
                    type="text"
                    placeholder="e.g. James Clear"
                    required
                    className={inputClass}
                  />
                </Field>
              </div>

              {/* Category */}
              <Field>
                <FieldLabel htmlFor="book-category" className={labelClass}>
                  Category
                </FieldLabel>
                <select
                  id="book-category"
                  name="category"
                  required
                  defaultValue=""
                  className={`${nativeFieldClass} h-11`}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="Fiction">Fiction</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Kids">Kids</option>
                  <option value="Others">Others</option>
                </select>
              </Field>

              {/* Book Image */}
              <Field>
                <FieldLabel htmlFor="book-image" className={labelClass}>
                  Book Image
                </FieldLabel>
                <input
                  id="book-image"
                  name="image"
                  type="file"
                  accept="image/*"
                  required
                  className="w-full cursor-pointer rounded-md border border-dashed border-[#166534]/30 bg-[#FDFBF7] p-3 text-sm text-[#1F2937]/70 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#D97706] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-[#166534]/60 hover:file:bg-orange-700"
                />
                <p className="text-xs text-[#1F2937]/60">
                  PNG, JPG or WEBP. The image will be uploaded to ImgBB.
                </p>
              </Field>

              {/* Short Description */}
              <Field>
                <FieldLabel htmlFor="book-description" className={labelClass}>
                  Short Description
                </FieldLabel>
                <textarea
                  id="book-description"
                  name="description"
                  rows={4}
                  placeholder="Write a few lines about this book..."
                  required
                  className={`${nativeFieldClass} resize-none py-2.5`}
                />
              </Field>

              {/* User info (read-only) */}
              <div className="rounded-xl border border-[#166534]/10 bg-[#FDFBF7] p-4">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#166534]">
                  Added by
                </p>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="user-name" className={labelClass}>
                      User Name
                    </FieldLabel>
                    <Input
                      id="user-name"
                      name="userName"
                      type="text"
                      defaultValue="Logged-in user name"
                      readOnly
                      className={readOnlyClass}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="user-email" className={labelClass}>
                      User Email
                    </FieldLabel>
                    <Input
                      id="user-email"
                      name="userEmail"
                      type="email"
                      defaultValue="user@example.com"
                      readOnly
                      className={readOnlyClass}
                    />
                  </Field>
                </div>
              </div>

              {/* Submit */}
              <Field>
                <Button
                  type="submit"
                  className="h-11 w-full bg-[#D97706] text-base font-semibold text-white shadow-md shadow-[#D97706]/25 hover:bg-orange-700"
                >
                  Add Book
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddBookPage;
