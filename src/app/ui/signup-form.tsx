'use client'
import { Imperial_Script} from "next/font/google";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const imperialScript = Imperial_Script({
    weight: '400',
    subsets: ['latin'],
});

export default function SignupForm() {
    // const searchParams = useSearchParams();
    // const [errorMessage, formAction, isPending] = useActionState(
    //authenticate,
    // undefined,
    // );

    return(
        <form
            // action={formAction}
            className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className="mb-3 text-2xl dark:text-gray-800">
                    Sign up to continue.
                </h1>
                <div className="w-full">
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="email"
                    >
                        Enter Email
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
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
                        Create Password
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            required
                            minLength={6}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="confirmPassword"
                    >
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            required
                            minLength={6}
                        />
                    </div>
                </div>

            </div>
            <div>
                <Link href="/login">
                    Already have an account? Sign in here.
                </Link>
            </div>
        </form>
    )

}