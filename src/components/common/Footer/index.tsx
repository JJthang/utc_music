import React, {
    useState,
    useCallback,
    useMemo,
    useRef,
    useEffect,
    type ChangeEvent,
    type FC,
} from "react";
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Repeat,
    Shuffle,
    Heart,
    MoreVertical,
} from "lucide-react";
import { ProgressBar } from "../../ProgressBar";
import { VolumeControl } from "./components/VolumeControl";
import { IconButtonWithTooltip } from "./components/IconButtonWithTooltip";
import { SongInfo } from "./components/SongInfo";
import type { PlayerState } from "@/types/song.type";
import { useAppDispatch } from "@/hooks";
import { toggleSidebar } from "@/stores/slice/sidebar.slice";

type RepeatMode = (typeof REPEAT_MODES)[number];

const SONG_INFO = {
    title: "Kho Báu (with Rhymastic)",
    artist: "(S)TRONG, Rhymastic",
} as const;

const REPEAT_MODES = ["off", "all", "one"] as const;

const INITIAL_STATE: PlayerState = {
    isPlaying: false,
    currentTime: 49,
    duration: 218,
    volume: 70,
    isFavorite: false,
    shuffle: false,
    repeat: 0,
};


const MusicPlayer: FC = () => {
    const [state, setState] = useState<PlayerState>(INITIAL_STATE);
    const prevStateRef = useRef<PlayerState>(state);
    const dispatch = useAppDispatch();

    const handleProgressChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            {
                setState((prev) => ({ ...prev, currentTime: Number(e.target.value) }));
            }
        },
        []
    );

    const handleVolumeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, volume: Number(e.target.value) }));
    }, []);

    const togglePlayPause = useCallback(() => {
        setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
    }, []);

    const toggleFavorite = useCallback(() => {
        setState((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    }, []);

    const toggleShuffle = useCallback(() => {
        setState((prev) => ({ ...prev, shuffle: !prev.shuffle }));
    }, []);

    const toggleRepeat = useCallback(() => {
        setState((prev) => ({
            ...prev,
            repeat: ((prev.repeat + 1) % 3) as 0 | 1 | 2,
        }));
    }, []);

    // ============ MEMOIZED VALUES ============
    const repeatModeLabel = useMemo<RepeatMode>(
        () => REPEAT_MODES[state.repeat],
        [state.repeat]
    );

    useEffect(() => {
        prevStateRef.current = state;
    }, [state]);

    return (
        <div className="fixed bottom-0 z-[100] w-[100vw] bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-t border-purple-700 px-6 pt-3 pb-1">
            <div className="flex items-center gap-6 flex-wrap md:flex-nowrap">
                {/* Song Info */}
                <SongInfo title={SONG_INFO.title} artist={SONG_INFO.artist} />

                {/* Control Buttons */}
                <div className="flex items-center gap-2 hidden md:flex">
                    <IconButtonWithTooltip
                        icon={state.isFavorite ? Heart : Heart}
                        onClick={toggleFavorite}
                        tooltip={state.isFavorite ? "Remove favorite" : "Add favorite"}
                        isActive={state.isFavorite}
                        ariaLabel={
                            state.isFavorite ? "Remove from favorites" : "Add to favorites"
                        }
                    />
                    <button
                        aria-label="More options"
                        title="More options"
                        className="text-gray-400 hover:text-white transition p-2"
                    >
                        <MoreVertical size={18} />
                    </button>
                </div>

                {/* Playback Controls */}
                <div className="flex-1">
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center justify-center gap-3 w-full ">
                            <IconButtonWithTooltip
                                icon={Shuffle}
                                onClick={toggleShuffle}
                                tooltip="Shuffle"
                                isActive={state.shuffle}
                                ariaLabel={`Shuffle ${state.shuffle ? "on" : "off"}`}
                            />
                            <button
                                aria-label="Previous track"
                                title="Previous"
                                className="text-gray-400 hover:text-white transition"
                            >
                                <SkipBack size={20} />
                            </button>
                            <button
                                onClick={togglePlayPause}
                                aria-label={state.isPlaying ? "Pause" : "Play"}
                                title={state.isPlaying ? "Pause" : "Play"}
                                className="bg-purple-600 hover:bg-purple-500 text-white rounded-full p-2 transition"
                            >
                                {state.isPlaying ? (
                                    <Pause size={24} fill="white" />
                                ) : (
                                    <Play size={24} fill="white" />
                                )}
                            </button>
                            <button
                                aria-label="Next track"
                                title="Next"
                                className="text-gray-400 hover:text-white transition"
                            >
                                <SkipForward size={20} />
                            </button>
                            <IconButtonWithTooltip
                                icon={Repeat}
                                onClick={toggleRepeat}
                                tooltip={`Repeat: ${repeatModeLabel}`}
                                isActive={state.repeat > 0}
                                ariaLabel={`Repeat ${repeatModeLabel}`}
                            />
                        </div>

                        {/* Progress Bar */}
                        <ProgressBar
                            currentTime={state.currentTime}
                            duration={state.duration}
                            onChange={() => {
                                console.log('HEHEE');
                            }}
                        />
                    </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-3 ml-4 hidden lg:flex">
                    <button
                        aria-label="Queue"
                        title="Queue"
                        className="text-gray-400 hover:text-white transition cursor-pointer"
                        onClick={() => dispatch(toggleSidebar())}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                    </button>
                    <VolumeControl volume={state.volume} onChange={handleVolumeChange} />
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
