"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const inputClass =
  "h-11 focus-visible:border-[#166534] focus-visible:ring-[#166534]/30";
const labelClass = "font-semibold text-[#1F2937]";

type AvatarUser = { name?: string | null; image?: string | null };

// Photo thakle photo, na thakle naam-er prothom okkhor
function Avatar({ user, size }: { user: AvatarUser; size: string }) {
  const initial = (user.name?.trim().charAt(0) || "U").toUpperCase();

  return user.image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={user.image}
      alt={user.name || "Profile"}
      referrerPolicy="no-referrer"
      className={`${size} shrink-0 rounded-full object-cover ring-4 ring-[#D97706]/30`}
    />
  ) : (
    <span
      className={`${size} flex shrink-0 items-center justify-center rounded-full bg-[#D97706] text-3xl font-bold text-white ring-4 ring-[#D97706]/30`}
    >
      {initial}
    </span>
  );
}

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  // Logged-in na thakle login page-e pathao
  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login?redirect=/profile");
    }
  }, [isPending, user, router]);

  const startEditing = () => {
    setPreviewUrl(user?.image || "");
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const name = (formValues.name as string).trim();
    const image = (formValues.photoURL as string).trim();

    if (!name) {
      toast.error("Name is required", {
        description: "Please enter your name.",
      });
      return;
    }

    setSaving(true);

    const { error } = await authClient.updateUser({
      name,
      image: image || undefined,
    });

    setSaving(false);

    if (error) {
      toast.error("Update failed", {
        description: error.message || "Could not update your profile.",
      });
      return;
    }

    toast.success("Profile updated!", {
      description: "Your changes have been saved.",
    });
    setIsEditing(false);
    router.refresh();
  };

  /* ---------------- Loading / redirecting ---------------- */
  if (isPending || !user) {
    return (
      <section className="bg-[#FDFBF7] px-4 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-2xl animate-pulse">
          <div className="h-36 rounded-t-2xl bg-[#166534]/20" />
          <div className="space-y-4 rounded-b-2xl bg-white p-8">
            <div className="-mt-20 h-28 w-28 rounded-full bg-[#F3EFE6]" />
            <div className="h-7 w-1/2 rounded bg-[#F3EFE6]" />
            <div className="h-5 w-2/3 rounded bg-[#F3EFE6]" />
            <div className="h-11 w-full rounded-lg bg-[#F3EFE6]" />
          </div>
        </div>
      </section>
    );
  }

  const joined = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <section className="relative overflow-hidden bg-[#FDFBF7] px-4 py-12 sm:py-16">
      {/* Decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D97706]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#166534]/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-2xl">
        {/* Page heading */}
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#166534]/15 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#166534] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D97706]" />
            Your account
          </span>
          <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#166534] sm:text-4xl">
            My Profile
          </h1>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-[#166534]/10 bg-white shadow-xl shadow-[#166534]/5">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-[#166534] to-[#15803d] sm:h-40" />

          <div className="px-6 pb-8 sm:px-8">
            {/* Avatar (banner-er upor overlap) */}
            <div className="-mt-14 flex justify-center sm:-mt-16 sm:justify-start">
              <Avatar
                user={isEditing ? { name: user.name, image: previewUrl } : user}
                size="h-28 w-28 sm:h-32 sm:w-32"
              />
            </div>

            {!isEditing ? (
              /* ================= VIEW MODE ================= */
              <>
                <div className="mt-4 text-center sm:text-left">
                  <h2 className="font-serif text-2xl font-bold text-[#166534] sm:text-3xl">
                    {user.name}
                  </h2>
                  <p className="mt-1 text-sm text-[#1F2937]/70">{user.email}</p>
                </div>

                <span
                  aria-hidden="true"
                  className="mt-5 block h-0.5 w-12 rounded-full bg-[#D97706] max-sm:mx-auto"
                />

                <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#166534]/10 bg-[#FDFBF7] p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#1F2937]/50">
                      Full name
                    </dt>
                    <dd className="mt-1 truncate text-sm font-semibold text-[#1F2937]">
                      {user.name}
                    </dd>
                  </div>

                  <div className="rounded-xl border border-[#166534]/10 bg-[#FDFBF7] p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#1F2937]/50">
                      Email
                    </dt>
                    <dd className="mt-1 truncate text-sm font-semibold text-[#1F2937]">
                      {user.email}
                    </dd>
                  </div>

                  {joined && (
                    <div className="rounded-xl border border-[#166534]/10 bg-[#FDFBF7] p-4 sm:col-span-2">
                      <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#1F2937]/50">
                        Member since
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-[#1F2937]">
                        {joined}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Button
                    type="button"
                    onClick={startEditing}
                    className="h-11 bg-[#D97706] text-base font-semibold text-white shadow-md shadow-[#D97706]/25 hover:bg-orange-700"
                  >
                    Edit Profile
                  </Button>

                  <Link
                    href="/my-books"
                    className="flex h-11 items-center justify-center rounded-md border border-[#166534]/30 text-base font-semibold text-[#166534] transition-colors duration-200 hover:bg-[#166534]/5"
                  >
                    My Books
                  </Link>
                </div>
              </>
            ) : (
              /* ================= EDIT MODE ================= */
              <form onSubmit={handleSubmit} className="mt-6">
                <h2 className="mb-5 text-center font-serif text-xl font-bold text-[#166534] sm:text-left">
                  Edit your profile
                </h2>

                <FieldGroup>
                  {/* Name */}
                  <Field>
                    <FieldLabel htmlFor="profile-name" className={labelClass}>
                      Name
                    </FieldLabel>
                    <Input
                      id="profile-name"
                      name="name"
                      type="text"
                      defaultValue={user.name}
                      placeholder="Your full name"
                      required
                      className={inputClass}
                    />
                  </Field>

                  {/* Email (read-only) */}
                  <Field>
                    <FieldLabel htmlFor="profile-email" className={labelClass}>
                      Email
                    </FieldLabel>
                    <Input
                      id="profile-email"
                      type="email"
                      value={user.email}
                      readOnly
                      className="h-11 cursor-not-allowed bg-[#166534]/5 text-[#1F2937]/70"
                    />
                    <p className="text-xs text-[#1F2937]/60">
                      Email cannot be changed.
                    </p>
                  </Field>

                  {/* Photo URL */}
                  <Field>
                    <FieldLabel htmlFor="profile-photo" className={labelClass}>
                      Photo URL
                    </FieldLabel>
                    <Input
                      id="profile-photo"
                      name="photoURL"
                      type="url"
                      value={previewUrl}
                      onChange={(e) => setPreviewUrl(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className={inputClass}
                    />
                    <p className="text-xs text-[#1F2937]/60">
                      The photo above updates as you type.
                    </p>
                  </Field>

                  {/* Buttons */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Button
                      type="submit"
                      disabled={saving}
                      className="h-11 bg-[#D97706] text-base font-semibold text-white shadow-md shadow-[#D97706]/25 hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      disabled={saving}
                      onClick={() => setIsEditing(false)}
                      className="h-11 border-[#1F2937]/15 text-base font-semibold text-[#1F2937] hover:bg-[#166534]/5"
                    >
                      Cancel
                    </Button>
                  </div>
                </FieldGroup>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
