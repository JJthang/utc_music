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

export interface SongDetails {
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

export interface Album {
  id: string;
  title: string;
  releaseDate: string;
  coverUri: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  songs: SongDetails[];
  artists: AlbumArtistAssociation[];
}