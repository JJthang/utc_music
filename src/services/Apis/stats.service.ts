import { requestUrl } from "@/constants";
import api from "../http";
import type {
  ApiListResponse,
} from "@/types/api-response.type";
import type { TopSongs } from "@/types/stats.type";

interface StatsQueryParams {
  limit?: number;
  period?: "week" | "month" | "all" 
}

export const getChartTopSongs = async (
  params?: StatsQueryParams
): Promise<ApiListResponse<TopSongs>> => {
  const albumsUrl = `${requestUrl}/stats/charts/top-songs`;
  const result = await api.get(albumsUrl, { params });
  return result.data;
};
