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
}
