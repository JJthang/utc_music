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
                <div className="flex items-center gap-3">
                    {/* Logo SVG với gradient xanh dương */}
                    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                        <defs>
                            <linearGradient id="noteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#60A5FA" />
                                <stop offset="100%" stopColor="#3B82F6" />
                            </linearGradient>
                            <linearGradient id="noteGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#93C5FD" />
                                <stop offset="100%" stopColor="#60A5FA" />
                            </linearGradient>
                        </defs>
                        {/* Musical note icon với gradient xanh */}
                        <g>
                            {/* Glow effect */}
                            <ellipse cx="12" cy="22" rx="7" ry="6" fill="#60A5FA" opacity="0.2"/>
                            {/* Note head */}
                            <ellipse cx="12" cy="22" rx="6" ry="5" fill="url(#noteGradient)"/>
                            {/* Note stem */}
                            <rect x="16" y="12" width="2" height="12" fill="url(#noteGradient)"/>
                            {/* Note flag */}
                            <path d="M 18 12 Q 22 10, 24 14 Q 22 18, 18 16 Z" fill="url(#noteGradient)"/>
                            {/* Second smaller note */}
                            <ellipse cx="26" cy="26" rx="4" ry="3.5" fill="url(#noteGradient2)" opacity="0.9"/>
                            <rect x="29" y="18" width="1.5" height="10" fill="url(#noteGradient2)" opacity="0.9"/>
                        </g>
                    </svg>
                    {/* Brand name với gradient xanh dương */}
                    <div className="flex flex-col">
                        <div className="text-2xl font-bold">
                            <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent">
                                Music
                            </span>
                            <span className="text-white font-semibold ml-1">Hub</span>
                        </div>
                        <p className="text-gray-400 text-xs mt-0.5 tracking-wide">KHÁM PHÁ ÂM NHẠC</p>
                    </div>
                </div>
            </div>

            {/* Main Menu */}
            <nav className="flex-1 ">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.id}>

                            <Link to={item.link} onClick={() => setActiveItem(item.id)}
                                className={`w-full flex items-center gap-3 cursor-pointer px-6 py-3 transition-all ${activeItem === item.id
                                    ? 'bg-white/10 text-white'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
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
                                    ? 'bg-white/10 text-white'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
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