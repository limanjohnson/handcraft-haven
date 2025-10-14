'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { authenticate } from '@/app/actions/auth';
import Link from "next/link";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="mt-6 w-full bg-[#8B6F47] text-white py-3 rounded-md font-semibold hover:bg-[#7a603e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? "Signing In..." : "Sign In"}
        </button>
    );
}

export default function LoginForm() {
    const [errorMessage, formAction] = useActionState(authenticate, undefined);

    return (
        <form action={formAction} className="space-y-3">
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
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-600 text-black"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
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
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-600 text-black"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            required
                            minLength={6}
                        />
                    </div>
                </div>

                {errorMessage && (
                    <div className="mt-4 p-3 rounded-md bg-red-50 border border-red-200">
                        <p className="text-sm text-red-600">{errorMessage}</p>
                    </div>
                )}

                <SubmitButton />

                <div className="text-center text-sm text-gray-900 mt-4">
                    <p>
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-[#8B6F47] font-semibold hover:underline text-black">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </form>
    );
}