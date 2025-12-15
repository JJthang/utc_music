import { useState, useEffect, useCallback, useRef, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { IoIosSearch } from "react-icons/io";
import { useDebounce } from "use-debounce";

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
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isClearingRef = useRef<boolean>(false);

  const fetchSearch = useCallback(async (query: string) => {
    console.log('browseAllData : ', query);

    if (!query.trim()) {
      setListResult({
        songs: [],
        albums: [],
        artists: [],
      });
      return;
    }

    setLoading(true);
    try {
      const searchResult = await browseAllData({ q: query });
      setListResult(searchResult.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, fetchSearch]);

  const onMicro = (text: string) => {
    // Nếu đang clear, không làm gì cả
    if (isClearingRef.current) {
      return;
    }
    setSearchQuery(text);
    // Chỉ hiển thị dropdown khi có text (transcript)
    setShowDropdown(!!text.trim());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(!!value.trim());
  };

  const onHandleSearch = (text: string) => {
    navigate(`/search?q=${text}`);
    setShowDropdown(false);
  };

  const clearSearchQuery = () => {
    // Đánh dấu đang clear để tránh onTimeout can thiệp
    isClearingRef.current = true;
    
    // Dừng micro nếu đang active
    if (isMicroActive) {
      setIsMicroActive(false);
    }
    setSearchQuery("");
    setShowDropdown(false);
    setListResult({
      songs: [],
      albums: [],
      artists: [],
    });
    
    // Reset flag sau một chút để tránh race condition
    setTimeout(() => {
      isClearingRef.current = false;
    }, 200);
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
                onFocus={() => {
                  if (searchQuery.trim()) {
                    setShowDropdown(true);
                  }
                }}
                onBlur={() => {
                  // Đóng dropdown nếu focus không chuyển vào dropdown
                  setTimeout(() => {
                    if (dropdownRef.current && !dropdownRef.current.contains(document.activeElement)) {
                      setShowDropdown(false);
                    }
                  }, 100);
                }}
                className="w-full rounded-full py-2.5 px-12 outline-none focus:ring-2 focus:ring-purple transition-all placeholder-gray-400"
                style={{ 
                    backgroundColor: 'var(--color-bg-tertiary)',
                    color: 'var(--color-text-primary)',
                }}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Micro
                  isActive={isMicroActive}
                  language="vi-VN"
                  onChangeIsActive={setIsMicroActive}
                  onMicro={onMicro}
                  onTimeout={(transcript) => {
                    // Nếu đang clear, không làm gì cả
                    if (isClearingRef.current) {
                      return;
                    }
                    // Chỉ đóng dropdown nếu không có transcript (không nói gì)
                    if (!transcript?.trim()) {
                      setShowDropdown(false);
                    }
                    // Nếu có transcript, giữ dropdown mở để hiển thị kết quả
                  }}
                />
                <X
                  onClick={clearSearchQuery}
                  className="size-5 cursor-pointer"
                  style={{ color: 'var(--color-text-muted)' }}
                />
              </div>
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  onMouseDown={(e) => e.preventDefault()}
                  className="absolute px-4 py-3 top-full mt-2 w-full rounded-2xl shadow-xl max-h-[350px] hidden-scrollbar z-50"
                  style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
                >
                  <p className="text-white text-base font-bold">
                    Từ khoá liên quan
                  </p>
                  {listResult.songs?.map((song, index) => (
                    <div
                      key={index}
                      onClick={() => onHandleSearch(song.title)}
                      className="flex items-center gap-1 w-full cursor-pointer rounded-xl px-2 py-2 transition-colors hover-bg-quaternary"
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
                      className="flex items-center gap-1 w-full cursor-pointer rounded-xl px-2 py-2 transition-colors hover-bg-quaternary"
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
