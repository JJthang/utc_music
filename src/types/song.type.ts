export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isFavorite: boolean;
  repeat: boolean;
}

interface SongArtist {
  songId: string;
  artistId: string;
  createdAt: string;
  updatedAt: string;
  artist: {
    name: string;
  };
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
  artists: SongArtist[];
}
