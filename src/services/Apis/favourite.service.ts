import api from "../http";
import type { AxiosError } from "axios";
import type { ApiListResponse } from "@/types/api-response.type";
import type { Song } from "@/types/song.type";

interface ErrorResponse {
  success?: boolean;
  error?: string;
  message?: string;
}

interface GetLikedSongsParams {
  page?: number;
  limit?: number;
}

export const postFavorite = async (id: string) => {
  try {
    const result = await api.post(`/api/songs/${id}/like`);
    return result.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const errorMessage =
      axiosError.response?.data?.error ||
      axiosError.response?.data?.message ||
      axiosError.message ||
      "Không thể thêm bài hát vào yêu thích. Vui lòng thử lại";
    
    console.error("Lỗi khi thêm bài hát vào yêu thích:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteFavorite = async (id: string) => {
  try {
    const result = await api.delete(`/api/songs/${id}/unlike`);
    return result.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const errorMessage =
      axiosError.response?.data?.error ||
      axiosError.response?.data?.message ||
      axiosError.message ||
      "Không thể xóa bài hát khỏi yêu thích. Vui lòng thử lại";
    
    console.error("Lỗi khi xóa bài hát khỏi yêu thích:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const getLikedSongs = async (
  params?: GetLikedSongsParams
): Promise<ApiListResponse<Song>> => {
  try {
    const result = await api.get("/api/me/liked-songs", { params });
    return result.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const errorMessage =
      axiosError.response?.data?.error ||
      axiosError.response?.data?.message ||
      axiosError.message ||
      "Không thể tải danh sách bài hát yêu thích. Vui lòng thử lại";
    
    console.error("Lỗi khi tải danh sách bài hát yêu thích:", errorMessage);
    throw new Error(errorMessage);
  }
};
