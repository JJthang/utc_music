import type { FC } from "react";
import { useState, useEffect } from "react";
import { Play, Heart, MoreHorizontal, Pause } from "lucide-react";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

import { formatDuration } from "@/utils/format";
import { setCurrentSong, setPlayStatus, togglePlayStatus, setPlayList } from "@/stores/slice/song.slice";
import { getLikedSongs, postFavorite, deleteFavorite } from "@/services/Apis/favourite.service";
import type { Song } from "@/types/song.type";
import { useMemoizedSelector } from "@/hooks";
import type { ApiListResponse } from "@/types/api-response.type";

type SongCardType = {
  song: Song;
  onClick: (song: Song) => void;
  onToggleFavorite: (songId: string, isFavorite: boolean) => void;
  isFavorite: boolean;
};

const SongCard: FC<SongCardType> = ({ song, onClick, onToggleFavorite, isFavorite }) => {
  const { statusSong, currentSong } = useMemoizedSelector((state) => state.currentSong);
  const isPlaying = currentSong?.id === song.id && statusSong;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(song.id, isFavorite);
  };

  return (
    <div
      key={song.id}
      onClick={() => onClick(song)}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/60 transition-colors group cursor-pointer"
    >
      <div className="relative w-10 h-10 rounded overflow-hidden shrink-0">
        <img
          src={song.coverUri || "/placeholder.svg"}
          alt={song.title}
          className="object-cover group-hover:hidden"
        />
        <button className="hidden group-hover:flex items-center justify-center w-full h-full bg-black/60 hover:bg-black/80 transition-colors cursor-pointer">
          {isPlaying ? (
            <Pause fill="white" className="size fill-white text-white" />
          ) : (
            <Play fill="white" className="size fill-white text-white" />
          )}
        </button>
      </div>

      <div className="flex-1">
        <p className="text-white font-medium">{song.title}</p>
        {song.artists &&
          song.artists.map((art, idx) => (
            <p
              key={idx}
              className="text-gray-500 text-sm hover:text-blue-400 hover:underline cursor-pointer transition-colors"
            >
              {art.artist.name}
            </p>
          ))}
      </div>

      <span className="text-gray-400 text-sm min-w-12 text-right">
        {formatDuration(song.duration)}
      </span>

      <div className="hidden group-hover:flex items-center gap-2">
        <button
          onClick={handleFavoriteClick}
          className="p-1.5 rounded-full hover:bg-slate-600/60 transition-colors cursor-pointer"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite
                ? "text-red-500 fill-red-500 hover:text-red-400"
                : "text-white hover:text-blue-400"
            }`}
          />
        </button>
        <button className="p-1.5 rounded-full hover:bg-slate-600/60 transition-colors cursor-pointer">
          <MoreHorizontal className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

const FavoritePage: FC = () => {
  const { currentSong } = useMemoizedSelector((state) => state.currentSong);
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useDispatch();

  const debouncedPlay = useDebouncedCallback(() => {
    dispatch(setPlayStatus(true));
  }, 500);

  const handSetCurrentSong = (item: Song) => {
    // Nếu đây là bài hát đang phát, chỉ toggle play/pause
    if (currentSong?.id === item.id) {
      dispatch(togglePlayStatus());
    } else {
      // Nếu là bài hát khác, set bài hát mới và play
      dispatch(setCurrentSong(item));
      debouncedPlay();
    }
  };

  const fetchLikedSongs = async (pageNum: number = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const response: ApiListResponse<Song> = await getLikedSongs({
        page: pageNum,
        limit: 20,
      });
      setSongs(response.data || []);
      if (response.meta?.pagination) {
        setTotalPages(response.meta.pagination.totalPages || 1);
        setTotalItems(response.meta.pagination.totalItems || 0);
      }
      // Set playlist for navigation
      dispatch(setPlayList(response.data));
    } catch (err) {
      console.error("Lỗi khi tải danh sách yêu thích:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Không thể tải danh sách bài hát yêu thích. Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = async (songId: string, isFavorite: boolean) => {
    try {
      if (isFavorite) {
        await deleteFavorite(songId);
      } else {
        await postFavorite(songId);
      }
      // Refresh the list
      await fetchLikedSongs(page);
    } catch (err) {
      console.error("Lỗi khi cập nhật yêu thích:", err);
      // You could show a toast notification here
    }
  };

  useEffect(() => {
    fetchLikedSongs(page);
  }, [page]);

  const handlePlayAll = () => {
    if (songs.length > 0) {
      dispatch(setCurrentSong(songs[0]));
      dispatch(setPlayList(songs));
      debouncedPlay();
    }
  };

  if (isLoading && songs.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p>Đang tải danh sách yêu thích...</p>
      </main>
    );
  }

  if (error && songs.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400">
        <p>Lỗi: {error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-900 to-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Bài hát yêu thích</h1>
          <p className="text-gray-400 text-sm">
            {totalItems > 0 ? `${totalItems} bài hát` : "Chưa có bài hát yêu thích"}
          </p>
        </div>

        {/* Play All Button */}
        {songs.length > 0 && (
          <button
            onClick={handlePlayAll}
            className="w-full sm:w-auto bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 mb-6 transition-all shadow-lg cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white" />
            PHÁT TẤT CẢ
          </button>
        )}

        {/* Songs List */}
        {songs.length === 0 && !isLoading ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Chưa có bài hát yêu thích</p>
            <p className="text-gray-500 text-sm mt-2">
              Thêm bài hát yêu thích để xem chúng ở đây
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2 mb-8">
              {songs.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  onClick={handSetCurrentSong}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={true}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Trước
                </button>
                <span className="text-gray-400">
                  Trang {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Sau
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default FavoritePage;
