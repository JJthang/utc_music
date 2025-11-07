import type {
  ApiItemResponse,
  ApiListResponse,
} from "@/types/api-response.type";
import api from "../http";
import type { Playlist } from "@/types/playlist.type";

export const getPublicPlaylists = async (): Promise<
  ApiListResponse<Playlist>
> => {
  const playlistsUrl = `${import.meta.env.VITE_API_URL}/api/playlists`;
  try {
    const result = await api.get(playlistsUrl);
    return result.data;
  } catch (error) {
    console.error("Lỗi khi tải danh sách playlist:", error);
    throw new Error("Không thể tải danh sách playlist. Vui lòng thử lại");
  }
};

export const getDetailPlaylist = async (
  id: string
): Promise<ApiItemResponse<Playlist>> => {
  const url = `${import.meta.env.VITE_API_URL}/api/playlists/${id}`;
  const result = await api.get(url);

  return result.data;
};
