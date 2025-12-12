import type { FC } from "react";
import { Link } from "react-router-dom";
import { UserRoundPlus } from "lucide-react";

import type { Artist } from "@/types/album.type";
import { formatNumber } from "@/utils/format";

interface ArtistProfileCardProps {
  artist: Artist;
}

export const ArtistProfileCard: FC<ArtistProfileCardProps> = ({ artist }) => {
  const artistName = artist.name;
  const artistFollowers = `${formatNumber(
    artist.followerCount
  )} người theo dõi`;
  const profileImageUrl =
    artist.avatarUri || "https://i.imgur.com/your-image-url.jpg";

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
        to={`/artist/${artist.id}`}
        className="text-xl font-bold text-white hover:text-blue-400 transition duration-200"
      >
        {artistName}
      </Link>
      <p className="text-gray-400 font-medium text-sm mb-3">
        {artistFollowers}
      </p>

      <button className="flex items-center justify-center gap-1 px-6 py-2 rounded-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition duration-300 cursor-pointer">
        <UserRoundPlus className="size-4" />
        <span className="text-white text-sm font-medium">Theo dõi</span>
      </button>
    </div>
  );
};
