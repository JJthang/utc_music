/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { RotateCw, Sparkles } from "lucide-react";
import type { Song } from "@/types/song.type";
import { getListSongs } from "@/services/Apis/listsSong.service.api";

function Cover({ url, title }: { url?: string; title: string }) {
  const initials = title
    .split(" ")
    .slice(0, 2)
    .map((t) => t[0])
    .join("")
    .toUpperCase();

  return (
    <div className="h-14 w-14 flex items-center justify-center rounded-lg bg-linear-to-br from-zinc-700 to-zinc-900 text-zinc-200 shrink-0 overflow-hidden">
      {url ? (
        <img src={url} alt={title} className="h-full w-full object-cover" />
      ) : (
        <span className="text-sm tracking-widest">{initials}</span>
      )}
    </div>
  );
}

// function Badge({ children }: { children: React.ReactNode }) {
//   return (
//     <span className="ml-2 inline-flex items-center rounded-md border border-zinc-600/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300/90">
//       {children}
//     </span>
//   );
// }

function SongRow({ song }: { song: Song }) {
  return (
    <button
      className="group w-full rounded-xl px-2 py-2 text-left hover:bg-zinc-800/60 focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
      type="button"
    >
      <div className="flex items-center gap-3">
        <Cover url={song.coverUri} title={song.title} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate font-medium text-zinc-100">{song.title}</p>
            {/* {song.premium && <Badge>Premium</Badge>} */}
            {/* {song.badge && <Badge>{song.badge}</Badge>} */}
          </div>
          <p className="mt-0.5 truncate text-sm text-zinc-400">
            {song.artists?.map((art) => art.artist.name).join(", ")}
          </p>
        </div>
        <Sparkles
          className="opacity-0 transition-opacity group-hover:opacity-100"
          size={16}
        />
      </div>
    </button>
  );
}

export function SuggestedSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await getListSongs({ limit: 9 });
        setSongs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (isLoading) {
    return <p>Đang tải danh sách</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Lỗi: {error}</p>;
  }

  return (
    <section className="w-full mt-8 rounded-2xl p-4 sm:p-6 shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-100">Gợi Ý Bài Hát</h2>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
          onClick={() => console.log("refresh suggestions")}
        >
          <RotateCw size={16} />
          <span>Làm mới</span>
        </button>
      </div>

      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 md:gap-3">
        {songs?.map((song, idx) => (
          <SongRow key={idx} song={song} />
        ))}
      </div>
    </section>
  );
}
