import type { Song } from "./song.type";

export interface Artist {
  id: string;
  name: string;
  biography?: string;
  avatarUri: string;
  country: string;
  followerCount: number;
  isVerified: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AlbumArtist {
  artistId: string;
  albumId: string;
  createdAt: string;
  updatedAt: string;
  artist: Artist;
}

export interface Album {
  id: string;
  title: string;
  releaseDate: string;
  coverUri: string;
  type: AlbumType;
  createdAt: string;
  updatedAt: string;
  songs?: Song[];
  artists: AlbumArtist[];
}

export type AlbumType = "SINGLE" | "ALBUM" | "EP";