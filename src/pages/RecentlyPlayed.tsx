import type { FC } from "react";
import { useState, useEffect } from "react";
import { Play, Heart, MoreHorizontal, Pause, Clock } from "lucide-react";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { Link } from "react-router-dom";

import { formatDuration } from "@/utils/format";
import {
  setCurrentSong,
  setPlayStatus,
  togglePlayStatus,
  setPlayList,
} from "@/stores/slice/song.slice";
import { postFavorite, deleteFavorite } from "@/services/Apis/favourite.service";
import { getRecentPlayedSongs } from "@/services/Apis/stats.service";
import type { Song } from "@/types/song.type";
import { useMemoizedSelector } from "@/hooks";
import type { SongRecentPlay } from "@/types/stats.type";

type SongCardType = {
  song: SongRecentPlay;
  onClick: (song: Song) => void;
  onToggleFavorite: (songId: string, isFavorite: boolean) => void;
};

const SongCard: FC<SongCardType> = ({ song, onClick, onToggleFavorite }) => {
  const { statusSong, currentSong } = useMemoizedSelector(
    (state) => state.currentSong
  );
  const isPlaying = currentSong?.id === song.song.id && statusSong;
  const isLiked = song.song.isLiked ?? false;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(song.song.id, isLiked);
  };

  return (
    <div
      key={song.song.id}
      onClick={() => onClick(song.song)}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/60 transition-colors group cursor-pointer"
    >
      <div className="relative w-10 h-10 rounded overflow-hidden shrink-0">
        <img
          src={song.song.coverUri || "/placeholder.svg"}
          alt={song.song.title}
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
        <p className="text-white font-medium">{song.song.title}</p>
        <p className="flex items-center">
          {song.song.artists &&
            song.song.artists.map((art, idx) => (
              <span key={idx} className="flex items-center">
                <Link
                  to={`/artist/${art.artistId}`}
                  className="text-gray-400 text-sm hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  {art.artist.name}
                </Link>

                {idx < song.song.artists.length - 1 && (
                  <span className="text-gray-400 text-sm mx-1">, </span>
                )}
              </span>
            ))}
        </p>
      </div>
      <span className="text-gray-400 text-sm min-w-12 text-right">
        {formatDuration(song.song.duration)}
      </span>

      <div className="hidden group-hover:flex items-center gap-2">
        <button
          onClick={handleFavoriteClick}
          className="p-1.5 rounded-full hover:bg-slate-600/60 transition-colors cursor-pointer"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked
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

const RecentlyPlayedPage: FC = () => {
  const { currentSong } = useMemoizedSelector((state) => state.currentSong);
  const [songs, setSongs] = useState<SongRecentPlay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const debouncedPlay = useDebouncedCallback(() => {
    dispatch(setPlayStatus(true));
  }, 500);

  const handSetCurrentSong = (item: Song) => {
    if (currentSong?.id === item.id) {
      dispatch(togglePlayStatus());
    } else {
      dispatch(setCurrentSong(item));
      const songList = songs.map((s) => s.song);
      dispatch(setPlayList(songList));
      debouncedPlay();
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
      await fetchRecentlyPlayed();
    } catch (err) {
      console.error("Lỗi khi cập nhật yêu thích:", err);
    }
  };

  const fetchRecentlyPlayed = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getRecentPlayedSongs({ limit: 50 });
      setSongs(response.data || []);
    } catch (err) {
      console.error("Lỗi khi tải danh sách đã nghe gần đây:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Không thể tải danh sách bài hát đã nghe. Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentlyPlayed();
  }, []);

  const handlePlayAll = () => {
    if (songs.length > 0) {
      const songList = songs.map((s) => s.song);
      dispatch(setCurrentSong(songList[0]));
      dispatch(setPlayList(songList));
      debouncedPlay();
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p>Đang tải danh sách đã nghe gần đây...</p>
      </main>
    );
  }

  if (error) {
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
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold">Đã nghe gần đây</h1>
          </div>
          <p className="text-gray-400 text-sm">
            {songs.length > 0
              ? `${songs.length} bài hát`
              : "Chưa có bài hát nào được phát"}
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
        {songs.length === 0 ? (
          <div className="text-center py-16">
            <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Chưa có bài hát nào được phát</p>
            <p className="text-gray-500 text-sm mt-2">
              Bắt đầu nghe nhạc để xem lịch sử ở đây
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {songs.map((song) => (
              <SongCard
                key={song.song.id}
                song={song}
                onClick={handSetCurrentSong}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default RecentlyPlayedPage;


