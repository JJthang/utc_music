import type { Song } from "@/types/song.type";
import api from "../http";
import type {
  ApiItemResponse,
  ApiListResponse,
} from "@/types/api-response.type";

const requestUrl = import.meta.env.VITE_API_URL;

export interface Genre {
  id: string;
  name: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const getAllGenres = async (): Promise<ApiListResponse<Genre>> => {
  const genresUrl = `${requestUrl}/api/genres`;
  try {
    const result = await api.get(genresUrl);
    return result.data;
  } catch (error) {
    console.error("Lỗi khi tải danh sách thể loại:", error);
    throw new Error("Không thể tải danh sách thể loại. Vui lòng thử lại");
  }
};

export const getGenreSongs = async (
  id: string,
  page = 1,
  limit = 20
): Promise<ApiListResponse<Song>> => {
  const genreSongsUrl = `${requestUrl}/api/genres/${id}/songs`;
  const result = await api.get(genreSongsUrl, {
    params: { page, limit },
  });
  return result.data;
};


