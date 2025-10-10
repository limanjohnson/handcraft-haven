import { Suspense } from "react";
import { Metadata } from "next";
import SignupForm from "@/app/ui/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <main className="flex justify-center bg-gray-100 min-h-screen pt-24 pb-12">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-center h-16 rounded-lg bg-gray-300">
          <h1 className="text-2xl font-bold text-gray-800">Sign Up</h1>
        </div>

        <Suspense>
          <SignupForm />
        </Suspense>

        {/* <button
          type="submit"
          form="signup-form"
          className="w-full bg-[#8B6F47] text-white py-3 rounded-md font-semibold hover:bg-[#7a603e] transition-colors"
        >
          Create Account
        </button> */}

        {/* <div className="text-center text-sm text-gray-900">
          <p>
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#8B6F47] font-semibold hover:underline text-black"
            >
              Log In
            </a>
          </p>
        </div> */}
      </div>
    </main>
  );
}
