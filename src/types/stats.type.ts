import type { Album, Artist } from "./album.type";
import type { Genre, Song } from "./song.type";

export interface ArtistMonthlyListenersStats {
    artistId: string
    monthlyListeners: number
    totalPlays: number
    period: string
}

export interface TrendingSong {
  rank: number;
  song: Song;
  playsThisWeek: number;
}

export interface TopSongChart {
  position: number;
  lastPosition: number;
  change: number;
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
