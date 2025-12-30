import type { FC } from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Heart, MoreHorizontal, Pause } from "lucide-react";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

import { formatDuration } from "@/utils/format";
import {
  setCurrentSong,
  setPlayStatus,
  togglePlayStatus,
  setPlayList,
} from "@/stores/slice/song.slice";
import { postFavorite, deleteFavorite } from "@/services/Apis/favourite.service";
import { getGenreSongs, getAllGenres, type Genre } from "@/services/Apis/genre.service";
import type { Song } from "@/types/song.type";
import { useMemoizedSelector } from "@/hooks";

type SongCardType = {
  song: Song;
  onClick: (song: Song) => void;
  onToggleFavorite: (songId: string, isFavorite: boolean) => void;
};

const SongCard: FC<SongCardType> = ({ song, onClick, onToggleFavorite }) => {
  const { statusSong, currentSong } = useMemoizedSelector(
    (state) => state.currentSong
  );
  const isPlaying = currentSong?.id === song.id && statusSong;
  const isLiked = song.isLiked ?? false;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(song.id, isLiked);
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
                  <span className="text-gray-400 text-sm mx-1">, </span>
                )}
              </span>
            ))}
        </p>
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

const GenrePage: FC = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const { currentSong } = useMemoizedSelector((state) => state.currentSong);
  const [genre, setGenre] = useState<Genre | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
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
      dispatch(setPlayList(songs));
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
      if (genreId) {
        const response = await getGenreSongs(genreId);
        setSongs(response.data || []);
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật yêu thích:", err);
    }
  };

  useEffect(() => {
    if (!genreId) {
      setError("Không tìm thấy ID thể loại.");
      setIsLoading(false);
      return;
    }

    const fetchGenreData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch genre info and songs
        const [genresResponse, songsResponse] = await Promise.all([
          getAllGenres(),
          getGenreSongs(genreId),
        ]);

        const foundGenre = genresResponse.data?.find((g) => g.id === genreId);
        setGenre(foundGenre || null);
        setSongs(songsResponse.data || []);
      } catch (err) {
        console.error("Lỗi khi tải thể loại:", err);
        setError("Không thể tải chi tiết thể loại. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenreData();
  }, [genreId]);

  const handlePlayAll = () => {
    if (songs.length > 0) {
      dispatch(setCurrentSong(songs[0]));
      dispatch(setPlayList(songs));
      debouncedPlay();
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p>Đang tải chi tiết thể loại...</p>
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

  if (!genre) {
    return null;
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-900 to-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{genre.name}</h1>
          {genre.description && (
            <p className="text-gray-400 mb-4">{genre.description}</p>
          )}
          <p className="text-gray-400 text-sm">
            {songs.length > 0 ? `${songs.length} bài hát` : "Chưa có bài hát"}
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
            <p className="text-gray-400 text-lg">Chưa có bài hát trong thể loại này</p>
          </div>
        ) : (
          <div className="space-y-2">
            {songs.map((song) => (
              <SongCard
                key={song.id}
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

export default GenrePage;

