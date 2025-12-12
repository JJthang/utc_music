import type { FC } from "react";
import { useSelector } from "react-redux";

import {
  RecentPlay,
  AlbumRecent,
  DiscoverySongs,
  MyTopArtists,
  TrendingSongs,
  MyTopSongs,
  TopSongsByViews,
} from "./components";

import type { RootState } from "@/stores";

const FeatureHomePage: FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div>
      {/* <PlaylistCarousel /> */}
      {/* <Banner /> */}
      {/* <SuggestedSongs /> */}

      <>
        {user && (
          <div className="bg-linear-to-b from-[#2a2222] to-outlet rounded-xl">
            <MyTopSongs />
            <RecentPlay />
          </div>
        )}
        <TrendingSongs />
        <TopSongsByViews />
        {user && (
          <div>
            <MyTopArtists />
            <AlbumRecent />
            <DiscoverySongs />
          </div>
        )}
      </>
    </div>
  );
};

export default FeatureHomePage;
