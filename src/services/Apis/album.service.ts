import type { Album } from "@/types/album.type";
import api from "../http";
import type {
  ApiItemResponse,
  ApiListResponse,
} from "@/types/api-response.type";

export const getAllAlbums = async (): Promise<ApiListResponse<Album>> => {
  const albumsUrl = `${import.meta.env.VITE_API_URL}/api/albums`;
  try {
    const result = await api.get(albumsUrl);
    return result.data;
  } catch (error) {
    console.error("Lỗi khi tải danh sách album:", error);
    throw new Error("Không thể tải danh sách album. Vui lòng thử lại");
  }
};

export const getDetailAlbum = async (
  id: string
): Promise<ApiItemResponse<Album>> => {
  const albumUrl = `${import.meta.env.VITE_API_URL}/api/albums/${id}`;
  const result = await api.get(albumUrl);

  return result.data;
};
