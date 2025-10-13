import { useMemoizedSelector } from '@/hooks'
import React from 'react'


const Sidebar = () => {

    const { isOpen } = useMemoizedSelector((item) => item.sidebar)

    return (
        <div
            className={`fixed right-0 top-0 h-full w-64 bg-gray-950 border-r border-gray-800 transform transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Menu</h2>
                <nav className="space-y-4">
                    <div className="p-3 hover:bg-gray-800 rounded cursor-pointer">Danh sách phát</div>
                    <div className="p-3 hover:bg-gray-800 rounded cursor-pointer">Bài hát yêu thích</div>
                    <div className="p-3 hover:bg-gray-800 rounded cursor-pointer">Gần đây</div>
                    <div className="p-3 hover:bg-gray-800 rounded cursor-pointer">Download</div>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar