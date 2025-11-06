import axios from "axios";
import type { Pagination } from "@/types/pagination";
import type { Song } from "@/types/song.type";

interface SongData {
  data: Song[];
  pagination: Pagination;
}

interface SongQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

export const getListSongs = async (
  params?: SongQueryParams
): Promise<SongData> => {
  const albumsUrl = `${import.meta.env.VITE_API_URL}/api/songs`;
  try {
    const result = await axios.get(albumsUrl, { params });
    return result.data;
  } catch (error) {
    console.error("Lỗi khi tải danh sách bài hát:", error);
    throw new Error("Không thể tải danh sách bài hát. Vui lòng thử lại");
  }
};
