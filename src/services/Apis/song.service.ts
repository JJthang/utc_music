import { requestUrl } from "@/constants";
import api from "../http";
import type {
  ApiItemResponse,
  ApiListResponse,
} from "@/types/api-response.type";
import type { Song } from "@/types/song.type";

interface SongQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

interface SongTrackResponse {
  views: number;
  completionRate: number;
}

const songsUrl = `${requestUrl}/songs`;

export const getListSongs = async (
  params?: SongQueryParams
): Promise<ApiListResponse<Song>> => {
  
  try {
    const result = await api.get(songsUrl, { params });
    return result.data;
  } catch (error) {
    console.error("Lỗi khi tải danh sách bài hát:", error);
    throw new Error("Không thể tải danh sách bài hát. Vui lòng thử lại");
  }
};

export const getDetailSong = async (
  id: string
): Promise<ApiItemResponse<Song>> => {
  const result = await api.get(`${songsUrl}/${id}`);

  return result.data;
};

export const trackListeningSong = async (
  id: string,
  duration: number
): Promise<ApiItemResponse<SongTrackResponse>> => {
  const songTrackUrl = `${songsUrl}/${id}/track`;
  const result = await api.post(songTrackUrl, {
    duration,
  });

  return result.data;
};
