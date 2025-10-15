import { Suspense } from "react";
import { Metadata } from "next";
import LoginForm from "@/app/ui/login-form";

// Simple SEO for login page
export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Handcraft Haven account to manage your orders and profile.",
};

export default function LoginPage() {
  return (
    <main className="flex justify-center bg-gray-100 min-h-screen pt-24 pb-12">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-center h-16 rounded-lg bg-gray-300">
          <h1 className="text-2xl font-bold text-gray-800">Login</h1>
        </div>

        <Suspense>
          <LoginForm />
        </Suspense>

        {/* <button
          type="submit"
          form="login-form"
          className="w-full bg-[#8B6F47] text-white py-3 rounded-md font-semibold hover:bg-[#7a603e] transition-colors"
        >
          Sign In
        </button>

        <div className="text-center text-sm text-gray-900">
          <p>
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-[#8B6F47] font-semibold hover:underline text-black"
            >
              Sign Up
            </a>
          </p>
        </div> */}
      </div>
    </main>
  );
}
