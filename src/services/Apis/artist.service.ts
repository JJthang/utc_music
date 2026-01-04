import type { Artist } from "@/types/album.type";
import type { Album } from "@/types/album.type";
import type { Song } from "@/types/song.type";
import api from "../http";
import type {
  ApiItemResponse,
  ApiListResponse,
} from "@/types/api-response.type";

const requestUrl = import.meta.env.VITE_API_URL;

export const getAllArtists = async (): Promise<ApiListResponse<Artist>> => {
  const artistsUrl = `${requestUrl}/api/artists`;
  try {
    const result = await api.get(artistsUrl);
    return result.data;
  } catch (error) {
    console.error("Lỗi khi tải danh sách nghệ sĩ:", error);
    throw new Error("Không thể tải danh sách nghệ sĩ. Vui lòng thử lại");
  }
};

export const getDetailArtist = async (
  id: string
): Promise<ApiItemResponse<Artist & { songs: Song[]; albums: Album[] }>> => {
  const artistUrl = `${requestUrl}/api/artists/${id}`;
  const result = await api.get(artistUrl);
  return result.data;
};

export const getArtistSongs = async (
  id: string,
  page = 1,
  limit = 20
): Promise<ApiListResponse<Song>> => {
  const artistSongsUrl = `${requestUrl}/api/artists/${id}/songs`;
  const result = await api.get(artistSongsUrl, {
    params: { page, limit },
  });
  return result.data;
};

export const getArtistAlbums = async (
  id: string,
  page = 1,
  limit = 20
): Promise<ApiListResponse<Album>> => {
  const artistAlbumsUrl = `${requestUrl}/api/artists/${id}/albums`;
  const result = await api.get(artistAlbumsUrl, {
    params: { page, limit },
  });
  return result.data;
};



