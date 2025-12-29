import React, { useState } from 'react';
import { Music, Disc, TrendingUp, Radio, Clock, Folder, Star, LogIn, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/stores';

export function LoginBanner() {
    const user = useSelector((state: RootState) => state.auth.user);

    if (user) return null;

    return (
        <Link
            to="/login"
            className="mx-4 mb-6 block bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 hover:opacity-95 transition"
        >
            <p className="text-white text-center text-sm leading-relaxed mb-4">
                Đăng nhập để khám phá playlist dành riêng cho bạn
            </p>
            <div className="w-full bg-white text-blue-600 font-semibold py-3 rounded-full flex items-center justify-center gap-2">
                <LogIn size={18} />
                <span>ĐĂNG NHẬP</span>
            </div>
        </Link>
    );
}

const SidebarMenu: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string>('');

    const menuItems = [
        { icon: Music, label: 'Thư Viện', id: 'library', link: '/' },
        { icon: Disc, label: 'Khám Phá', id: 'discover', link: '/' },
        { icon: TrendingUp, label: 'Bảng xếp hạng', id: 'top_song', link: 'chart-top-song' },
        { icon: Radio, label: 'Phòng Nhạc', id: 'radio', badge: 'LIVE', link: '#' },
        { icon: Heart, label: 'Bài hát yêu thích', id: 'favorite', link: '/favorite' },
    ];

    const subMenuItems = [
        { icon: Clock, label: 'BXH Nhạc Mới', id: 'new-music' },
        { icon: Folder, label: 'Chủ Đề & Thể Loại', id: 'topics' },
        { icon: Star, label: 'Top 100', id: 'top100' },
    ];

    return (
        <div className="sidebar-menu w-64 bg-sidebar text-white h-full overflow-y-auto flex flex-col">
            {/* Logo */}
            <div className="p-6 pb-4">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#3B82F6] flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-105">
                            <Music size={24} className="text-white" strokeWidth={2.5} />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#93C5FD] rounded-full opacity-80 animate-pulse"></div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold bg-gradient-to-r from-[#60A5FA] via-[#93C5FD] to-[#60A5FA] bg-clip-text text-transparent">
                                MusicHub
                            </span>
                        </div>
                        <p className="text-gray-400 text-xs mt-0.5 tracking-wider">MXH ÂM NHẠC</p>
                    </div>
                </Link>
            </div>

            {/* Main Menu */}
            <nav className="flex-1 ">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.id}>

                            <Link to={item.link} onClick={() => setActiveItem(item.id)}
                                className={`w-full flex items-center gap-3 cursor-pointer px-6 py-3 transition-all ${activeItem === item.id
                                    ? 'bg-[#ffffff1a] text-white'
                                    : 'text-gray-300 hover:bg-[#ffffff0d] hover:text-white'
                                    }`}>
                                <item.icon size={22} />
                                <span className="text-[15px] font-medium">{item.label}</span>
                                {item.badge && (
                                    <span className="ml-auto bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Divider */}
                <div className="border-t border-gray-700 my-4"></div>

                {/* Sub Menu */}
                <ul className="space-y-1 pb-4">
                    {subMenuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActiveItem(item.id)}
                                className={`w-full flex items-center gap-3 cursor-pointer px-6 py-3 transition-all ${activeItem === item.id
                                    ? 'bg-[#ffffff1a] text-white'
                                    : 'text-gray-300 hover:bg-[#ffffff0d] hover:text-white'
                                    }`}
                            >
                                <item.icon size={22} />
                                <span className="text-[15px] font-medium">{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Login Card */}
            <LoginBanner />
        </div>
    );
};

export default SidebarMenu;