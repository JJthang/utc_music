import type { Album } from "@/types/album.type";
import axios from "axios";

type AlbumData = {
  data: { data: Album[] };
};

export const getAllAlbums = async (): Promise<AlbumData[]> => {
  const albumsUrl = `${import.meta.env.VITE_API_URL}/api/albums`;
  try {
    const result = await axios.get<AlbumData[]>(albumsUrl);
    return result.data;
  } catch (error) {
    console.error("Lỗi khi tải danh sách album:", error);
    throw new Error(
      "Không thể tải danh sách album. Vui lòng thử lại"
    );
  }
};

export const getDetailAlbum = async (id: string): Promise<Album> => {
  const albumUrl = `${import.meta.env.VITE_API_URL}/api/albums/${id}`;
  const result = await axios.get<Album>(albumUrl);

  return result.data;
};
