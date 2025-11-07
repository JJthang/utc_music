export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isFavorite: boolean;
  repeat: boolean;
}

interface SongAlbum {
  title: string;
}

interface SongArtist {
  artistId: string;
  artist: {
    name: string;
  };
}

interface SongGenre {
  genreId: string;
  genre: {
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
  lyrics?: string;
  trackNumber: number;
  album: SongAlbum;
  artists: SongArtist[];
  genres: SongGenre[];
}
