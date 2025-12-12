import { useEffect, useState, type FC } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

import type { TopAlbumPersonal } from "@/types/stats.type";
import { getTopAlbumsPersonal } from "@/services/Apis/stats.service";
import type { Album } from "@/types/album.type";
import { HorizontalScrollWrapper } from "@/components/HorizontalCarousel";

interface AlbumRecentCardProps {
  album: Album;
}

const AlbumRecentCard: FC<AlbumRecentCardProps> = ({ album }) => {
  return (
    <Link
      to={`/album/${album.id}`}
      className="relative rounded-xl group hover:bg-gray-500/20 transition-all duration-300 cursor-pointer"
    >
      <div className="w-52 h-full p-3">
        <div className="relative aspect-ratio mb-2 rounded-xl overflow-hidden">
          <img
            src={album.coverUri}
            alt={album.title}
            className="w-full h-full object-cover aspect-square rounded-xl transform transition-transform duration-500 ease-in-out scale-100 group-hover:scale-120"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-xl shadow-lg">
            <Play size={32} fill="white" />
          </div>
        </div>
        <p className="truncate text-gray-200 text-sm md:text-base font-medium">
          {album.title}
        </p>
      </div>
    </Link>
  );
};

const AlbumRecent = () => {
  const [albumRecent, setAlbumRecent] = useState<TopAlbumPersonal[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbumRecent = async () => {
      try {
        const response = await getTopAlbumsPersonal();
        setAlbumRecent(response.data);
      } catch (error) {
        console.error("Error fetching top albums personal:", error);
        setError(
          "Không thể tải danh sách album đã nghe gần đây, vui lòng thử lại sau!"
        );
      } finally {
        setIsFetching(false);
      }
    };

    fetchAlbumRecent();
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
        <h2 className="text-xl font-bold text-white">Top Album của bạn</h2>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 cursor-pointer"
          onClick={() => console.log("refresh suggestions")}
        >
          <ArrowRight size={16} />
          <span>Xem tất cả</span>
        </button>
      </div>

      <HorizontalScrollWrapper>
        {albumRecent?.map((tap, index) => (
          <AlbumRecentCard key={index} album={tap.album} />
        ))}
      </HorizontalScrollWrapper>
    </section>
  );
};

export default AlbumRecent;
