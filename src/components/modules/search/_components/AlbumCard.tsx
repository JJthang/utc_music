import type { FC } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

import type { Album } from "@/types/album.type";

interface AlbumCardProps {
  album: Album;
}

export const AlbumCard: FC<AlbumCardProps> = ({ album }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="relative aspect-3/1 rounded-lg overflow-hidden bg-linear-to-r text-white shadow-lg group cursor-pointer"
    >
      <Link to={`/album/${album.id}`}>
        <div
          className={`absolute inset-0 bg-linear-to-r from-[#5a2a2a] via-[#4a2a2a] to-[#2a2222]`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_80%_20%,transparent,rgba(0,0,0,0.55))]" />

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_70%)] mix-blend-screen pointer-events-none" />
        </div>

        <div className="relative z-10 flex h-full gap-5 p-3">
          <div className="relative h-full aspect-square shrink-0">
            <img
              src={album.coverUri}
              alt={album.title}
              className="w-full h-full object-cover rounded-xl ring-2 ring-white/5"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
              <Play size={32} fill="white" />
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-start flex-1">
            {album.title ? (
              <span className="w-fit rounded-full mb-4 bg-white/10 px-3 py-1 text-[8px] font-semibold tracking-wide text-white/90 backdrop-blur">
                {album.type}
              </span>
            ) : null}
            <h3 className="truncate text-xl font-bold">{album.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-white/80">
              {album.artists.map((art) => art.artist.name).join(", ")}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
