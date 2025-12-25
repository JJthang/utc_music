import { Fragment, useEffect, useState} from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { HorizontalScrollWrapper } from "@/components/common/HorizontalCarousel";

import type { ArtistPopular } from "@/types/stats.type";
import { getPopularArtists } from "@/services/Apis/stats.service";
import { formatNumber } from "@/utils/format";

export const ArtistProfileCard = ({ pa }: {pa: ArtistPopular}) => {
  const artistName = pa.artist.name;
  const artistFollowers = `${formatNumber(
    pa.playCount
  )} người nghe hàng tháng`;
  const profileImageUrl =
    pa.artist.avatarUri || "https://i.imgur.com/your-image-url.jpg";

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden group">
        <img
          src={profileImageUrl}
          alt={`Ảnh đại diện của ${artistName}`}
          className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out scale-100 group-hover:scale-120"
        />
      </div>

      <Link
        to={`/artist/${pa.artist.id}`}
        className="text-xl font-bold text-white hover:text-blue-400 transition duration-200"
      >
        {artistName}
      </Link>
      <p className="text-gray-400 font-medium text-sm mb-3">
        {artistFollowers}
      </p>

    </div>
  );
};


const PopularArtists = () => {
  const [popularArtists, setPopularArtists] = useState<ArtistPopular[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularArtists = async () => {
      try {
        const response = await getPopularArtists();
        setPopularArtists(response.data);
      } catch (error) {
        console.error("Error fetching:", error);
        setError(
          "Không thể tải danh sách ngôi sao đang lên, vui lòng thử lại sau!"
        );
      } finally {
        setIsFetching(false);
      }
    };

    fetchPopularArtists();
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
      {popularArtists.length === 0 ? null : (
        <section className="w-full p-2 sm:p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Ngôi sao đang lên
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
            {popularArtists.map((pa, index) => (
              <ArtistProfileCard key={index} pa={pa} />
            ))}
          </HorizontalScrollWrapper>
        </section>
      )}
    </Fragment>
  );
};

export default PopularArtists;
