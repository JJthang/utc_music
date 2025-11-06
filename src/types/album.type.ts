import type { currentSong } from "./song.type";

export interface ArtistDetails {
  id: string;
  name: string;
  biography: string;
  avatarUri: string;
  country: string;
  isVerified: boolean;
  status: string;
}

export interface AlbumArtistAssociation {
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
  description: string;
  createdAt: string;
  updatedAt: string;
  songs: currentSong[];
  artists: AlbumArtistAssociation[];
}