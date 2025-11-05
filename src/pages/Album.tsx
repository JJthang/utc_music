import type { FC } from "react";
import { Play, Heart, MoreHorizontal } from "lucide-react";

const AlbumPage: FC = () => {
  const albumCover =
    "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/9/7/a/2/97a21301630ce3762bd373b6c76d8bec.jpg";
  const tracks = [
    {
      id: 1,
      title: "Cuốn Cho Anh Một Điều Nữa Đi",
      artist: "MCK",
      duration: "03:06",
      premium: true,
    },
    {
      id: 2,
      title: "Cuốn Cho Anh Một Điều Nữa Đi",
      artist: "MCK",
      duration: "03:06",
      premium: true,
    },
    {
      id: 3,
      title: "Cuốn Cho Anh Một Điều Nữa Đi",
      artist: "MCK",
      duration: "03:06",
      premium: true,
    },
    {
      id: 4,
      title: "Cuốn Cho Anh Một Điều Nữa Đi",
      artist: "MCK",
      duration: "03:06",
      premium: true,
    },
    {
      id: 5,
      title: "Cuốn Cho Anh Một Điều Nữa Đi",
      artist: "MCK",
      duration: "03:06",
      premium: true,
    },
    {
      id: 6,
      title: "Cuốn Cho Anh Một Điều Nữa Đi",
      artist: "MCK",
      duration: "03:06",
      premium: true,
    },
    {
      id: 7,
      title: "Cuốn Cho Anh Một Điều Nữa Đi",
      artist: "MCK",
      duration: "03:06",
      premium: true,
    },
    {
      id: 8,
      title: "Cuốn Cho Anh Một Điều Nữa Đi",
      artist: "MCK",
      duration: "03:06",
      premium: true,
    },
    {
      id: 9,
      title: "Cuốn Cho Anh Một Điều Nữa Đi",
      artist: "MCK",
      duration: "03:06",
      premium: true,
    },
    {
      id: 10,
      title: "Show Me Love",
      artist: "MCK",
      duration: "02:35",
      premium: true,
    },
    {
      id: 11,
      title: "Tại Vì Sao",
      artist: "MCK, LOPE PHAM",
      duration: "03:23",
      premium: true,
    },
    {
      id: 12,
      title: "Thở Er",
      artist: "MCK",
      duration: "01:38",
      premium: true,
    },
    {
      id: 13,
      title: "Ai Mới Là Kẻ Xấu Xa",
      artist: "MCK",
      duration: "03:13",
      premium: true,
    },
    {
      id: 14,
      title: "Anh Đã Ổn Hơn",
      artist: "MCK",
      duration: "03:14",
      premium: true,
    },
    {
      id: 15,
      title: "Badtrip",
      artist: "MCK",
      duration: "02:39",
      premium: true,
    },
    { id: 16, title: "99", artist: "MCK", duration: "02:52", premium: true },
  ];

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-900 to-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Album Info */}
        <div className="lg:col-span-1 flex flex-col items-start lg:sticky lg:top-8 lg:h-fit">
          <div className="relative w-full max-w-xs mb-6">
            {/* Album Cover */}
            <img
              src={albumCover || "/placeholder.svg"}
              alt={albumCover}
              className="object-cover group-hover:hidden"
            />
          </div>

          {/* Album Details */}
          <h1 className="text-4xl font-bold mb-2">99%</h1>

          <div className="text-gray-400 text-sm space-y-1 mb-6">
            <p>MCK • 2023</p>
            <p>1K người yêu thích</p>
          </div>

          {/* Play Button */}
          <button className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 mb-4 transition-all shadow-lg cursor-pointer">
            <Play className="w-5 h-5 fill-white" />
            PHÁT TẤT CẢ
          </button>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="rounded-full bg-slate-800 hover:bg-slate-700 p-3 transition-colors cursor-pointer">
              <Heart className="w-6 h-6 text-white" />
            </button>
            <button className="rounded-full bg-slate-800 hover:bg-slate-700 p-3 transition-colors cursor-pointer">
              <MoreHorizontal className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Right Side - Track List */}
        <div className="lg:col-span-2 max-h-screen overflow-y-auto">
          <div className="space-y-2 mb-8">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/60 transition-colors group"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  aria-label={`Select ${track.title}`}
                />

                <div className="relative w-10 h-10 rounded overflow-hidden shrink-0">
                  <img
                    src={albumCover || "/placeholder.svg"}
                    alt={track.title}
                    className="object-cover group-hover:hidden"
                  />
                  <button className="hidden group-hover:flex items-center justify-center w-full h-full bg-black/60 hover:bg-black/80 transition-colors cursor-pointer">
                    <Play className="w-4 h-4 fill-white text-white" />
                  </button>
                </div>

                <div className="flex-1">
                  <p className="text-white font-medium">{track.title}</p>
                  {track.artist && (
                    <p className="text-gray-500 text-sm hover:text-purple-400 hover:underline cursor-pointer transition-colors">
                      {track.artist}
                    </p>
                  )}
                </div>

                {track.premium && (
                  <span className="bg-yellow-500 text-white font-bold text-xs px-2 py-1 rounded">
                    PREMIUM
                  </span>
                )}

                <span className="text-gray-400 text-sm min-w-12 text-right">
                  {track.duration}
                </span>

                <div className="hidden group-hover:flex items-center gap-2">
                  <button className="p-1.5 rounded-full hover:bg-slate-600/60 transition-colors cursor-pointer">
                    <Heart className="w-5 h-5 text-white hover:text-purple-400 transition-colors" />
                  </button>
                  <button className="p-1.5 rounded-full hover:bg-slate-600/60 transition-colors cursor-pointer">
                    <MoreHorizontal className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Album Info Section */}
          <div className="p-6">
            <h2 className="text-white font-bold mb-4">Thông Tin</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-400">Số bài hát</p>
                <p className="text-white font-medium">16</p>
              </div>
              <div>
                <p className="text-gray-400">Ngày phát hành</p>
                <p className="text-white font-medium">02/03/2023</p>
              </div>
              <div>
                <p className="text-gray-400">Cung cấp bởi</p>
                <p className="text-purple-400 font-medium cursor-pointer hover:underline">
                  The Orchard
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AlbumPage;
