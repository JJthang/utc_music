import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, MoreHorizontal } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { setCurrentSong, setPlayStatus } from '@/stores/slice/song.slice';
import { getListSongs } from '@/services/Apis/listsSong.service.api';
import { formatDuration } from '@/utils/format';
import type { currentSong } from '@/types/song.type';
import SongContextMenu from './components/SongContextMenu';

interface TrendInfo {
    direction: 'up' | 'down' | 'stable';
    value: number;
}

interface TopSongItem extends currentSong {
    rank: number;
    trend: TrendInfo;
    previousRank?: number;
}

const TopSong = () => {
    const [songs, setSongs] = useState<TopSongItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [contextMenu, setContextMenu] = useState<{
        song: currentSong;
        anchorEl: HTMLElement;
    } | null>(null);
    const dispatch = useDispatch();

    const debouncedPlay = useDebouncedCallback(() => {
        dispatch(setPlayStatus(true));
    }, 500);

    const handleSetCurrentSong = (song: currentSong) => {
        dispatch(setCurrentSong(song));
        debouncedPlay();
    };

    const handleContextMenuClick = (
        e: React.MouseEvent<HTMLButtonElement>,
        song: currentSong
    ) => {
        e.stopPropagation(); // Prevent row click
        setContextMenu({
            song,
            anchorEl: e.currentTarget,
        });
    };

    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    const handleAddToPlaylist = (song: currentSong) => {
        console.log('Add to playlist:', song.title);
        // TODO: Implement add to playlist functionality
    };

    const handlePlayNext = (song: currentSong) => {
        console.log('Play next:', song.title);
        // TODO: Implement play next functionality
    };

    const handlePlaySimilar = (song: currentSong) => {
        console.log('Play similar:', song.title);
        // TODO: Implement play similar functionality
    };

    const handleCopyLink = async (song: currentSong) => {
        try {
            const link = `${window.location.origin}/song/${song.id}`;
            await navigator.clipboard.writeText(link);
            console.log('Link copied:', link);
        } catch (error) {
            console.error('Failed to copy link:', error);
        }
    };

    const handleShare = (song: currentSong) => {
        console.log('Share:', song.title);
        // TODO: Implement share functionality
        if (navigator.share) {
            navigator.share({
                title: song.title,
                text: `Nghe bài hát: ${song.title}`,
                url: `${window.location.origin}/song/${song.id}`,
            });
        }
    };

    const handleBlock = (song: currentSong) => {
        console.log('Block:', song.title);
        // TODO: Implement block functionality
    };

    const handleShowLyrics = (song: currentSong) => {
        console.log('Show lyrics:', song.title);
        // TODO: Implement show lyrics functionality
    };

    // Generate trend info (in real app, this would come from API)
    const generateTrendInfo = (rank: number, index: number): TrendInfo => {
        // Simulate trends for demonstration
        const trends: TrendInfo[] = [
            { direction: 'stable', value: 0 },
            { direction: 'stable', value: 0 },
            { direction: 'stable', value: 0 },
            { direction: 'stable', value: 0 },
            { direction: 'stable', value: 0 },
            { direction: 'stable', value: 0 },
            { direction: 'stable', value: 0 },
            { direction: 'up', value: 2 },
            { direction: 'stable', value: 0 },
            { direction: 'down', value: 2 },
            { direction: 'up', value: 1 },
        ];
        return trends[index] || { direction: 'stable', value: 0 };
    };

    // Get rank color based on position
    const getRankColor = (rank: number): string => {
        switch (rank) {
            case 1:
                return 'text-blue-400'; // Blue
            case 2:
                return 'text-green-400'; // Green
            case 3:
                return 'text-red-400'; // Red
            case 4:
                return 'text-cyan-400'; // Light blue
            default:
                return 'text-white'; // White
        }
    };

    // Format album info
    const formatAlbumInfo = (song: currentSong): string => {
        const albumTitle = song.album?.title || 'Unknown Album';
        // In a real app, you'd check if it's a Single or EP based on song count
        // For now, we'll just show the album title with (Single) or (EP)
        return `${albumTitle} (Single)`;
    };

    useEffect(() => {
        const fetchTopSongs = async () => {
            setIsLoading(true);
            try {
                const { data } = await getListSongs({
                    limit: 50,
                    sortBy: 'views',
                    order: 'desc'
                });

                // Sort by views and take top songs
                const topSongs = data
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 11)
                    .map((song, index) => ({
                        ...song,
                        rank: index + 1,
                        trend: generateTrendInfo(index + 1, index),
                    }));

                setSongs(topSongs);
            } catch (error) {
                console.error('Lỗi khi tải top songs:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopSongs();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-outlet text-white flex items-center justify-center">
                <p>Đang tải bảng xếp hạng...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-outlet text-white p-6 md:p-8">
            <div className="w-full">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Bảng xếp hạng</h1>

                <div className="bg-slate-800 rounded-xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-700 text-gray-400 text-sm">
                                    <th className="text-center py-4 px-6 w-16">#</th>
                                    <th className="text-left py-4 px-6 w-16"></th>
                                    <th className="text-left py-4 px-6"></th>
                                    <th className="text-right py-4 px-6 w-24"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {songs.map((song) => (
                                    <tr
                                        key={song.id}
                                        onClick={() => handleSetCurrentSong(song)}
                                        className="border-b border-slate-700/50 hover:bg-slate-700/60 transition-colors cursor-pointer group"
                                    >
                                        {/* Rank */}
                                        <td className="py-4 px-6 text-center">
                                            <span className={`text-xl font-bold ${getRankColor(song.rank)}`}>
                                                {song.rank}
                                            </span>
                                        </td>

                                        {/* Trend Indicator */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-center w-8">
                                                {song.trend.direction === 'up' && (
                                                    <div className="flex items-center text-green-400">
                                                        <ArrowUp className="w-4 h-4" />
                                                        <span className="text-xs ml-1">{song.trend.value}</span>
                                                    </div>
                                                )}
                                                {song.trend.direction === 'down' && (
                                                    <div className="flex items-center text-red-400">
                                                        <ArrowDown className="w-4 h-4" />
                                                        <span className="text-xs ml-1">{song.trend.value}</span>
                                                    </div>
                                                )}
                                                {song.trend.direction === 'stable' && (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                            </div>
                                        </td>

                                        {/* Song Info with Album Art */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-4">
                                                {/* Album Art */}
                                                <div className="w-14 h-14 rounded overflow-hidden shrink-0">
                                                    <img
                                                        src={song.coverUri || '/placeholder.svg'}
                                                        alt={song.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                {/* Song Details */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-white font-bold text-base mb-0.5 truncate">
                                                        {song.title}
                                                    </h3>
                                                    <div className="flex items-baseline gap-2 flex-wrap">
                                                        <p className="text-gray-400 text-sm">
                                                            {song.artists?.map((art) => art.artist.name).join(', ')}
                                                        </p>
                                                        <span className="text-gray-400 text-sm">•</span>
                                                        <p className="text-gray-400 text-sm truncate">
                                                            {formatAlbumInfo(song)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Duration */}
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <span className="text-gray-400 text-sm">
                                                    {formatDuration(song.duration)}
                                                </span>
                                                <button
                                                    onClick={(e) => handleContextMenuClick(e, song)}
                                                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-slate-600 rounded transition-all cursor-pointer"
                                                    aria-label="More options"
                                                >
                                                    <MoreHorizontal className="w-5 h-5 text-gray-300" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Context Menu */}
            {contextMenu && (
                <SongContextMenu
                    song={contextMenu.song}
                    anchorEl={contextMenu.anchorEl}
                    open={!!contextMenu}
                    onClose={handleCloseContextMenu}
                    onAddToPlaylist={handleAddToPlaylist}
                    onPlayNext={handlePlayNext}
                    onPlaySimilar={handlePlaySimilar}
                    onCopyLink={handleCopyLink}
                    onShare={handleShare}
                    onBlock={handleBlock}
                    onShowLyrics={handleShowLyrics}
                />
            )}
        </div>
    );
};

export default TopSong;