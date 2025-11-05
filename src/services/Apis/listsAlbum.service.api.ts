import type { AlbumData } from "@/types/album.type";
import axios from "axios";

export const getListsAlbum = async () => {
  const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/albums`);

  return result;
};

export const getDetailAlbum = async (id: string): Promise<AlbumData> => {
  const albumUrl = `${import.meta.env.VITE_API_URL}/api/albums/${id}`;
console.log(albumUrl)
  const result = await axios.get<AlbumData>(albumUrl);

  return result.data;
};
