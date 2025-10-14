'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signup } from '@/app/actions/auth';
import type { SignupState } from '@/app/actions/auth';
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-[#8B6F47] text-white py-3 rounded-md font-semibold hover:bg-[#7a603e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Creating Account..." : "Create Account"}
    </button>
  );
}

export default function SignupForm() {
  const initialState: SignupState = { message: undefined, errors: {} };
  const [state, formAction] = useActionState(signup, initialState);

  return (
    <form
      id="signup-form"
      action={formAction}
      className="space-y-3"
    >
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl text-gray-800 font-semibold">
          Sign up to continue.
        </h1>

        <div className="mt-4">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="name"
          >
            Enter Name
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-600 text-black"
            id="name"
            type="text"
            name="name"
            placeholder="Enter Your Name"
            required
            minLength={1}
            aria-describedby="name-error"
          />
          {state?.errors?.name && (
            <div id="name-error" className="mt-2 text-sm text-red-500">
              {state.errors.name.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>

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
            aria-describedby="email-error"
          />
          {state?.errors?.email && (
            <div id="email-error" className="mt-2 text-sm text-red-500">
              {state.errors.email.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
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
            aria-describedby="password-error"
          />
          {state?.errors?.password && (
            <div id="password-error" className="mt-2 text-sm text-red-500">
              {state.errors.password.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
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
            aria-describedby="confirmPassword-error"
          />
          {state?.errors?.confirmPassword && (
            <div id="confirmPassword-error" className="mt-2 text-sm text-red-500">
              {state.errors.confirmPassword.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>

        {/* Hidden role field with default value */}
        <input type="hidden" name="role" value="buyer" />

        {/* General error message */}
        {state?.message && (
          <div className="mt-4 p-3 rounded-md bg-red-50 border border-red-200">
            <p className="text-sm text-red-600">{state.message}</p>
          </div>
        )}
      </div>

      <SubmitButton />

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