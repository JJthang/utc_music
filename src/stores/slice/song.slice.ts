import type { Song } from "@/types/song.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  statusSong: boolean;
  currentSong: Song;
  shuffle: boolean;
  playList: Song[] | [];
}

const savedState = localStorage.getItem("currentSong");

const initialState: CounterState = {
  value: 0,
  statusSong: false,
  playList: [],
  shuffle: false,
  currentSong: savedState!
    ? JSON.parse(savedState)
    : {
        id: "f745ffea-9b73-4d67-b3fb-a5423cee1058",
        title: "Badtrip",
        duration: 159,
        releaseDate: "2023-03-02T00:00:00.000Z",
        albumId: "9cfad2a2-d7f0-43b8-a370-2a30e00407f0",
        url: "https://res.cloudinary.com/dxa8ks06k/video/upload/v1762443808/Music_BE/songs/wdziu58dhzkikcjdekty.mp3",
        coverUri:
          "https://res.cloudinary.com/dxa8ks06k/image/upload/v1762443810/Music_BE/covers/hkeemkusyqb36oe9ijwz.jpg",
        views: 978721,
        lyrics: "...",
        trackNumber: 4,
        artists: [
          {
            songId: "f745ffea-9b73-4d67-b3fb-a5423cee1058",
            artistId: "aa1c8270-2239-4ec2-b5d7-842b4a48d1c7",
            createdAt: "2025-11-06T15:43:31.121Z",
            updatedAt: "2025-11-06T15:43:31.121Z",
            artist: {
              name: "Obito",
            },
          },
          {
            songId: "f745ffea-9b73-4d67-b3fb-a5423cee1058",
            artistId: "11bf7984-fdbd-4d8b-a56b-1ad7dd9b1002",
            createdAt: "2025-11-06T15:43:31.133Z",
            updatedAt: "2025-11-06T15:43:31.133Z",
            artist: {
              name: "MCK",
            },
          },
        ],
      },
};

const saveToLocalStorage = (state: Song) => {
  localStorage.setItem("currentSong", JSON.stringify(state));
};

const currentSongSlice = createSlice({
  name: "currentSong",
  initialState,
  reducers: {
    // Đặt bài hát hiện tại
    setCurrentSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
      state.statusSong = false;
      saveToLocalStorage(state.currentSong);
    },

    // Toggle play/pause
    togglePlayStatus: (state) => {
      state.statusSong = !state.statusSong;
    },

    // Đặt trạng thái phát
    setPlayStatus: (state, action: PayloadAction<boolean>) => {
      state.statusSong = action.payload;
    },

    setPlayList: (state, action: PayloadAction<Song[]>) => {
      state.playList = action.payload;
    },

    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },

    // Xử lý next song (có thể thêm logic playlist sau)
    onHandNextSong: (state) => {
      const list = state.playList;
      if (!list || list.length === 0) return;

      const curIdx = list.findIndex((s) => s.id === state.currentSong?.id);

      let nextIdx: number;

      if (state.shuffle) {
        // Nếu chỉ có 1 bài thì giữ nguyên, nếu nhiều bài thì random khác bài hiện tại
        if (list.length === 1) {
          nextIdx = curIdx === -1 ? 0 : curIdx;
        } else {
          do {
            nextIdx = Math.floor(Math.random() * list.length);
          } while (nextIdx === curIdx); // đảm bảo khác bài hiện tại
        }
      } else {
        // bình thường: next tuần tự, vòng về 0
        nextIdx = curIdx === -1 ? 0 : (curIdx + 1) % list.length;
      }

      state.currentSong = list[nextIdx];
      state.statusSong = false; // để component chủ động play lại
      saveToLocalStorage(state.currentSong);
    },

    // Xử lý previous song
    onHandPrevSong: (state) => {
      const list = state.playList;
      if (!list || list.length === 0) return;

      const curIdx = list.findIndex((s) => s.id === state.currentSong?.id);

      // Nếu đang ở bài đầu hoặc chưa xác định vị trí -> không lùi
      if (curIdx <= 0) return;

      const prevIdx = curIdx - 1;

      state.currentSong = list[prevIdx];
      state.statusSong = false;
      saveToLocalStorage(state.currentSong);
    },

    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const {
  setCurrentSong,
  togglePlayStatus,
  setPlayStatus,
  onHandNextSong,
  onHandPrevSong,
  increment,
  decrement,
  incrementByAmount,
  setPlayList,
  toggleShuffle,
} = currentSongSlice.actions;

export default currentSongSlice.reducer;
