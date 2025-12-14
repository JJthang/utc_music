import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import { SongCard } from "./SongCard";

import type { TrendingSong } from "@/types/stats.type";
import { getTrendingSongs } from "@/services/Apis/stats.service";
import { HorizontalScrollWrapper } from "@/components/common/HorizontalCarousel";

const TrendingSongs = () => {
  const [trendingSongs, setTrendingSongs] = useState<TrendingSong[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingSongs = async () => {
      try {
        const response = await getTrendingSongs();
        setTrendingSongs(response.data);
      } catch (error) {
        console.error("Error fetching recent plays:", error);
        setError(
          "Không thể tải danh sách bài hát thịnh hành, vui lòng thử lại sau!"
        );
      } finally {
        setIsFetching(false);
      }
    };

    fetchTrendingSongs();
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
        <h2 className="text-xl font-bold text-white">Tuần qua có gì hot ?</h2>
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
        {trendingSongs.map((trd, index) => (
          <SongCard key={index} song={trd.song} />
        ))}
      </HorizontalScrollWrapper>
    </section>
  );
};

export default TrendingSongs;
