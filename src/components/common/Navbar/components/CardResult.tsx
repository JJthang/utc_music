import type { FC } from "react";
import { Link } from "react-router-dom";

import { Cover } from "@/features/home/components";

import { capitalizeFirst } from "@/utils/format";
import type { AlbumArtist } from "@/types/album.type";
import type { SongArtist } from "@/types/song.type";

interface CardResultProps {
  title: string;
  coverUri: string;
  redirectUrl: string;
  artists?: SongArtist[] | AlbumArtist[];
  type?: string;
}

export const CardResult: FC<CardResultProps> = ({
  title,
  coverUri,
  redirectUrl,
  artists,
  type,
}) => {
  return (
    <button className="group w-full cursor-pointer rounded-xl px-2 py-2 text-left hover:bg-[#475569] focus:outline-none focus:ring-2 focus:ring-zinc-500/50">
      <Link to={redirectUrl}>
        <div className="flex items-center gap-3">
          <Cover url={coverUri} title={title} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-semibold text-white">
                {title}
              </p>
            </div>
            <p className="mt-0.5 truncate text-sm text-zinc-400">
              {type && <span>{capitalizeFirst(type)} - </span>}
              {artists?.map((art) => art.artist.name).join(", ")}
            </p>
          </div>
        </div>
      </Link>
    </button>
  );
};
