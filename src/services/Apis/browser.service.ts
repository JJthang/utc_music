import { requestUrl } from "@/constants";
import api from "../http";
import type { ApiItemResponse, ApiMeta } from "@/types/api-response.type";
import type { Album, Artist } from "@/types/album.type";
import type { Song } from "@/types/song.type";

interface searchQuery {
  q: string;
}

export interface BrowseResponse {
  songs: Song[];
  albums: Album[];
  artists: Artist[];
}

interface ApiBrowseResponse extends ApiItemResponse<BrowseResponse> {
  meta: ApiMeta & {
    totalSongs: number;
    totalArtists: number;
    totalAlbums: number;
  };
}

export const browseAllData = async (
  params: searchQuery
): Promise<ApiBrowseResponse> => {
  const result = await api.get(`${requestUrl}/search`, {
    params,
  });

  return result.data;
};
