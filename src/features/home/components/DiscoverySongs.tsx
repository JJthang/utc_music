import { useEffect, useState } from "react";
import { type FC } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

import type { Song } from "@/types/song.type";

import type { DiscoveryStats } from "@/types/stats.type";
import { getDiscoverySongs } from "@/services/Apis/stats.service";

interface SongCardProps {
  song: Song;
}

export const SongCard: FC<SongCardProps> = ({ song }) => {
  return (
    <Link
      to={`/song/${song.id}`}
      className="shrink-0 w-full p-3 rounded-xl text-white group hover:bg-gray-500/20 transition-all duration-300 cursor-pointer"
    >
      <div className="relative w-full aspect-square mb-2">
        <img
          src={song.coverUri}
          alt={song.title}
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
        />
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-xl shadow-lg"
        >
          <Play size={32} fill="white" />
        </div>
      </div>

      <p className="truncate text-gray-200 text-sm md:text-base font-medium">
        {song.title}
      </p>

      <p className="flex items-center">
        {song.artists?.map((art, idx) => (
          <span key={idx} className="flex items-center">
            <Link
              to={`/artist/${art.artistId}`}
              className="text-gray-400 text-sm hover:text-white hover:underline transition-colors"
            >
              {art.artist.name}
            </Link>
            {idx < song.artists.length - 1 && <span>,&nbsp;</span>}
          </span>
        ))}
      </p>
    </Link>
  );
};


const DiscoverySongs = () => {
  const [discoverySongs, setDiscoverySongs] = useState<
    DiscoveryStats | undefined
  >(undefined);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscoverySongs = async () => {
      try {
        const response = await getDiscoverySongs();
        setDiscoverySongs(response.data);
      } catch (error) {
        console.error("Error fetching discovery songs:", error);
        setError(
          "Không thể tải danh sách bài hát khám phá, vui lòng thử lại sau!"
        );
      } finally {
        setIsFetching(false);
      }
    };

    fetchDiscoverySongs();
  }, []);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 p-6">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="w-full p-2 sm:p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          Tiếp tục khám phá những giai điệu
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {discoverySongs?.newSongs.map((song, index) => (
          <SongCard key={index} song={song} />
        ))}
      </div>
    </section>
  );
};

export default DiscoverySongs;
