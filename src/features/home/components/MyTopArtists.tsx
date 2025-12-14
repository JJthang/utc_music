import { Fragment, useEffect, useState } from "react";

import { ArtistProfileCard } from "@/components/common/ArtistProfileCard";

import type { TopArtistPersonal } from "@/types/stats.type";
import { getTopArtistsPersonal } from "@/services/Apis/stats.service";
import { HorizontalScrollWrapper } from "@/components/common/HorizontalCarousel";
import { ArrowRight } from "lucide-react";

const MyTopArtists = () => {
  const [myTopArtists, setMyTopArtists] = useState<TopArtistPersonal[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyTopArtists = async () => {
      try {
        const response = await getTopArtistsPersonal();
        setMyTopArtists(response.data);
      } catch (error) {
        console.error("Error fetching top artists personal:", error);
        setError(
          "Không thể tải danh sách nghệ sĩ yêu thích của bạn, vui lòng thử lại sau!"
        );
      } finally {
        setIsFetching(false);
      }
    };

    fetchMyTopArtists();
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
      {myTopArtists.length === 0 ? null : (
        <section className="w-full p-2 sm:p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Nghệ sĩ bạn nghe nhiều nhất
            </h2>
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
            {myTopArtists.map((ta, index) => (
              <ArtistProfileCard key={index} artist={ta.artist} />
            ))}
          </HorizontalScrollWrapper>
        </section>
      )}
    </Fragment>
  );
};

export default MyTopArtists;
