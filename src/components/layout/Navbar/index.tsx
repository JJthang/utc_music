import { useMemo, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { IoIosSearch } from "react-icons/io";

import { Micro } from "@/components/common/Micro";
import {
  CardResult,
  DownloadButton,
  NavigationArrows,
  SettingsButton,
  UpgradeButton,
  UserMenu,
} from "./components";

import {
  browseAllData,
  type BrowseResponse,
} from "@/services/Apis/browser.service";
import { debounce } from "@/utils/debounce";
import { FaSpinner } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMicroActive, setIsMicroActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [listResult, setListResult] = useState<BrowseResponse>({
    songs: [],
    albums: [],
    artists: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSearch = async (query: string) => {
    if (!query.trim()) {
      setListResult({
        songs: [],
        albums: [],
        artists: [],
      });
      return;
    }

    setLoading(true);
    setShowDropdown(true);
    try {
      const searchResult = await browseAllData({ q: query });
      setListResult(searchResult.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useMemo(
    () => debounce((text: string) => fetchSearch(text), 400),
    []
  );

  const onMicro = (text: string) => {
    setSearchQuery(text);
    debouncedSearch(text);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const onHandleSearch = (text: string) => {
    navigate(`/search?q=${text}`);
    setShowDropdown(false);
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
    setListResult({
      songs: [],
      albums: [],
      artists: [],
    });
  };

  return (
    <nav className="h-[68px] w-full relative z-50">
      {/* Navbar */}
      <div className="bg-outlet bg-opacity-90 backdrop-blur-sm px-6 py-3 flex items-center justify-between gap-4">
        {/* Left section - Navigation arrows and Search */}
        <div className="flex items-center gap-4 flex-1">
          <NavigationArrows />

          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                value={searchQuery}
                onChange={handleChange}
                className="w-full bg-[#334155] text-white placeholder-gray-400 rounded-full py-2.5 px-12 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {searchQuery ? (
                  <X
                    onClick={clearSearchQuery}
                    className="text-[#B3B3C2] cursor-pointer"
                  />
                ) : (
                  <Micro
                    isActive={isMicroActive}
                    language="vi-VN"
                    onChangeIsActive={setIsMicroActive}
                    onMicro={onMicro}
                    onTimeout={() => {
                      setShowDropdown(false);
                    }}
                  />
                )}
              </div>
              {showDropdown && (
                <div
                  onBlur={() => setShowDropdown(false)}
                  className="absolute px-4 py-3 top-full mt-2 w-full bg-[#334155] rounded-2xl shadow-xl max-h-[350px] hidden-scrollbar z-50"
                >
                  <p className="text-white text-base font-bold">
                    Từ khoá liên quan
                  </p>
                  {listResult.songs?.map((song, index) => (
                    <div
                      key={index}
                      onClick={() => onHandleSearch(song.title)}
                      className="flex items-center gap-1 w-full cursor-pointer rounded-xl px-2 py-2 hover:bg-[#475569]"
                    >
                      <IoIosSearch />
                      <span className="text-white text-sm font-bold">
                        {song.title}
                      </span>
                    </div>
                  ))}
                  {searchQuery.trim() && (
                    <div
                      onClick={() => onHandleSearch(searchQuery)}
                      className="flex items-center gap-1 w-full cursor-pointer rounded-xl px-2 py-2 hover:bg-[#475569]"
                    >
                      <IoIosSearch />
                      <span className="text-zinc-400 text-sm font-normal">
                        Tìm kiếm
                      </span>
                      <span className="text-white text-sm font-bold">
                        "{searchQuery}"
                      </span>
                    </div>
                  )}

                  <hr className="border-gray-500 my-3" />

                  <p className="text-white text-base font-bold">
                    Gợi ý kết quả
                  </p>
                  {loading ? (
                    <FaSpinner className={`${loading && "animate-spin"}`} />
                  ) : (
                    <div>
                      {listResult.songs?.map((song, index) => (
                        <CardResult
                          key={index}
                          title={song.title}
                          coverUri={song.coverUri}
                          artists={song.artists}
                          redirectUrl={`song/${song.id}`}
                        />
                      ))}
                      {listResult.albums?.map((album, index) => (
                        <CardResult
                          key={index}
                          title={album.title}
                          coverUri={album.coverUri}
                          artists={album.artists}
                          redirectUrl={`album/${album.id}`}
                          type={album.type}
                        />
                      ))}
                      {listResult.artists?.map((artist, index) => (
                        <CardResult
                          key={index}
                          title={artist.name}
                          coverUri={artist.avatarUri}
                          redirectUrl={`artist/${artist.id}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right section - Action buttons */}
        <div className="flex items-center gap-3">
          <UpgradeButton />
          <DownloadButton />
          <SettingsButton />
          {/* User Avatar */}
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
