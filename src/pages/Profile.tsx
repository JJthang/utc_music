import type { FC } from "react";
import { useState, useEffect } from "react";
import { Edit2, Save, X, Camera, Crown } from "lucide-react";
import { getCurrentUser, updateUserProfile, deleteUserAvatar, type User } from "@/services/Apis/user.service";

const ProfilePage: FC = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    displayName: "",
    avatarUri: null as File | null,
  });
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getCurrentUser();
        setProfile(response.data);
        setFormData({
          displayName: response.data.displayName || "",
          avatarUri: null,
        });
      } catch (err) {
        console.error("Lỗi khi tải profile:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Không thể tải thông tin profile. Vui lòng thử lại."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    if (profile) {
      setFormData({
        displayName: profile.displayName || "",
        avatarUri: null,
      });
      setPreviewAvatar(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setFormData({
        displayName: profile.displayName || "",
        avatarUri: null,
      });
      setPreviewAvatar(null);
    }
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      if (formData.displayName) {
        formDataToSend.append("displayName", formData.displayName);
      }
      if (formData.avatarUri) {
        formDataToSend.append("avatarUri", formData.avatarUri);
      }

      const response = await updateUserProfile(formDataToSend);
      setProfile(response.data);
      setIsEditing(false);
      setFormData({ displayName: "", avatarUri: null });
      setPreviewAvatar(null);
    } catch (err) {
      console.error("Lỗi khi cập nhật profile:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Không thể cập nhật profile. Vui lòng thử lại."
      );
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, avatarUri: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await deleteUserAvatar();
      const response = await getCurrentUser();
      setProfile(response.data);
      setPreviewAvatar(null);
    } catch (err) {
      console.error("Lỗi khi xóa avatar:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Không thể xóa avatar. Vui lòng thử lại."
      );
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p>Đang tải thông tin profile...</p>
      </main>
    );
  }

  if (error && !profile) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400">
        <p>Lỗi: {error}</p>
      </main>
    );
  }

  if (!profile) {
    return null;
  }

  const displayAvatar = previewAvatar || profile.avatarUri;

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-900 to-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Hồ sơ của tôi</h1>
          <p className="text-gray-400 text-sm">Quản lý thông tin cá nhân của bạn</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <div className="bg-slate-800/50 rounded-lg p-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <img
                  src={displayAvatar || "/placeholder.svg"}
                  alt={profile.displayName || profile.userName}
                  className="object-cover w-full h-full"
                />
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 rounded-full p-3 cursor-pointer">
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            {isEditing && displayAvatar && (
              <button
                onClick={handleDeleteAvatar}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Xóa avatar
              </button>
            )}
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Tên hiển thị
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên hiển thị"
                />
              ) : (
                <p className="text-white text-lg">
                  {profile.displayName || profile.userName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Tên đăng nhập
              </label>
              <p className="text-white text-lg">{profile.userName}</p>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Email</label>
              <p className="text-white text-lg">{profile.email}</p>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Gói đăng ký
              </label>
              <div className="flex items-center gap-2">
                {profile.isPremium ? (
                  <>
                    <Crown className="w-5 h-5 text-yellow-500" />
                    <p className="text-white text-lg">Premium</p>
                    {profile.premiumUntil && (
                      <p className="text-gray-400 text-sm ml-2">
                        (Đến {new Date(profile.premiumUntil).toLocaleDateString("vi-VN")})
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-white text-lg">Miễn phí</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Ngày tham gia
              </label>
              <p className="text-white text-lg">
                {new Date(profile.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors cursor-pointer"
                >
                  <Save className="w-5 h-5" />
                  Lưu thay đổi
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                  Hủy
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors cursor-pointer"
              >
                <Edit2 className="w-5 h-5" />
                Chỉnh sửa profile
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

