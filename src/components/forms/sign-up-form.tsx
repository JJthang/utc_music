/* eslint-disable @typescript-eslint/no-explicit-any */
import { register } from "@/services/Apis/auth.service";
import type { RegisterPayload } from "@/types/auth.type";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    if (
      !userName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !displayName.trim()
    ) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email không hợp lệ.");
      return false;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);
    const payload: RegisterPayload = { userName, email, password, displayName };
    try {
      const { message } = await register(payload);
      setUserName("");
      setEmail("");
      setPassword("");
      setDisplayName("");

      toast.success(message);
      navigate("/login");
    } catch (error: any) {
      console.error(error.message || "Đã xảy ra lỗi trong quá trình đăng ký.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 text-red-400 border border-red-400 rounded-md p-2 text-sm">
          {error}
        </div>
      )}
      {/* Username Field */}
      <div>
        <label className="block text-white font-bold text-sm mb-2">
          Tên đăng nhập
        </label>
        <input
          type="text"
          placeholder="Vui lòng nhập tên đăng nhập của bạn"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full bg-black border border-gray-600 text-white placeholder-gray-500 px-4 py-2 rounded-lg focus:outline-none focus:border-white focus:ring-0"
        />
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-white font-bold text-sm mb-2">Email</label>
        <input
          type="email"
          placeholder="Vui lòng nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black border border-gray-600 text-white placeholder-gray-500 px-4 py-2 rounded-lg focus:outline-none focus:border-white focus:ring-0"
        />
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-white font-bold text-sm mb-2">
          Mật khẩu
        </label>
        <input
          type="password"
          placeholder="Vui lòng nhập mật khẩu của bạn"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-black border border-gray-600 text-white placeholder-gray-500 px-4 py-2 rounded-lg focus:outline-none focus:border-white focus:ring-0"
        />
      </div>

      {/* Display Name Field */}
      <div>
        <label className="block text-white font-bold text-sm mb-2">
          Tên hiển thị
        </label>
        <input
          type="text"
          placeholder="Vui lòng nhập tên hiển thị của bạn"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full bg-black border border-gray-600 text-white placeholder-gray-500 px-4 py-2 rounded-lg focus:outline-none focus:border-white focus:ring-0"
        />
      </div>

      {/* Primary Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-full hover:bg-blue-500 transition text-lg cursor-pointer"
      >
        {loading ? "Đang xử lý..." : "Đăng ký"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-600"></div>
        <span className="text-gray-400 text-sm">hoặc</span>
        <div className="flex-1 h-px bg-gray-600"></div>
      </div>

      {/* OAuth Buttons */}
      <div className="space-y-3">
        <OAuthButton icon="phone" label="Tiếp tục với số điện thoại" />
        <OAuthButton icon="google" label="Tiếp tục với tài khoản Google" />
      </div>

      {/* Login Link */}
      <div className="text-center pt-4">
        <p className="text-gray-400 text-sm">
          Bạn đã có tài khoản?{" "}
          <Link to="/login" className="text-white font-bold hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </form>
  );
}

interface OAuthButtonProps {
  icon: "google" | "phone";
  label: string;
}

function OAuthButton({ icon, label }: OAuthButtonProps) {
  const handleClick = () => {
    console.log(`Clicked: ${label}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-3 border border-gray-600 text-white font-bold py-2 rounded-full hover:border-white transition"
    >
      {icon === "google" ? (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 13.5c-.91 0-1.82.55-1.82 1.5s.91 1.5 1.82 1.5c.91 0 1.82-.55 1.82-1.5s-.91-1.5-1.82-1.5zm-11.1 0c-.91 0-1.82.55-1.82 1.5s.91 1.5 1.82 1.5c.91 0 1.82-.55 1.82-1.5s-.91-1.5-1.82-1.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
        </svg>
      )}
      {label}
    </button>
  );
}
