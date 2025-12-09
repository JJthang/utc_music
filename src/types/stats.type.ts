import type { Song } from "./song.type";

export interface TopSongs {
  position: number;
  lastPosition: number,
  change: number,
  song: Song
  playCount: number;
}
