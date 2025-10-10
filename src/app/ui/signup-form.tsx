'use client';

import { Imperial_Script } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const imperialScript = Imperial_Script({
  weight: "400",
  subsets: ["latin"],
});

export default function SignupForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to login page after successful signup
      router.push("/login");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      id="signup-form"
      onSubmit={handleSubmit}
      className="space-y-3"
    >
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl text-gray-800 font-semibold">
          Sign up to continue.
        </h1>

        <div className="w-full">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="email"
          >
            Enter Email
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-600 text-black"
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="mt-4">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="password"
          >
            Create Password
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-600 text-black"
            id="password"
            type="password"
            name="password"
            placeholder="Enter Password"
            required
            minLength={6}
          />
        </div>

        <div className="mt-4">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-600 text-black"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            required
            minLength={6}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#8B6F47] text-white py-3 rounded-md font-semibold hover:bg-[#7a603e] transition-colors"
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </button>

      <div className="text-center text-sm text-gray-900">
        <p>
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#8B6F47] font-semibold hover:underline text-black"
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
