import { requestUrl } from "@/constants";
import api from "../http";
import type {
  ApiItemResponse,
  ApiListResponse,
} from "@/types/api-response.type";
import type {
  ArtistMonthlyListenersStats,
  DiscoveryStats,
  SongRecentPlay,
  StatsPeriod,
  TopAlbumPersonal,
  TopArtistPersonal,
  TopGenrePersonal,
  TopSongChart,
  TopSongPersonal,
  TrendingSong,
} from "@/types/stats.type";
import type { Song } from "@/types/song.type";

interface StatsQueryParams {
  limit?: number;
  period?: StatsPeriod;
}

const publicStatsUrl = `${requestUrl}/stats`;
const personalStatsUrl = `${requestUrl}/stats/me`;

// ================================================================================
// stats for public
// ================================================================================
export const getTopSongsByViews = async (): Promise<ApiListResponse<Song>> => {
  const url = `${publicStatsUrl}/top-50/songs/by-views`;
  const result = await api.get(url);
  return result.data;
};

export const getTopSongsByGenre = async (
  genreId: string
): Promise<ApiListResponse<Song>> => {
  const url = `${publicStatsUrl}/top-50/songs/by-genre/${genreId}`;
  const result = await api.get(url);
  return result.data;
};

export const getArtistMonthlyListeners = async (
  artistId: string
): Promise<ApiItemResponse<ArtistMonthlyListenersStats>> => {
  const url = `${publicStatsUrl}/artists/${artistId}/monthly-listeners`;
  const result = await api.get(url);
  return result.data;
};

export const getTrendingSongs = async ({
  limit = 50,
}: {
  limit?: number;
} = {}): Promise<ApiListResponse<TrendingSong>> => {
  const url = `${publicStatsUrl}/songs/trending`;
  const result = await api.get(url, { params: { limit } });
  return result.data;
};

export const getChartTopSongs = async ({
  limit = 50,
  period = "week",
}: {
  limit?: number;
  period?: "week" | "month" | "all";
}): Promise<ApiListResponse<TopSongChart>> => {
  const url = `${publicStatsUrl}/charts/top-songs`;
  const result = await api.get(url, { params: { limit, period } });
  return result.data;
};

// ================================================================================
// stats for personal user
// ================================================================================
export const getTopSongsPersonal = async ({
  limit = 10,
  period = "month",
}: StatsQueryParams = {}): Promise<ApiListResponse<TopSongPersonal>> => {
  const url = `${personalStatsUrl}/top-songs`;
  const result = await api.get(url, { params: { limit, period } });
  return result.data;
};

export const getTopArtistsPersonal = async ({
  limit = 10,
  period = "month",
}: StatsQueryParams = {}): Promise<ApiListResponse<TopArtistPersonal>> => {
  const url = `${personalStatsUrl}/top-artists`;
  const result = await api.get(url, { params: { limit, period } });
  return result.data;
};

export const getTopGenresPersonal = async ({
  limit = 5,
  period = "month",
}: StatsQueryParams = {}): Promise<ApiListResponse<TopGenrePersonal>> => {
  const url = `${personalStatsUrl}/top-genres`;
  const result = await api.get(url, { params: { limit, period } });
  return result.data;
};

export const getTopAlbumsPersonal = async ({
  limit = 10,
  period = "month",
}: StatsQueryParams = {}): Promise<ApiListResponse<TopAlbumPersonal>> => {
  const url = `${personalStatsUrl}/top-albums`;
  const result = await api.get(url, { params: { limit, period } });
  return result.data;
};

export const getRecentPlayedSongs = async ({
  limit = 20,
}: {
  limit?: number;
} = {}): Promise<ApiListResponse<SongRecentPlay>> => {
  const url = `${personalStatsUrl}/recently-played`;
  const result = await api.get(url, { params: { limit } });
  return result.data;
};

export const getDiscoverySongs = async ({
  period = "week",
}: {
  period?: "week" | "month";
} = {}): Promise<ApiItemResponse<DiscoveryStats>> => {
  const url = `${personalStatsUrl}/discovery`;
  const result = await api.get(url, { params: { period } });
  return result.data;
};
