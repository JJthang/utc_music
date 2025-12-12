import { type FC } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

import type { Song } from "@/types/song.type";

interface SongCardProps {
  song: Song;
}

export const SongCard: FC<SongCardProps> = ({ song }) => {
  return (
    <Link
      to={`/song/${song.id}`}
      className="shrink-0 w-52 p-3 rounded-xl text-white group hover:bg-gray-500/20 transition-all duration-300 cursor-pointer"
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
