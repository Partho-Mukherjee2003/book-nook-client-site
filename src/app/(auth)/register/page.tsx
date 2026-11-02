"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const inputClass =
  "h-11 focus-visible:border-[#166534] focus-visible:ring-[#166534]/30";
const labelClass = "font-semibold text-[#1F2937]";

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const name = formValues.name as string;
    const email = formValues.email as string;
    const photoURL = formValues.photoURL as string;
    const password = formValues.password as string;

    // Password validation
    if (password.length < 6) {
      toast.error("Password too short", {
        description: "Password must be at least 6 characters long.",
      });
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Missing uppercase letter", {
        description: "Password must have at least one uppercase letter.",
      });
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Missing lowercase letter", {
        description: "Password must have at least one lowercase letter.",
      });
      return;
    }

    setLoading(true);

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoURL || undefined,
    });

    setLoading(false);

    if (error) {
      toast.error("Registration failed", {
        description: error.message || "Something went wrong. Please try again.",
      });
      return;
    }

    toast.success("Account created!", {
      description: "Welcome to BookNook. Redirecting you to login...",
    });

    setTimeout(() => router.push("/login"), 1200);
  };

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

      <div className="relative mx-auto w-full max-w-md">
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
            Create Your Account
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#1F2937]/70 sm:text-base">
            Join BookNook and start your reading journey today.
          </p>
        </div>

        {/* Card */}
        <div className="mt-8 rounded-2xl border border-[#166534]/10 bg-white p-6 shadow-xl shadow-[#166534]/5 sm:p-8">
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* Name */}
              <Field>
                <FieldLabel htmlFor="register-name" className={labelClass}>
                  Name
                </FieldLabel>
                <Input
                  id="register-name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  required
                  className={inputClass}
                />
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="register-email" className={labelClass}>
                  Email
                </FieldLabel>
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className={inputClass}
                />
              </Field>

              {/* Photo URL */}
              <Field>
                <FieldLabel htmlFor="register-photo" className={labelClass}>
                  Photo URL
                </FieldLabel>
                <Input
                  id="register-photo"
                  name="photoURL"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className={inputClass}
                />
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="register-password" className={labelClass}>
                  Password
                </FieldLabel>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  className={inputClass}
                />

                {/* Password requirements */}
                <ul className="mt-2 space-y-1 text-xs text-[#1F2937]/60">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D97706]" />
                    At least 6 characters
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D97706]" />
                    One uppercase letter
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D97706]" />
                    One lowercase letter
                  </li>
                </ul>
              </Field>

              {/* Register button */}
              <Field>
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 w-full bg-[#D97706] text-base font-semibold text-white shadow-md shadow-[#D97706]/25 hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Creating account..." : "Register"}
                </Button>
              </Field>
            </FieldGroup>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#1F2937]/10" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1F2937]/50">
              or
            </span>
            <span className="h-px flex-1 bg-[#1F2937]/10" />
          </div>

          {/* Google login */}
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full gap-3 border-[#1F2937]/15 text-base font-semibold text-[#1F2937] hover:border-[#166534]/40 hover:bg-[#166534]/5"
          >
            <FcGoogle className="h-5 w-5" />
            Continue with Google
          </Button>
        </div>

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-[#1F2937]/70">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#166534] transition-colors hover:text-[#D97706] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
