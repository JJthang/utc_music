import type { currentSong } from "@/types/song.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  statusSong: boolean;
  currentSong: currentSong;
}

const initialState: CounterState = {
  value: 0,
  statusSong: false,
  currentSong: {
    id: "9e41a740-9670-47fd-b28a-c378406ff67e",
    title: "Em Đừng Đi",
    duration: 252,
    releaseDate: "1970-01-01 00:00:02.016",
    albumId: "acb0845a-1668-4c75-a5f3-136621f5c4f4",
    url: "https://res.cloudinary.com/dxa8ks06k/video/upload/v1761401863/utc-music/songs/apl2ryq4dvi7mewdna1o.mp3",
    coverUri:
      "https://res.cloudinary.com/dxa8ks06k/image/upload/v1761401865/utc-music/covers/ooq49spspsrkgctohf9b.webp",
    views: 0,
    lyrics: "Xin em đừng ra đi, con tim anh vẫn mãi yêu em như ngày nào",
    trackNumber: 1,
  },
};

const currentSong = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    onHandNextSong: () => {},
    onHandPrevSong: () => {},
  },
});

export const { increment, decrement, incrementByAmount } = currentSong.actions;
export default currentSong.reducer;
