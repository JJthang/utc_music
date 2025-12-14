import type { FC } from "react";
import { Link } from "react-router-dom";
import { Heart, MoreHorizontal, Play } from "lucide-react";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

import { setCurrentSong, setPlayStatus } from "@/stores/slice/song.slice";
import type { Song } from "@/types/song.type";
import { formatDuration } from "@/utils/format";

interface SongCardProps {
  song: Song;
}

export const SongCard: FC<SongCardProps> = ({ song }) => {
  const dispatch = useDispatch();

  const debouncedPlay = useDebouncedCallback(() => {
    dispatch(setPlayStatus(true));
  }, 500);

  const handSetCurrentSong = (item: Song) => {
    dispatch(setCurrentSong(item));
    debouncedPlay();
  };
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/60 transition-colors group">
      <div className="relative w-10 h-10 rounded overflow-hidden shrink-0">
        <img
          src={song.coverUri || "/placeholder.svg"}
          alt={song.title}
          className="object-cover group-hover:hidden"
        />
        <div
          onClick={() => handSetCurrentSong(song)}
          className="hidden group-hover:flex items-center justify-center w-full h-full bg-black/60 hover:bg-black/80 transition-colors cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white text-white" />
        </div>
      </div>

      <div className="flex-1">
        <Link
          to={`/song/${song.id}`}
          className="text-white text-sm font-medium hover:text-blue-400 transition-colors"
        >
          {song.title}
        </Link>
        {song.artists &&
          song.artists.map((art, idx) => (
            <p
              key={idx}
              className="text-gray-500 text-xs hover:text-blue-400 hover:underline cursor-pointer transition-colors"
            >
              {art.artist.name}
            </p>
          ))}
      </div>
      <span className="text-gray-400 text-sm min-w-12 text-right">
        {formatDuration(song.duration)}
      </span>

      <div className="hidden group-hover:flex items-center gap-2">
        <button className="p-1.5 rounded-full hover:bg-slate-600/60 transition-colors cursor-pointer">
          <Heart className="w-5 h-5 text-white hover:text-blue-400 transition-colors" />
        </button>
        <button className="p-1.5 rounded-full hover:bg-slate-600/60 transition-colors cursor-pointer">
          <MoreHorizontal className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};
