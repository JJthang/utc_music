import { SignUpForm } from "@/components/forms/sign-up-form";
import { Link } from "react-router-dom";

export function SignUpPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-4 overflow-y-auto">
      <div className="w-full max-w-md py-6">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img src="/vite.svg" alt="" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-white text-center mb-12 leading-tight">
          Đăng ký
        </h1>

        {/* Sign Up Form */}
        <SignUpForm />

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500 leading-relaxed">
          This site is protected by reCAPTCHA and the Google{" "}
          <Link to="#" className="underline hover:text-gray-400">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link to="#" className="underline hover:text-gray-400">
            Terms of Service
          </Link>{" "}
          apply.
        </div>
      </div>
    </main>
  );
}
