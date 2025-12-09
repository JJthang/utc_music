import type { Song } from "./song.type";

export interface UserPlaylist {
  displayName: string;
}

export interface Playlist {
  id: string;
  userId: string;
  title: string;
  imageUri: string;
  description: string;
  followerCount: number;
  isPublic: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  user: UserPlaylist;
  songs: Song[];
}

