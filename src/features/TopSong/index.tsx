import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

import SongContextMenu from "./components/SongContextMenu";

import { setCurrentSong, setPlayStatus } from "@/stores/slice/song.slice";
import { capitalizeFirst, formatDuration } from "@/utils/format";
import type { Song } from "@/types/song.type";
import type { TopSongChart } from "@/types/stats.type";
import { getChartTopSongs } from "@/services/Apis/stats.service";

const TopSong = () => {
  const [topSongs, setTopSongs] = useState<TopSongChart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [contextMenu, setContextMenu] = useState<{
    song: Song;
    anchorEl: HTMLElement;
  } | null>(null);
  const dispatch = useDispatch();

  const debouncedPlay = useDebouncedCallback(() => {
    dispatch(setPlayStatus(true));
  }, 500);

  const handleSetCurrentSong = (song: Song) => {
    dispatch(setCurrentSong(song));
    debouncedPlay();
  };

  const handleContextMenuClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    song: Song
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

  const handleAddToPlaylist = (song: Song) => {
    console.log("Add to playlist:", song.title);
    // TODO: Implement add to playlist functionality
  };

  const handlePlayNext = (song: Song) => {
    console.log("Play next:", song.title);
    // TODO: Implement play next functionality
  };

  const handlePlaySimilar = (song: Song) => {
    console.log("Play similar:", song.title);
    // TODO: Implement play similar functionality
  };

  const handleCopyLink = async (song: Song) => {
    try {
      const link = `${window.location.origin}/song/${song.id}`;
      await navigator.clipboard.writeText(link);
      console.log("Link copied:", link);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const handleShare = (song: Song) => {
    console.log("Share:", song.title);
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: song.title,
        text: `Nghe bài hát: ${song.title}`,
        url: `${window.location.origin}/song/${song.id}`,
      });
    }
  };

  const handleBlock = (song: Song) => {
    console.log("Block:", song.title);
    // TODO: Implement block functionality
  };

  const handleShowLyrics = (song: Song) => {
    console.log("Show lyrics:", song.title);
    // TODO: Implement show lyrics functionality
  };

  // Get rank color based on position
  const getRankColor = (rank: number): string => {
    switch (rank) {
      case 1:
        return "text-blue-400"; // Blue
      case 2:
        return "text-green-400"; // Green
      case 3:
        return "text-red-400"; // Red
      case 4:
        return "text-cyan-400"; // Light blue
      default:
        return "text-white"; // White
    }
  };

  useEffect(() => {
    const fetchTopSongs = async () => {
      setIsLoading(true);
      try {
        const { data } = await getChartTopSongs({
          limit: 50,
          period: "week",
        });

        setTopSongs(data);
      } catch (error) {
        console.error("Lỗi khi tải top songs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopSongs();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Đang tải bảng xếp hạng...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8 rounded-xl">
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
                {topSongs.map((ts) => (
                  <tr
                    key={ts.song.id}
                    onClick={() => handleSetCurrentSong(ts.song)}
                    className="border-b border-slate-700/50 hover:bg-slate-700/60 transition-colors group"
                  >
                    {/* Rank */}
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`text-xl font-bold ${getRankColor(
                          ts.position
                        )}`}
                      >
                        {ts.position}
                      </span>
                    </td>

                    {/* Trend Indicator */}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center w-8">
                        {ts.change > 0 && (
                          <div className="flex items-center text-green-400">
                            <ArrowUp className="w-4 h-4" />
                            <span className="text-xs ml-1">{ts.change}</span>
                          </div>
                        )}
                        {ts.change < 0 && (
                          <div className="flex items-center text-red-400">
                            <ArrowDown className="w-4 h-4" />
                            <span className="text-xs ml-1">{ts.change}</span>
                          </div>
                        )}
                        {ts.change == 0 && (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                    </td>

                    {/* Song Info with Album Art */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        {/* Album Art */}
                        <div className="w-14 h-14 rounded overflow-hidden cursor-pointer shrink-0">
                          <img
                            src={ts.song.coverUri || "/placeholder.svg"}
                            alt={ts.song.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Song Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-bold text-base mb-0.5 truncate hover:text-blue-400 cursor-pointer transition-colors">
                            {ts.song.title}
                          </h3>
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <p className="text-gray-500 text-sm hover:text-blue-400 hover:underline cursor-pointer transition-colors">
                              {ts.song.artists
                                ?.map((art) => art.artist.name)
                                .join(", ")}
                            </p>
                            <span className="text-gray-500 text-sm">•</span>
                            <Link
                              to={`/album/${ts.song.albumId}`}
                              className="text-gray-500 text-sm truncate hover:text-blue-400 hover:underline cursor-pointer transition-colors"
                            >
                              {ts.song.album.title}
                              <span className="ml-1">
                                ({capitalizeFirst(ts.song.album.type)})
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-gray-400 text-sm">
                          {formatDuration(ts.song.duration)}
                        </span>
                        <button
                          onClick={(e) => handleContextMenuClick(e, ts.song)}
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
