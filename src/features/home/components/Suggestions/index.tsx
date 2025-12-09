/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { RotateCw, Sparkles } from "lucide-react";
import type { Song } from "@/types/song.type";
import { getListSongs } from "@/services/Apis/song.service";
import { useDispatch } from "react-redux";
import { setCurrentSong, setPlayList, setPlayStatus } from "@/stores/slice/song.slice";
import { useDebouncedCallback } from "use-debounce";
import { Link } from "react-router-dom";

export function Cover({ url, title }: { url?: string; title: string }) {
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

function SongRow({ song, onClick }: { song: Song, onClick: (song: Song) => void }) {
  return (
    <button
      className="group w-full cursor-pointer rounded-xl px-2 py-2 text-left hover:bg-zinc-800/60 focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
      type="button"
      onClick={() => onClick(song)}
    >
      <Link to={`song/${song.id}`}>
        <div className="flex items-center gap-3">
          <Cover url={song.coverUri} title={song.title} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate font-medium text-zinc-100">{song.title}</p>
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
      </Link>
    </button>
  );
}

export function SuggestedSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const debouncedPlay = useDebouncedCallback(() => {
    dispatch(setPlayStatus(true));
  }, 500);

  const handSetCurrentSong = (item: Song) => {
    dispatch(setCurrentSong(item))
    debouncedPlay()
  }

  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await getListSongs({ limit: 40 });
        const playlist = data.sort((a, b) => b.views - a.views).slice(0, 12);
        const sliceData = data.slice(0, 9);
        if (!localStorage.getItem('playList')) {
          localStorage.setItem('playList', JSON.stringify(playlist));
        }
        dispatch(setPlayList(playlist))
        setSongs(sliceData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [dispatch]);

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
          <SongRow key={idx} song={song} onClick={(song: Song) => handSetCurrentSong(song)} />
        ))}
      </div>
    </section>
  );
}
