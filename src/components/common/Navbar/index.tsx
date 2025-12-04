import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Download,
  Settings,
} from "lucide-react";
import { UserMenu } from "./components/UserMenu";
import { Micro } from "@/components/Micro";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isMicroActive, setIsMicroActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const mockSongs = [
    "Hơn Cả Yêu - Đức Phúc",
    "Chúng Ta Của Hiện Tại - Sơn Tùng",
    "Em Gái Mưa - Hương Tràm",
    "Lạc Trôi - Sơn Tùng",
    "Có Chắc Yêu Là Đây",
    "Nàng Thơ - Hoàng Dũng",
    "Bước Qua Mùa Cô Đơn",
    "Bước Qua Mùa Cô Đơn",
    "Bước Qua Mùa Cô Đơn",
    "Bước Qua Mùa Cô Đơn",
  ];

  return (
    <nav className="h-[68px] w-full relative z-50">
      {/* Navbar */}
      <div className="bg-[#0F172A] bg-opacity-90 backdrop-blur-sm px-6 py-3 flex items-center justify-between gap-4">
        {/* Left section - Navigation arrows and Search */}
        <div className="flex items-center gap-4 flex-1">
          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-black bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 rounded-full bg-black bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all">
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#334155] text-white placeholder-gray-400 rounded-full py-2.5 px-12 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Micro
                  isActive={isMicroActive}
                  language="vi-VN"
                  onChangeIsActive={setIsMicroActive}
                  onMicro={(text) => setMessage(text)}
                  onTimeout={(text) => {
                    setShowDropdown(false);
                  }}
                  className=""
                />
              </div>
              {showDropdown && (
                <div className="absolute top-full mt-2 w-full bg-[#334155] rounded-2xl shadow-xl max-h-[350px] hidden-scrollbar z-50">
                  {mockSongs
                    .filter((song) =>
                      song.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((song, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSearchQuery(song);
                          setShowDropdown(false);
                        }}
                        className="px-4 py-3 hover:bg-[#475569] cursor-pointer text-white transition"
                      >
                        🎵 {song}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right section - Action buttons */}
        <div className="flex items-center gap-3">
          {/* Upgrade Button */}
          {user?.isPremium ? (
            <div />
          ) : (
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full font-semibold text-sm transition-all">
              <Link to="upgrade/subscription">Nâng cấp tài khoản</Link>
            </button>
          )}

          {/* Download Button */}
          <button className="w-10 h-10 rounded-full bg-black bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all">
            <Download className="w-5 h-5 text-white" />
          </button>

          {/* Settings Button */}
          <button className="w-10 h-10 rounded-full bg-black bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all">
            <Settings className="w-5 h-5 text-white" />
          </button>

          {/* User Avatar */}
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
