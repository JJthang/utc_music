export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isFavorite: boolean;
  shuffle: boolean;
  repeat: 0 | 1 | 2;
}

export interface currentSong {
  id: string;
  title: string;
  duration: number;
  releaseDate: string;
  albumId: string;
  url: string;
  coverUri: string;
  views: number;
  lyrics: string;
  trackNumber: number;
}
