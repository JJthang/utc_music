import { Volume2 } from "lucide-react";
import type { ChangeEvent, FC } from "react";

interface VolumeControlProps {
    volume: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const VolumeControl: FC<VolumeControlProps> = ({ volume, onChange }) => (
    <div className="flex items-center gap-2">
        <Volume2 size={18} className="text-gray-400" />
        <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={onChange}
            className="w-24 h-1 bg-gray-700 rounded accent-purple-500 cursor-pointer"
            aria-label="Volume"
        />
    </div>
);