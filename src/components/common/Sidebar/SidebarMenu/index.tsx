import React, { useState } from 'react';
import { Music, Disc, TrendingUp, Radio, Clock, Folder, Star, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const SidebarMenu: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string>('');

    const menuItems = [
        { icon: Music, label: 'Thư Viện', id: 'library', link: '#' },
        { icon: Disc, label: 'Khám Phá', id: 'discover', link: '/' },
        { icon: TrendingUp, label: '#zingchart', id: 'zingchart', link: '#' },
        { icon: Radio, label: 'Phòng Nhạc', id: 'radio', badge: 'LIVE', link: '#' },
    ];

    const subMenuItems = [
        { icon: Clock, label: 'BXH Nhạc Mới', id: 'new-music' },
        { icon: Folder, label: 'Chủ Đề & Thể Loại', id: 'topics' },
        { icon: Star, label: 'Top 100', id: 'top100' },
    ];

    return (
        <div className="sidebar-menu w-64 bg-sidebar text-white h-[calc(100vh-91px)] overflow-y-scroll flex flex-col ">
            {/* Logo */}
            <div className="p-6 pb-4">
                <div className="flex items-center gap-1">
                    <span className="text-4xl font-bold">
                        <span className="text-[#0d7ded]">Z</span>
                        <span className="text-[#50e3c2]">i</span>
                        <span className="text-[#fe63a9]">n</span>
                        <span className="text-[#ffd300]">g</span>
                    </span>
                    <span className="text-2xl font-light ml-1">mp3</span>
                </div>
                <p className="text-gray-400 text-sm mt-1 tracking-wider">MXH ÂM NHẠC</p>
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
            <Link to="/login" className="mx-4 mb-6 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6">
                <p className="text-white text-center text-sm leading-relaxed mb-4">
                    Đăng nhập để khám phá playlist dành riêng cho bạn
                </p>
                <button className="w-full bg-white text-purple-600 font-semibold py-3 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    <LogIn size={18} />
                    ĐĂNG NHẬP
                </button>
            </Link>
        </div>
    );
};

export default SidebarMenu;