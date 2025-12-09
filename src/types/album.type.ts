import type { Song } from "./song.type";

export interface ArtistDetails {
  id: string;
  name: string;
  biography?: string;
  avatarUri: string;
  country: string;
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
  artist: ArtistDetails;
}

export interface Album {
  id: string;
  title: string;
  releaseDate: string;
  coverUri: string;
  type: AlbumType;
  createdAt: string;
  updatedAt: string;
  songs: Song[];
  artists: AlbumArtist[];
}

export type AlbumType = "SINGLE" | "ALBUM" | "EP";