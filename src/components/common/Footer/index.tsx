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
import { useAppDispatch, useMemoizedSelector } from "@/hooks";
import { toggleSidebar } from "@/stores/slice/sidebar.slice";
import { onHandNextSong, onHandPrevSong, setPlayStatus, togglePlayStatus, toggleShuffle } from "@/stores/slice/song.slice";
import { useDebouncedCallback } from "use-debounce";

const MusicPlayer: FC = () => {
    const dispatch = useAppDispatch();
    const { currentSong, statusSong, shuffle } = useMemoizedSelector((state) => state.currentSong);

    const [state, setState] = useState<PlayerState>({
        isPlaying: statusSong,
        currentTime: 0,
        duration: currentSong.duration,
        volume: 70,
        isFavorite: false,
        repeat: false,
    });

    const audioRef = useRef<HTMLAudioElement>(null);

    const debouncedPlay = useDebouncedCallback(() => {
        dispatch(setPlayStatus(true));
    }, 500);


    // Sync isPlaying với Redux store
    useEffect(() => {
        setState((prev) => ({ ...prev, isPlaying: statusSong }));
    }, [statusSong]);

    // Sync duration khi bài hát thay đổi
    useEffect(() => {
        setState((prev) => ({
            ...prev,
            duration: currentSong.duration,
            currentTime: 0
        }));

        // Reset và load bài hát mới
        if (audioRef.current) {
            audioRef.current.load();
        }
    }, [currentSong.id]);

    // Điều khiển audio element
    useEffect(() => {
        if (!audioRef.current) return;

        if (state.isPlaying) {
            audioRef.current.play().catch((err) => {
                console.error("Error playing audio:", err);
                dispatch(setPlayStatus(false));
            });
        } else {
            audioRef.current.pause();
        }
    }, [state.isPlaying, dispatch]);

    useEffect(() => {
        if (audioRef.current) audioRef.current.loop = state.repeat;
    }, [state.repeat]);

    // Cập nhật currentTime khi audio đang phát
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => {
            setState((prev) => ({
                ...prev,
                currentTime: audio.currentTime
            }));
        };

        const handleEnded = () => {
            if (state.repeat) {
                audio.currentTime = 0;
                audio.play();
            } else {
                dispatch(onHandNextSong());
                debouncedPlay();
            }
        };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [state.repeat, dispatch]);

    // Điều khiển volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = state.volume / 100;
        }
    }, [state.volume]);

    const handleProgressChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const newTime = Number(e.target.value);
            setState((prev) => ({ ...prev, currentTime: newTime }));
            if (audioRef.current) {
                audioRef.current.currentTime = newTime;
            }
        },
        []
    );

    const handleVolumeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, volume: Number(e.target.value) }));
    }, []);

    const togglePlayPause = useCallback(() => {
        dispatch(togglePlayStatus());
    }, [dispatch]);

    const toggleFavorite = useCallback(() => {
        setState((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    }, []);

    const handToggleShuffle = useCallback(() => {
        if (state.repeat) return;
        dispatch(toggleShuffle())
    }, []);

    const toggleRepeat = useCallback(() => {
        setState(prev => ({ ...prev, repeat: !prev.repeat }));
    }, []);

    const handlePrevious = useCallback(() => {
        dispatch(onHandPrevSong());
        debouncedPlay()
    }, [dispatch]);

    const handleNext = useCallback(() => {
        dispatch(onHandNextSong());
        debouncedPlay()
    }, [dispatch]);

    // Lấy tên nghệ sĩ từ currentSong
    const artistNames = useMemo(() => {
        return currentSong.artists?.map((a) => a.artist.name).join(", ");
    }, [currentSong.artists]);

    return (
        <>
            {/* Hidden audio element */}
            <audio ref={audioRef} preload="auto">
                <source src={currentSong.url} type="audio/mpeg" />
            </audio>

            <div className="fixed bottom-0 z-[100] w-[100vw] bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-t border-purple-700 px-6 pt-3 pb-1">
                <div className="flex items-center gap-6 flex-wrap md:flex-nowrap">
                    <div className="flex w-[300px]" >
                        <SongInfo
                            title={currentSong.title}
                            artist={artistNames}
                        />
                        <div className="flex items-center gap-2 hidden md:flex">
                            <IconButtonWithTooltip
                                icon={Heart}
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
                    </div>

                    {/* Playback Controls */}
                    <div className="flex-1">
                        <div className="flex flex-col items-center gap-1">
                            <div className="flex items-center justify-center gap-3 w-full">
                                <IconButtonWithTooltip
                                    icon={Shuffle}
                                    onClick={handToggleShuffle}
                                    tooltip="Shuffle"
                                    isActive={shuffle}
                                    ariaLabel={`Shuffle ${shuffle ? "on" : "off"}`}
                                />
                                <button
                                    onClick={handlePrevious}
                                    aria-label="Previous track"
                                    title="Previous"
                                    className="text-gray-400 hover:text-white transition cursor-pointer"
                                >
                                    <SkipBack size={20} />
                                </button>
                                <button
                                    onClick={togglePlayPause}
                                    aria-label={state.isPlaying ? "Pause" : "Play"}
                                    title={state.isPlaying ? "Pause" : "Play"}
                                    className="bg-purple-600 hover:bg-purple-500 text-white rounded-full p-2 transition cursor-pointer"
                                >
                                    {state.isPlaying ? (
                                        <Pause size={24} fill="white" />
                                    ) : (
                                        <Play size={24} fill="white" />
                                    )}
                                </button>
                                <button
                                    onClick={handleNext}
                                    aria-label="Next track"
                                    title="Next"
                                    className="text-gray-400 hover:text-white transition cursor-pointer"
                                >
                                    <SkipForward size={20} />
                                </button>
                                <IconButtonWithTooltip
                                    icon={Repeat}
                                    onClick={toggleRepeat}
                                    tooltip={`Repeat: ${state.repeat ? "on" : "off"}`}
                                    isActive={state.repeat}
                                    ariaLabel={`Repeat ${state.repeat ? "on" : "off"}`}
                                />
                            </div>

                            {/* Progress Bar */}
                            <ProgressBar
                                currentTime={state.currentTime}
                                duration={state.duration}
                                onChange={handleProgressChange}
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
        </>
    );
};

export default MusicPlayer;