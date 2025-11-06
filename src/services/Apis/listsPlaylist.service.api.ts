import type { Pagination } from "@/types/pagination";
import type { Playlist } from "@/types/playlist.type";
import axios from "axios";

type PlaylistData = {
  data: Playlist[];
  pagination: Pagination;
};

export const getPublicPlaylists = async (): Promise<PlaylistData> => {
  const playlistsUrl = `${import.meta.env.VITE_API_URL}/api/playlists`;
  try {
    const result = await axios.get(playlistsUrl);
    return result.data;
  } catch (error) {
    console.error("Lỗi khi tải danh sách playlist:", error);
    throw new Error("Không thể tải danh sách playlist. Vui lòng thử lại");
  }
};

export const getDetailPlaylist = async (id: string): Promise<Playlist> => {
  const url = `${import.meta.env.VITE_API_URL}/api/playlists/${id}`;
  const result = await axios.get<Playlist>(url);

  return result.data;
};
