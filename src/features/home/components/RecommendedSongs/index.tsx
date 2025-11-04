import React, { useMemo, useRef } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

// ---------- Types ----------
export type PlaylistItem = {
    id: string;
    title: string;
    subtitle?: string;
    artists: string;
    coverUrl: string;
    accent?: string;
};

// ---------- Card ----------
function PlaylistCard({ item }: { item: PlaylistItem }) {
    const accent = item.accent ?? "from-[#5a2a2a] via-[#4a2a2a] to-[#2a2222]";

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="relative w-[520px] h-[168px] shrink-0 rounded-lg overflow-hidden bg-gradient-to-r text-white shadow-lg group cursor-pointer"
        >
            {/* Lớp nền chính */}
            <div className={`absolute inset-0 bg-gradient-to-r ${accent}`} />
            <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_80%_20%,transparent,rgba(0,0,0,0.55))]" />

            {/* Hiệu ứng sáng góc trái khi hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_70%)] mix-blend-screen pointer-events-none" />
            </div>

            {/* Nội dung */}
            <div className="relative z-10 flex h-full gap-5 p-3">
                <div className="relative">
                    <img
                        src={item.coverUrl}
                        alt={item.title}
                        className="h-full w-auto bg-cover rounded-xl object-cover ring-2 ring-white/5"
                    />

                    {/* Icon Play hiển thị khi hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                        <Play size={32} fill="white" />
                    </div>
                </div>

                <div className="flex min-w-0 flex-col justify-start">
                    {item.subtitle ? (
                        <span className="w-fit rounded-full mb-4 bg-white/10 px-3 py-1 text-[8px] font-semibold tracking-wide text-white/90 backdrop-blur">
                            {item.subtitle.toUpperCase()}
                        </span>
                    ) : null}
                    <h3 className="truncate text-xl font-bold">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-white/80">{item.artists}</p>
                </div>
            </div>
        </motion.div>
    );
}



export function PlaylistCarousel({ items }: { items?: PlaylistItem[] }) {
    const scrollerRef = useRef<HTMLDivElement>(null);

    const sample = useMemo<PlaylistItem[]>(
        () =>
            items ?? [
                {
                    id: "1",
                    title: "V‑Pop Đầy Hứa Hẹn",
                    subtitle: "Có thể bạn thích",
                    artists: "Muộii, Miina, CAPTAIN BOY, Đậu Tất Đạt",
                    coverUrl:
                        "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/0/b/3/f/0b3f2554b7525588e1fb3f7b386379fd.jpg",
                    accent: "from-[#322326] via-[#2a2226] to-[#1f1b1e]",
                },
                {
                    id: "2",
                    title: "Đóa Hồng Nhạc Việt",
                    subtitle: "Có thể bạn thích",
                    artists: "Hòa Minzy, Văn Mai Hương, Bích Phương, Orange, MIN",
                    coverUrl:
                        "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/f/6/6/c/f66caae222acc84c85c6b1d3e2253aad.jpg",
                    accent: "from-[#5a2a2a] via-[#4a2a2a] to-[#2a2222]",
                },
                {
                    id: "3",
                    title: "Kết Hợp Gây Nghiện",
                    subtitle: "Có thể bạn thích",
                    artists: "(S)TRONG, Rhymastic, NICKY, JSOL, ANH TRAI \"SAY HI\"",
                    coverUrl:
                        "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/9/1/5/2/915259ad89bf3158550b4279a89e4b22.jpg",
                    accent: "from-[#4b1e1e] via-[#3a1b1b] to-[#1a1515]",
                },
            ],
        [items]
    );
    return (
        <div className="w-full text-white py-4">
            <div className="relative">
                <div
                    ref={scrollerRef}
                    className="flex gap-6 pb-2 pt-1"
                >
                    {sample.map((it) => (
                        <PlaylistCard key={it.id} item={it} />)
                    )}
                </div>
            </div>
        </div>
    );
}