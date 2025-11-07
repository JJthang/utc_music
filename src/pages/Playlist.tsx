import type { FC } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Play, Heart, MoreHorizontal } from "lucide-react";
import { formatDate, formatDuration } from "@/utils/format";
import { useDispatch } from "react-redux";
import { setCurrentSong, setPlayStatus } from "@/stores/slice/song.slice";
import { useDebouncedCallback } from "use-debounce";
import type { currentSong } from "@/types/song.type";
import { getDetailPlaylist } from "@/services/Apis/listsPlaylist.service.api";
import type { Playlist } from "@/types/playlist.type";

type SongCardType = {
  song: currentSong;
  onClick: (song: currentSong) => void;
};

const SongCard: FC<SongCardType> = ({ song, onClick }) => {
  return (
    <div
      key={song.id}
      onClick={() => onClick(song)}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/60 transition-colors group"
    >
      <input
        type="checkbox"
        className="w-5 h-5 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        aria-label={`Select ${song.title}`}
      />

      <div className="relative w-10 h-10 rounded overflow-hidden shrink-0">
        <img
          src={song.coverUri || "/placeholder.svg"}
          alt={song.title}
          className="object-cover group-hover:hidden"
        />
        <button className="hidden group-hover:flex items-center justify-center w-full h-full bg-black/60 hover:bg-black/80 transition-colors cursor-pointer">
          <Play className="w-4 h-4 fill-white text-white" />
        </button>
      </div>

      <div className="flex-1">
        <p className="text-white font-medium">{song.title}</p>
        {song.artists &&
          song.artists.map((art, idx) => (
            <p
              key={idx}
              className="text-gray-500 text-sm hover:text-purple-400 hover:underline cursor-pointer transition-colors"
            >
              {art.artist.name}
            </p>
          ))}
      </div>

      {/* {song.premium && (
                  <span className="bg-yellow-500 text-white font-bold text-xs px-2 py-1 rounded">
                    PREMIUM
                  </span>
                )} */}

      <span className="text-gray-400 text-sm min-w-12 text-right">
        {formatDuration(song.duration)}
      </span>

      <div className="hidden group-hover:flex items-center gap-2">
        <button className="p-1.5 rounded-full hover:bg-slate-600/60 transition-colors cursor-pointer">
          <Heart className="w-5 h-5 text-white hover:text-purple-400 transition-colors" />
        </button>
        <button className="p-1.5 rounded-full hover:bg-slate-600/60 transition-colors cursor-pointer">
          <MoreHorizontal className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

const PlaylistPage: FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const debouncedPlay = useDebouncedCallback(() => {
    dispatch(setPlayStatus(true));
  }, 500);

  const handSetCurrentSong = (item: currentSong) => {
    dispatch(setCurrentSong(item));
    debouncedPlay();
  };

  useEffect(() => {
    if (!playlistId) {
      setError("Không tìm thấy ID playlist.");
      setIsLoading(false);
      return;
    }

    const fetchPlaylistDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await getDetailPlaylist(playlistId);
        setPlaylist(data);
      } catch (err) {
        console.error("Lỗi khi tải playlist:", err);
        setError("Không thể tải chi tiết playlist. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylistDetail();
  }, [playlistId]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p>Đang tải chi tiết playlist...</p>
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

  if (!playlist) {
    return null;
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-900 to-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Playlist Info */}
        <div className="lg:col-span-1 flex flex-col items-start lg:sticky lg:top-8 lg:h-fit">
          <div className="relative w-full max-w-xs mb-6">
            {/* Playlist Cover */}
            <img
              src={playlist.imageUri || "/placeholder.svg"}
              alt={playlist.title}
              className="object-cover group-hover:hidden"
            />
          </div>

          {/* Playlist Details */}
          <h1 className="text-4xl font-bold mb-2">{playlist.title}</h1>
          <div className="text-gray-400 text-sm space-y-1 mb-6">
            <p>
              <span>{playlist.user.displayName}</span> •{" "}
              {formatDate(playlist.createdAt, "year")}
            </p>
            <p>{playlist.followerCount} người yêu thích</p>
          </div>

          {/* Play Button */}
          <button className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 mb-4 transition-all shadow-lg cursor-pointer">
            <Play className="w-5 h-5 fill-white" />
            PHÁT TẤT CẢ
          </button>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="rounded-full bg-slate-800 hover:bg-slate-700 p-3 transition-colors cursor-pointer">
              <Heart className="w-6 h-6 text-white" />
            </button>
            <button className="rounded-full bg-slate-800 hover:bg-slate-700 p-3 transition-colors cursor-pointer">
              <MoreHorizontal className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Right Side - Track List */}
        <div className="lg:col-span-2 max-h-screen overflow-y-auto">
          <p className="text-sm mb-4">
            <span className="text-gray-400">Mô tả: </span>
            {playlist.description}
          </p>
          <div className="space-y-2 mb-8">
            {playlist.songs?.map((song, idx) => (
              <SongCard
                key={idx}
                song={song}
                onClick={(song: currentSong) => handSetCurrentSong(song)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlaylistPage;
