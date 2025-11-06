import { useAppDispatch, useMemoizedSelector } from '@/hooks'
import React, { useState } from 'react'
import { Play, Pause, MoreHorizontal } from 'lucide-react'
import { setCurrentSong, setPlayStatus, togglePlayStatus } from '@/stores/slice/song.slice';
import { useDebouncedCallback } from 'use-debounce';

const Sidebar: React.FC = () => {
    const { isOpen } = useMemoizedSelector((item) => item.sidebar)
    const [activeTab, setActiveTab] = useState<'playlist' | 'recent'>('playlist')
    const [autoPlay, setAutoPlay] = useState(true)
    const { playList, currentSong, statusSong } = useMemoizedSelector((state) => state.currentSong)
    const dispatch = useAppDispatch()

    const debouncedPlay = useDebouncedCallback(() => {
        dispatch(setPlayStatus(true));
    }, 500);

    return (
        <div
            className={`fixed right-0 top-0 h-full w-96 bg-gradient-to-b from-gray-900 to-black border-l border-gray-800 transform transition-transform duration-500 ease-in-out z-40 overflow-hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-800">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab('playlist')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'playlist'
                                ? 'bg-purple-600 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                }`}
                        >
                            Danh sách phát
                        </button>
                        <button
                            onClick={() => setActiveTab('recent')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'recent'
                                ? 'bg-purple-600 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                }`}
                        >
                            Nghe gần đây
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 main-content overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    <div className="p-4">
                        {/* Current Playing Song */}
                        {currentSong && (
                            <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl p-3 mb-4 flex items-center gap-3">
                                <div className="bg-purple-900 rounded-lg w-12 h-12 flex items-center justify-center text-xl flex-shrink-0 overflow-hidden">
                                    <img
                                        src={currentSong.coverUri}
                                        alt={currentSong.title}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-white text-sm truncate">
                                        {currentSong.title}
                                    </h3>
                                    <p className="text-xs text-purple-100 truncate">
                                        {currentSong.artists?.map((a) => a.artist.name).join(', ')}
                                    </p>
                                </div>

                                <button
                                    onClick={() => dispatch(togglePlayStatus())}
                                    className="bg-white rounded-full w-10 h-10 flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0"
                                >
                                    {
                                        statusSong ? <Pause className="w-4 h-4 text-purple-600 fill-purple-600" /> : <Play className="w-4 h-4 text-purple-600 fill-purple-600" />
                                    }
                                </button>
                            </div>
                        )}

                        {/* Auto Play Toggle */}
                        <div className="flex items-center justify-between mb-4 bg-gray-800 bg-opacity-50 rounded-lg p-3">
                            <div>
                                <h4 className="font-medium text-white text-sm">Tự động phát</h4>
                                <p className="text-xs text-gray-400">Danh sách bài hát gợi ý</p>
                            </div>
                            <button
                                onClick={() => setAutoPlay(!autoPlay)}
                                className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${autoPlay ? 'bg-purple-600' : 'bg-gray-600'
                                    }`}
                            >
                                <div
                                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${autoPlay ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Song List */}
                        <div className="space-y-1">
                            {playList.map((song) => (
                                <div
                                    key={song.id}
                                    className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors group cursor-pointer ${currentSong?.id === song.id ? 'bg-gray-800' : ''
                                        }`}
                                    onClick={() => {
                                        dispatch(setCurrentSong(song))
                                        debouncedPlay();
                                    }}
                                >
                                    <div className="bg-gray-700 rounded-lg w-11 h-11 flex items-center justify-center text-lg flex-shrink-0">
                                        <img src={song.coverUri} alt={song.title} className="w-full h-full object-cover rounded-lg" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-white text-sm truncate">{song.title}</h4>
                                        <p className="text-xs text-gray-400 truncate">
                                            {song.artists?.map((a) => a.artist.name).join(', ')}
                                        </p>
                                    </div>

                                    <button className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-gray-700 rounded-full transition-all flex-shrink-0">
                                        <MoreHorizontal className="w-4 h-4 text-gray-300" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Sidebar