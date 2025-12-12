import type { FC } from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Play, Heart, MoreHorizontal } from "lucide-react";
import type { Song } from "@/types/song.type";
import { getDetailSong } from "@/services/Apis/song.service";
import {
  formatDuration,
  formatNumber,
  formatReleaseDate,
} from "@/utils/format";
import { useDispatch } from "react-redux";
import { setCurrentSong, setPlayStatus } from "@/stores/slice/song.slice";
import { useDebouncedCallback } from "use-debounce";

type SongCardType = {
  song: Song;
  onClick: (song: Song) => void;
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
        <p className="flex items-center">
          {song.artists &&
            song.artists.map((art, idx) => (
              <span key={idx} className="flex items-center">
                <Link
                  to={`/artist/${art.artistId}`}
                  className="text-gray-400 text-sm hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  {art.artist.name}
                </Link>

                {idx < song.artists.length - 1 && (
                  <span className="text-gray-500">,&nbsp;</span>
                )}
              </span>
            ))}
        </p>
      </div>
      <span className="text-gray-400 text-sm min-w-12 text-right">
        {formatDuration(song.duration)}
      </span>

      <div className="hidden group-hover:flex items-center gap-2">
        <button className="p-1.5 rounded-full hover:bg-slate-600/60 transition-colors cursor-pointer">
          <Heart className="w-5 h-5 text-white hover:text-blue-400 transition-colors" />
        </button>
        <button className="p-1.5 rounded-full hover:bg-slate-600/60 transition-colors cursor-pointer">
          <MoreHorizontal className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export const SongPage: FC = () => {
  const { songId } = useParams<{ songId: string }>();

  const [song, setSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const debouncedPlay = useDebouncedCallback(() => {
    dispatch(setPlayStatus(true));
  }, 500);

  const handSetCurrentSong = (item: Song) => {
    dispatch(setCurrentSong(item));
    debouncedPlay();
  };

  useEffect(() => {
    if (!songId) {
      setError("Không tìm thấy ID song.");
      setIsLoading(false);
      return;
    }

    const fetchSongDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await getDetailSong(songId);
        setSong(data);
      } catch (err) {
        console.error("Lỗi khi tải song:", err);
        setError("Không thể tải chi tiết song. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongDetail();
  }, [songId]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p>Đang tải chi tiết song...</p>
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

  if (!song) {
    return null;
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-900 to-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Song Info */}
        <div className="lg:col-span-1 flex flex-col items-start lg:sticky lg:top-8 lg:h-fit">
          <div className="relative w-74 mb-6">
            {/* Song Cover */}
            <img
              src={song.coverUri || "/placeholder.svg"}
              alt={song.title}
              className="w-full object-cover group-hover:hidden"
            />
          </div>

          {/* Song Details */}
          <h1 className="text-4xl font-bold mb-2">{song.title}</h1>
          <div className="text-gray-400 text-sm space-y-1 mb-6">
            <p className="flex items-baseline gap-1">
              <span>
                {song.artists &&
                  song.artists.map((art) => art.artist.name).join(", ")}
              </span>
              • {formatReleaseDate(song.releaseDate)}
            </p>
            <p>{formatNumber(song.views)} lượt nghe</p>
          </div>
        </div>

        {/* Right Side - Track List */}
        <div className="lg:col-span-2 max-h-screen overflow-y-auto">
          <div className="space-y-2 mb-8">
            <SongCard
              song={song}
              onClick={(song: Song) => handSetCurrentSong(song)}
            />
          </div>

          {/* Song Info Section */}
          <div className="p-6">
            <h2 className="text-white font-bold mb-4">Thông Tin</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-400">Ngày phát hành</p>
                <p className="text-white font-medium">
                  {formatReleaseDate(song.releaseDate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
