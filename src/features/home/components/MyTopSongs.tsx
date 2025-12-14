import { Fragment, useEffect, useState, type FC } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

import type { Song } from "@/types/song.type";
import type { TopSongPersonal } from "@/types/stats.type";
import { getTopSongsPersonal } from "@/services/Apis/stats.service";

interface SongCardProps {
  song: Song;
}

const MyTopSongCard: FC<SongCardProps> = ({ song }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="relative aspect-4/1 rounded-lg overflow-hidden bg-linear-to-r text-white shadow-lg group cursor-pointer"
    >
      <Link to={`/song/${song.id}`}>
        <div
          className={`absolute inset-0 bg-linear-to-r from-[#5a2a2a] via-[#4a2a2a] to-[#2a2222]`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_80%_20%,transparent,rgba(0,0,0,0.55))]" />

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_70%)] mix-blend-screen pointer-events-none" />
        </div>

        <div className="relative z-10 flex items-center h-full gap-4">
          <div className="relative h-full aspect-square shrink-0">
            <img
              src={song.coverUri}
              alt={song.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
              <Play size={32} fill="white" />
            </div>
          </div>
          <div className="w-full pr-1">
            <p className="line-clamp-2 text-gray-200 text-sm md:text-base font-medium">
              {song.title}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const MyTopSongs = () => {
  const [myTopSongs, setMyTopSongs] = useState<TopSongPersonal[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyTopSongs = async () => {
      try {
        const response = await getTopSongsPersonal({
          limit: 8,
          period: "month",
        });
        setMyTopSongs(response.data);
      } catch (error) {
        console.error("Error fetching my top songs:", error);
        setError(
          "Không thể tải danh sách bài hát yêu thích của bạn, vui lòng thử lại sau!"
        );
      } finally {
        setIsFetching(false);
      }
    };

    fetchMyTopSongs();
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
    <Fragment>
      {myTopSongs.length === 0 ? null : (
        <section className="w-full p-2 sm:p-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {myTopSongs?.map((topSong, index) => (
              <MyTopSongCard key={index} song={topSong.song} />
            ))}
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default MyTopSongs;
