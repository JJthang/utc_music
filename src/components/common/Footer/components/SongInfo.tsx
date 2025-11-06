import type { FC } from "react";

interface SongInfoProps {
    title: string;
    artist: string;
}


export const SongInfo: FC<SongInfoProps> = ({ title, artist }) => (
    <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            🎵
        </div>
        <div className="flex flex-col overflow-hidden">
            <p className="text-white font-semibold text-sm truncate">{title}</p>
            <p className="text-gray-400 text-xs truncate">{artist}</p>
        </div>
    </div>
);