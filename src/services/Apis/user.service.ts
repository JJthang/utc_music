import api from "../http";
import type {
  ApiItemResponse,
  ApiListResponse,
} from "@/types/api-response.type";
import type { Playlist } from "@/types/playlist.type";
import type { Song } from "@/types/song.type";

const requestUrl = import.meta.env.VITE_API_URL;

export interface User {
  id: string;
  userName: string;
  email: string;
  displayName?: string;
  avatarUri?: string;
  role: string;
  status: string;
  isPremium: boolean;
  premiumUntil?: string;
  createdAt: string;
  updatedAt: string;
}

export const getCurrentUser = async (): Promise<ApiItemResponse<User>> => {
  const userUrl = `${requestUrl}/api/me`;
  const result = await api.get(userUrl);
  return result.data;
};

export const updateUserProfile = async (
  data: FormData
): Promise<ApiItemResponse<User>> => {
  const userUrl = `${requestUrl}/api/me`;
  const result = await api.put(userUrl, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result.data;
};

export const deleteUserAvatar = async (): Promise<void> => {
  const avatarUrl = `${requestUrl}/api/me/avatar`;
  await api.delete(avatarUrl);
};

export const getUserPlaylists = async (
  page = 1,
  limit = 20
): Promise<ApiListResponse<Playlist>> => {
  const playlistsUrl = `${requestUrl}/api/me/playlists`;
  const result = await api.get(playlistsUrl, {
    params: { page, limit },
  });
  return result.data;
};

export const getLikedSongs = async (
  page = 1,
  limit = 20
): Promise<ApiListResponse<Song>> => {
  const likedSongsUrl = `${requestUrl}/api/me/liked-songs`;
  const result = await api.get(likedSongsUrl, {
    params: { page, limit },
  });
  return result.data;
};

