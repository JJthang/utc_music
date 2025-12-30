import type { AlbumType } from "./album.type";
import type { Status } from "./auth.type";

export interface Genre {
  id: string;
  name: string;
  description: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

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
  coverUri: string;
  type: AlbumType;
}

export interface SongArtist {
  artistId: string;
  artist: {
    name: string;
    isVerified: boolean;
  };
}

interface SongGenre {
  genreId: string;
  genre: {
    name: string;
    status: Status;
  };
}

export interface Song {
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
  isLiked?: boolean;
}
