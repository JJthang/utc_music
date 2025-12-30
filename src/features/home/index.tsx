import { Fragment, type FC } from "react";
import { useSelector } from "react-redux";

import {
  RecentPlay,
  AlbumRecent,
  DiscoverySongs,
  MyTopArtists,
  TrendingSongs,
  MyTopSongs,
  TopSongsByViews,
  NewReleaseSongs,
  FeaturedAlbum,
  PopularArtists,
} from "./components";

import type { RootState } from "@/stores";

const FeatureHomePage: FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div>
      {/* <PlaylistCarousel /> */}
      {/* <Banner /> */}
      {/* <SuggestedSongs /> */}

      {user ? (
        <Fragment>
          <div className="bg-linear-to-b from-[#2a2222] to-outlet rounded-xl">
            <MyTopSongs />
            <RecentPlay />
          </div>
          <MyTopArtists />
          <AlbumRecent />
          <DiscoverySongs />
        </Fragment>
      ) : (
        <Fragment>
          <TrendingSongs />
          <NewReleaseSongs />
          <TopSongsByViews />
          <PopularArtists />
          <FeaturedAlbum />
        </Fragment>
      )}
    </div>
  );
};

export default FeatureHomePage;
