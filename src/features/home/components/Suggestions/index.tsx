import React from "react";
import { RotateCw, Sparkles } from "lucide-react";

type Song = {
    title: string;
    artists: string;
    cover?: string;
    premium?: boolean;
    note?: string;
    badge?: string;
    img?: string;
};

const songs: Song[] = [
    { title: "TRÀN BỘ NHỚ (feat. Dương Domic)", artists: 'ANH TRAI "SAY HI", Dương Domic', premium: true, cover: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/1/8/6/6/1866eb947d6abe90c2f5ae8b6fb1dbca.jpg" },
    { title: "Bi Ngan / 彼岸（影视剧《苍蘭訣》插曲）", artists: "Tỉnh Lung / 井胧, Tình Địch / 井迪", cover: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/b/8/3/e/b83eb80b6856bf07674af2b34c9fb23c.jpg" },
    { title: "Bật Tình Yêu Lên", artists: "Tăng Duy Tân, Hòa Minzy", cover: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/e/1/a/3/e1a3da34498503ef64fdb5819b45174b.jpg" },
    { title: "Kịch Hay / 好戏", artists: "Vương Tình Vân / 王靖雯", cover: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/b/8/3/e/b83eb80b6856bf07674af2b34c9fb23c.jpg" },
    { title: "Hôn Lễ Của Anh", artists: "Tuệ Ny", cover: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/1/8/6/6/1866eb947d6abe90c2f5ae8b6fb1dbca.jpg" },
    { title: "Tam Bái Hồng Trần Lương / 三拜红尘凉", artists: "鱼是没有心的魂, 比那茄子", cover: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/b/8/3/e/b83eb80b6856bf07674af2b34c9fb23c.jpg" },
    { title: "Chưa Quên Người Yêu Cũ", artists: "Hà Nhi", premium: true, cover: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/1/8/6/6/1866eb947d6abe90c2f5ae8b6fb1dbca.jpg" },
    { title: "No Doubt", artists: "ENHYPEN", cover: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/b/8/3/e/b83eb80b6856bf07674af2b34c9fb23c.jpg" },
    { title: "Xuân Bát Vân / 春不晚 (粗恩版)", artists: "Vãn Nhàn Thính Thư / 闻人听書_", cover: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/1/8/6/6/1866eb947d6abe90c2f5ae8b6fb1dbca.jpg" },
];

function Cover({ url, title }: { url?: string; title: string }) {
    const initials = title
        .split(" ")
        .slice(0, 2)
        .map((t) => t[0])
        .join("")
        .toUpperCase();

    return (
        <div className="h-14 w-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-900 text-zinc-200 shrink-0 overflow-hidden">
            {url ? (
                <img src={url} alt={title} className="h-full w-full object-cover" />
            ) : (
                <span className="text-sm tracking-widest">{initials}</span>
            )}
        </div>
    );
}

function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span className="ml-2 inline-flex items-center rounded-md border border-zinc-600/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300/90">
            {children}
        </span>
    );
}

function SongRow({ song }: { song: Song }) {
    return (
        <button
            className="group w-full rounded-xl px-2 py-2 text-left hover:bg-zinc-800/60 focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
            type="button"
        >
            <div className="flex items-center gap-3">
                <Cover url={song.cover} title={song.title} />
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <p className="truncate font-medium text-zinc-100">{song.title}</p>
                        {song.premium && <Badge>Premium</Badge>}
                        {song.badge && <Badge>{song.badge}</Badge>}
                    </div>
                    <p className="mt-0.5 truncate text-sm text-zinc-400">{song.artists}</p>
                </div>
                <Sparkles className="opacity-0 transition-opacity group-hover:opacity-100" size={16} />
            </div>
        </button>
    );
}

export function SuggestedSongs() {
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
                {songs.map((song, idx) => (
                    <SongRow key={idx} song={song} />
                ))}
            </div>
        </section>
    );
}