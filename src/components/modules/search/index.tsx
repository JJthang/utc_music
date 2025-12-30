import { useEffect, useState, type FC } from "react";

import { SongCard } from "./_components/SongCard";
import { AlbumCard } from "./_components/AlbumCard";
import { ArtistProfileCard } from "../../common/ArtistProfileCard";

import {
  browseAllData,
  type BrowseResponse,
} from "@/services/Apis/browser.service";

interface SearchResultProps {
  q: string;
}

const SearchResult: FC<SearchResultProps> = ({ q }) => {
  const [listResult, setListResult] = useState<BrowseResponse>({
    songs: [],
    albums: [],
    artists: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchSearch = async (query: string) => {
    if (!query.trim()) {
      setListResult({
        songs: [],
        albums: [],
        artists: [],
      });
      return;
    }

    setIsLoading(true);
    try {
      const searchResult = await browseAllData({ q: query });
      setListResult(searchResult.data);
    } catch (error) {
      console.error(error);
      setError("Đã xảy ra lỗi, vui lòng thử lại sau !");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSearch(q);
  }, [q]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Đang tải danh sách playlists...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-8">
        <p>Lỗi: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl">
      <p className="text-white text-2xl font-bold">Kết quả tìm kiếm</p>

      <hr className="border-gray-800 mt-3 mb-6" />

      {listResult.songs.length > 0 && (
        <section id="songs" className="w-full mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-100">Bài Hát</h2>
          </div>

          <div>
            {listResult.songs?.map((song, idx) => (
              <SongCard
                key={idx}
                song={song}
                onFavoriteChange={(songId, isLiked) => {
                  // Update the song's isLiked status in the list
                  setListResult((prev) => ({
                    ...prev,
                    songs: prev.songs.map((s) =>
                      s.id === songId ? { ...s, isLiked } : s
                    ),
                  }));
                }}
              />
            ))}
          </div>
        </section>
      )}

      {listResult.albums.length > 0 && (
        <section id="albums" className="w-full mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-100">Album</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {listResult.albums?.map((album, idx) => (
              <AlbumCard key={idx} album={album} />
            ))}
          </div>
        </section>
      )}

      {listResult.artists.length > 0 && (
        <section id="artists" className="w-full mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-100">Nghệ sĩ</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {listResult.artists?.map((art, idx) => (
              <ArtistProfileCard key={idx} artist={art} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SearchResult;
