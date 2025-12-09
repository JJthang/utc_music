import { requestUrl } from "@/constants";
import api from "../http";
import type { ApiItemResponse, ApiListResponse } from "@/types/api-response.type";
import type { currentSong } from "@/types/song.type";

interface SongQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

export const getListSongs = async (
  params?: SongQueryParams
): Promise<ApiListResponse<currentSong>> => {
  const albumsUrl = `${requestUrl}/songs`;
  try {
    const result = await api.get(albumsUrl, { params });
    return result.data;
  } catch (error) {
    console.error("Lỗi khi tải danh sách bài hát:", error);
    throw new Error("Không thể tải danh sách bài hát. Vui lòng thử lại");
  }
};

export const getDetailSong = async (
  id: string
): Promise<ApiItemResponse<currentSong>> => {
  const albumUrl = `${requestUrl}/songs/${id}`;
  const result = await api.get(albumUrl);

  return result.data;
};
