import { Slider, Box, Typography } from "@mui/material";
import type { FC } from "react";

interface ProgressBarProps {
    currentTime: number;
    duration: number;
    onChange: (e: Event, value: number | number[]) => void;
}

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
                        background: "var(--gradient-purple)",
                        border: "none",
                    },
                    "& .MuiSlider-rail": {
                        backgroundColor: "var(--color-gray-700)",
                        opacity: 1,
                    },
                    "& .MuiSlider-thumb": {
                        width: 10,
                        height: 10,
                        backgroundColor: "var(--color-purple)",
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
