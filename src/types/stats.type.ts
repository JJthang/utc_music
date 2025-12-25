import type { Album, Artist } from "./album.type";
import type { Genre, Song } from "./song.type";

export interface ArtistMonthlyListenersStats {
  artistId: string;
  monthlyListeners: number;
  totalPlays: number;
  period: string;
}

export type AlbumFeatured = Album & {
  totalViews: number;
};

export interface ArtistPopular {
  artist: Artist;
  playCount: number;
}

export interface TrendingSong {
  rank: number;
  song: Song;
  playsThisWeek: number;
}

export interface TopSongChart {
  rank: number;
  previousRank: number | null;
  rankDiff: number | null;
  trend: "up" | "down" | "same" | "new";
  isNewEntry: boolean;
  song: Song;
  playCount: number;
}

export interface TopSongPersonal {
  song: Song;
  playCount: number;
  totalDuration: number;
}

export interface TopArtistPersonal {
  artist: Artist;
  playCount: number;
  totalDuration: number;
}

export interface TopGenrePersonal {
  genre: Genre;
  playCount: number;
  totalDuration: number;
}

export interface TopAlbumPersonal {
  album: Album;
  playCount: number;
  totalDuration: number;
  uniqueSongsPlayed: number;
}

export interface SongRecentPlay {
  id: string;
  userId: string;
  songId: string;
  playedAt: string;
  duration: number;
  completionRate: number;
  song: Song;
}

export interface DiscoveryStats {
  period: "week" | "month";
  totalNewSongs: number;
  newSongs: Song[];
}

export type StatsPeriod = "week" | "month" | "year" | "all";
