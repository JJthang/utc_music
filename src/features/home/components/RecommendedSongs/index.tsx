import { useEffect, useMemo, useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { getPublicPlaylists } from "@/services/Apis/listsPlaylist.service.api";
import type { Playlist } from "@/types/playlist.type";
import { Link } from "react-router-dom";

// ---------- Card ----------
function PlaylistCard({ item }: { item: Playlist }) {
  const accent = "from-[#5a2a2a] via-[#4a2a2a] to-[#2a2222]";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="relative aspect-[3/1] rounded-lg overflow-hidden bg-linear-to-r text-white shadow-lg group cursor-pointer"
    >
      {/* Lớp nền chính */}
      <Link to={`playlist/${item.id}`}>
        <div className={`absolute inset-0 bg-linear-to-r ${accent}`} />
        <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_80%_20%,transparent,rgba(0,0,0,0.55))]" />

        {/* Hiệu ứng sáng góc trái khi hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_70%)] mix-blend-screen pointer-events-none" />
        </div>

        {/* Nội dung */}
        <div className="relative z-10 flex h-full gap-5 p-3">
          <div className="relative h-full aspect-square shrink-0">
            <img
              src={item.imageUri}
              alt={item.title}
              className="w-full h-full object-cover rounded-xl ring-2 ring-white/5"
            />
            {/* Icon Play hiển thị khi hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
              <Play size={32} fill="white" />
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-start flex-1">
            {item.title ? (
              <span className="w-fit rounded-full mb-4 bg-white/10 px-3 py-1 text-[8px] font-semibold tracking-wide text-white/90 backdrop-blur">
                {item.title.toUpperCase()}
              </span>
            ) : null}
            <h3 className="truncate text-xl font-bold">
              {item.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-white/80">
              {/* {item.artists} */}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function PlaylistCarousel({ items }: { items?: Playlist[] }) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await getPublicPlaylists();
        setPlaylists(data);
      } catch (err) {
        console.error("Lỗi khi tải playlists:", err);
        setError("Không thể tải danh sách playlist công khai.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const sample = useMemo<Playlist[]>(
    () => items ?? playlists,
    [items, playlists]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Đang tải danh sách playlists...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-8">
        <p>Lỗi: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full text-white py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {sample.map((it) => (
          <PlaylistCard key={it.id} item={it} />
        ))}
      </div>
    </div>
  );
}
