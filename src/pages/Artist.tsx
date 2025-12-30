import type { FC } from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Pause, Heart, MoreHorizontal, Verified } from "lucide-react";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

import type { Artist } from "@/types/album.type";
import type { Album } from "@/types/album.type";
import { getDetailArtist } from "@/services/Apis/artist.service";
import { formatDuration } from "@/utils/format";
import {
  setCurrentSong,
  setPlayStatus,
  togglePlayStatus,
  setPlayList,
} from "@/stores/slice/song.slice";
import { postFavorite, deleteFavorite } from "@/services/Apis/favourite.service";
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

const ArtistPage: FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const { currentSong } = useMemoizedSelector((state) => state.currentSong);
  const [artist, setArtist] = useState<
    (Artist & { songs: Song[]; albums: Album[] }) | null
  >(null);
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
      if (artist?.songs) {
        dispatch(setPlayList(artist.songs));
      }
      debouncedPlay();
    }
  };

  const handlePlayAll = () => {
    if (artist?.songs && artist.songs.length > 0) {
      dispatch(setCurrentSong(artist.songs[0]));
      dispatch(setPlayList(artist.songs));
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
      if (artistId) {
        const { data } = await getDetailArtist(artistId);
        setArtist(data);
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật yêu thích:", err);
    }
  };

  useEffect(() => {
    if (!artistId) {
      setError("Không tìm thấy ID nghệ sĩ.");
      setIsLoading(false);
      return;
    }

    const fetchArtistDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await getDetailArtist(artistId);
        setArtist(data);
      } catch (err) {
        console.error("Lỗi khi tải nghệ sĩ:", err);
        setError("Không thể tải chi tiết nghệ sĩ. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtistDetail();
  }, [artistId]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p>Đang tải chi tiết nghệ sĩ...</p>
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

  if (!artist) {
    return null;
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-900 to-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Artist Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="relative w-64 h-64 rounded-full overflow-hidden shrink-0">
            <img
              src={artist.avatarUri || "/placeholder.svg"}
              alt={artist.name}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex-1 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-2">
              {artist.isVerified && (
                <Verified className="w-6 h-6 text-blue-500" />
              )}
              <h1 className="text-5xl font-bold">{artist.name}</h1>
            </div>
            <p className="text-gray-400 mb-4">
              {artist.followerCount.toLocaleString()} người theo dõi
            </p>
            {artist.biography && (
              <p className="text-gray-300 mb-6 line-clamp-3">
                {artist.biography}
              </p>
            )}

            <button
              onClick={handlePlayAll}
              className="w-full md:w-auto bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-8 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              PHÁT TẤT CẢ
            </button>
          </div>
        </div>

        {/* Popular Songs */}
        {artist.songs && artist.songs.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Bài hát phổ biến</h2>
            <div className="space-y-2">
              {artist.songs.slice(0, 10).map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  onClick={handSetCurrentSong}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          </div>
        )}

        {/* Albums */}
        {artist.albums && artist.albums.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Albums</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {artist.albums.map((album) => (
                <Link
                  key={album.id}
                  to={`/album/${album.id}`}
                  className="group cursor-pointer"
                >
                  <div className="relative mb-3">
                    <img
                      src={album.coverUri || "/placeholder.svg"}
                      alt={album.title}
                      className="w-full aspect-square object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                    />
                    <button className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4 fill-white text-white" />
                    </button>
                  </div>
                  <h3 className="text-white font-medium truncate">
                    {album.title}
                  </h3>
                  <p className="text-gray-400 text-sm truncate">
                    {album.releaseDate.split("T")[0]}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ArtistPage;

