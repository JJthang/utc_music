import {
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
import { ProgressBar } from "../../common/ProgressBar";
import { VolumeControl } from "./components/VolumeControl";
import { IconButtonWithTooltip } from "./components/IconButtonWithTooltip";
import { SongInfo } from "./components/SongInfo";
import type { PlayerState } from "@/types/song.type";
import { useAppDispatch, useMemoizedSelector } from "@/hooks";
import { toggleSidebar } from "@/stores/slice/sidebar.slice";
import { onHandNextSong, onHandPrevSong, setPlayStatus, togglePlayStatus, toggleShuffle } from "@/stores/slice/song.slice";
import { useDebouncedCallback } from "use-debounce";
import { trackListeningSong } from "@/services/Apis/song.service";

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
    
    // Track cumulative listening time (thời gian nghe thực tế)
    const cumulativeTimeRef = useRef<number>(0);
    const lastUpdateTimeRef = useRef<number>(0);
    const hasTrackedRef = useRef<boolean>(false); // Đánh dấu đã gọi API cho bài hát này chưa
    const trackingIntervalRef = useRef<number | null>(null);

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

        // Reset tracking khi bài hát thay đổi
        cumulativeTimeRef.current = 0;
        lastUpdateTimeRef.current = 0;
        hasTrackedRef.current = false;
        if (trackingIntervalRef.current) {
            clearInterval(trackingIntervalRef.current);
            trackingIntervalRef.current = null;
        }

        // Reset và load bài hát mới
        if (audioRef.current) {
            audioRef.current.load();
        }
    }, [currentSong.id]);

    // Điều khiển audio element và track listening time
    useEffect(() => {
        if (!audioRef.current) return;

        if (state.isPlaying) {
            audioRef.current.play().catch((err) => {
                console.error("Error playing audio:", err);
                dispatch(setPlayStatus(false));
            });
            
            // Bắt đầu track thời gian nghe
            lastUpdateTimeRef.current = Date.now();
            
            // Track mỗi giây để cập nhật thời gian nghe thực tế
            trackingIntervalRef.current = window.setInterval(() => {
                const audio = audioRef.current;
                if (audio && !audio.paused) {
                    const now = Date.now();
                    const elapsed = (now - lastUpdateTimeRef.current) / 1000; // chuyển sang giây
                    cumulativeTimeRef.current += elapsed;
                    lastUpdateTimeRef.current = now;
                    
                    // Kiểm tra nếu đã nghe >= 50% thời lượng và chưa gọi API
                    const halfDuration = currentSong.duration / 2;
                    if (!hasTrackedRef.current && cumulativeTimeRef.current >= halfDuration) {
                        hasTrackedRef.current = true;
                        // Gọi API track listening với thời gian đã nghe (làm tròn xuống giây)
                        trackListeningSong(currentSong.id, Math.floor(cumulativeTimeRef.current))
                            .catch((error) => {
                                console.error("Error tracking listening:", error);
                            });
                    }
                }
            }, 1000); // Update mỗi giây
        } else {
            audioRef.current.pause();
            
            // Khi pause, cập nhật cumulative time từ lần update cuối
            if (lastUpdateTimeRef.current > 0) {
                const now = Date.now();
                const elapsed = (now - lastUpdateTimeRef.current) / 1000;
                cumulativeTimeRef.current += elapsed;
                lastUpdateTimeRef.current = 0; // Reset để tránh double count
            }
            
            // Dừng tracking
            if (trackingIntervalRef.current) {
                clearInterval(trackingIntervalRef.current);
                trackingIntervalRef.current = null;
            }
        }
        
        return () => {
            // Cleanup: cập nhật cumulative time trước khi clear interval
            if (lastUpdateTimeRef.current > 0 && audioRef.current && !audioRef.current.paused) {
                const now = Date.now();
                const elapsed = (now - lastUpdateTimeRef.current) / 1000;
                cumulativeTimeRef.current += elapsed;
            }
            
            if (trackingIntervalRef.current) {
                clearInterval(trackingIntervalRef.current);
                trackingIntervalRef.current = null;
            }
        };
    }, [state.isPlaying, dispatch, currentSong.id, currentSong.duration]);

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
        (_e: Event, value: number | number[]) => {
            const newTime = typeof value === 'number' ? value : value[0];
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

            <div className="sticky bottom-0 z-[100] w-[100vw] bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-t border-blue-700 px-6 pt-3 pb-1">
                <div className="flex items-center gap-6 flex-wrap md:flex-nowrap">
                    <div className="flex w-[300px]" >
                        <SongInfo
                            title={currentSong.title}
                            coverUri={currentSong.coverUri}
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
                                    className="bg-blue-600 hover:bg-blue-500 text-white rounded-full p-2 transition cursor-pointer"
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