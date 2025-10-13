import { Slider, Box, Typography } from "@mui/material";
import type { FC } from "react";

interface ProgressBarProps {
    currentTime: number;
    duration: number;
    onChange: (e: Event, value: number | number[]) => void;
}

const getProgressPercentage = (currentTime: number, duration: number): number => {
    if (duration === 0) return 0;
    return (currentTime / duration) * 100;
};

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
};

export const ProgressBar: FC<ProgressBarProps> = ({
    currentTime,
    duration,
    onChange,
}) => {
    const percentage = getProgressPercentage(currentTime, duration);
    console.log('percentage : ', percentage);


    return (
        <Box display="flex" alignItems="center" gap={1} width="100%">
            {/* Thời gian hiện tại */}
            <Typography variant="caption" color="white" minWidth="fit-content">
                {formatTime(currentTime)}
            </Typography>

            {/* Thanh tiến trình */}
            <Slider
                min={0}
                max={duration}
                value={currentTime}
                onChange={onChange}
                aria-label="Progress"
                sx={{
                    color: "transparent",
                    flex: 1,
                    height: 4,
                    "& .MuiSlider-track": {
                        background: "linear-gradient(to right, #a855f7, #7e22ce)",
                        border: "none",
                    },
                    "& .MuiSlider-rail": {
                        backgroundColor: "#374151",
                        opacity: 1,
                    },
                    "& .MuiSlider-thumb": {
                        width: 10,
                        height: 10,
                        backgroundColor: "#a855f7",
                    },
                }}
            />

            {/* Tổng thời lượng */}
            <Typography variant="caption" color="white" minWidth="fit-content">
                {formatTime(duration)}
            </Typography>
        </Box>
    );
};
