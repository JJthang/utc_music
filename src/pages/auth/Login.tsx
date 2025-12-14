import { LoginForm } from "@/components/forms/login-form";

export const LoginPage = () => {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img src="/vite.svg" alt="" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-white text-center mb-12">
          Welcome back
        </h1>

        {/* Login Form */}
        <LoginForm />
      </div>
    </main>
  );
};
