import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Search, Download, Settings, User } from 'lucide-react';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <nav className="h-[68px]">
            {/* Navbar */}
            <div className="bg-[#170f23] bg-opacity-90 backdrop-blur-sm px-6 py-3 flex items-center justify-between gap-4">
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
                                className="w-full bg-[#2f2739] text-white placeholder-gray-400 rounded-full py-2.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Right section - Action buttons */}
                <div className="flex items-center gap-3">
                    {/* Upgrade Button */}
                    <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-semibold text-sm transition-all">
                        Nâng cấp tài khoản
                    </button>

                    {/* Download Button */}
                    <button className="w-10 h-10 rounded-full bg-black bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all">
                        <Download className="w-5 h-5 text-white" />
                    </button>

                    {/* Settings Button */}
                    <button className="w-10 h-10 rounded-full bg-black bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all">
                        <Settings className="w-5 h-5 text-white" />
                    </button>

                    {/* User Avatar */}
                    <button className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:ring-2 hover:ring-purple-400 flex items-center justify-center transition-all">
                        <User className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;