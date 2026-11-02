"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const LogInPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log(data); // { email: "...", password: "..." }
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
            Welcome Back
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#1F2937]/70 sm:text-base">
            Log in to continue your reading journey.
          </p>
        </div>

        {/* Card */}
        <div className="mt-8 rounded-2xl border border-[#166534]/10 bg-white p-6 shadow-xl shadow-[#166534]/5 sm:p-8">
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* Email */}
              <Field>
                <FieldLabel
                  htmlFor="login-email"
                  className="font-semibold text-[#1F2937]"
                >
                  Email
                </FieldLabel>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="h-11 focus-visible:border-[#166534] focus-visible:ring-[#166534]/30"
                />
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel
                    htmlFor="login-password"
                    className="font-semibold text-[#1F2937]"
                  >
                    Password
                  </FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#D97706] transition-colors hover:text-orange-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="h-11 focus-visible:border-[#166534] focus-visible:ring-[#166534]/30"
                />
              </Field>

              {/* Error message / toast goes here later */}

              {/* Login button */}
              <Field>
                <Button
                  type="submit"
                  className="h-11 w-full bg-[#D97706] text-base font-semibold text-white shadow-md shadow-[#D97706]/25 hover:bg-orange-700"
                >
                  Login
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

        {/* Register link */}
        <p className="mt-6 text-center text-sm text-[#1F2937]/70">
          New to BookNook?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#166534] transition-colors hover:text-[#D97706] hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LogInPage;
