import type { currentSong } from "./song.type";

export interface UserPlaylist {
  id: string;
  displayName: string;
}

export interface Playlist {
  id: string;
  userId: string;
  title: string;
  imageUri: string;
  followerCount: number;
  isPublic: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  user: UserPlaylist;
  songs: currentSong[];
}
