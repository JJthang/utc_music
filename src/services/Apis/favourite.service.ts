import api from "../http";

export const postFavorite = async (id: string) => {
  try {
    const result = await api.post(`/api/songs/${id}/like`);
    console.log("result : ", result);
    return result.data;
  } catch (error) {
    console.error("Lỗi khi tải danh sách playlist:", error);
    throw new Error("Không thể tải danh sách playlist. Vui lòng thử lại");
  }
};
