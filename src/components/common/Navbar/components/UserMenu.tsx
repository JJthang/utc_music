import { useState, useRef, useEffect } from "react";
import { LogOut, User, LogIn } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/stores";
import { logout } from "@/stores/slice/auth.slice";
import { Link } from "react-router-dom";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    window.location.href = "/login";
  };
  if (!user) {
    return (
      <Link
        to="/login"
        className="flex items-center gap-2 bg-gradient-to-br from-blue-500 to-blue-700 px-4 py-2 rounded-full text-white hover:from-blue-600 hover:to-cyan-600 transition-all text-sm font-semibold"
      >
        <LogIn size={16} />
        Đăng nhập
      </Link>
    );
  }

  return (
    <div className="relative z-[9999]" ref={dropdownRef}>
      {/* Nút Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 hover:ring-2 hover:ring-blue-400 flex items-center justify-center overflow-hidden transition-all"
      >
        {user?.avatarUri ? (
          <img
            src={user.avatarUri}
            alt={`avatar-of-${user.displayName}`}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-[#1E293B] border border-blue-700 rounded-2xl shadow-xl z-[99999] animate-fade-in">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-blue-700">
            <img
              src={user?.avatarUri || "/default-avatar.png"}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-white font-semibold">
                {user?.displayName || "Người dùng"}
              </p>
              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                {user.isPremium ? "Gói cao cấp" : "Gói cơ bản"}
              </span>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-3 text-left text-gray-300 hover:bg-blue-800 transition-all rounded-b-2xl cursor-pointer"
          >
            <LogOut size={18} />
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
