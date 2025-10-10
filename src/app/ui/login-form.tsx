'use client'
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // const searchParams = useSearchParams();
    // const [errorMessage, formAction, isPending] = useActionState(
        //authenticate,
        // undefined,
    // );

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // (Optional) validate or authenticate user here
    console.log("User signed in:", formData);

    // Redirect to dashboard after login
    router.push("/");
  };

  return (
    <form
      id="login-form"
      onSubmit={handleSubmit}
      className="space-y-3"
    >
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl dark:text-gray-800">
          Please log in to continue.
        </h1>

        <div className="w-full">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-600 text-black"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900">
            Password
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-600 text-black"
              id="password"
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-[#8B6F47] text-white py-3 rounded-md font-semibold hover:bg-[#7a603e] transition-colors"
        >
          Sign In
        </button>

        <div className="text-center text-sm text-gray-900 mt-4">
          <p>
            Don’t have an account?{" "}
            <Link href="/signup" className="text-[#8B6F47] font-semibold hover:underline text-black">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}




