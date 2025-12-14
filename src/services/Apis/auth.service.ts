import type {
  LoginPayload,
  RegisterPayload,
  LoginResponse,
  RegisterResponse,
  User,
} from "@/types/auth.type";
import api from "../http";
import type { ApiItemResponse } from "@/types/api-response.type";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (
  payload: LoginPayload
): Promise<ApiItemResponse<LoginResponse>> => {
  const url = `${API_URL}/api/auth/login`;
  try {
    const result = await api.post(url, payload);
    return result.data;
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    throw new Error("Không thể đăng nhập. Vui lòng kiểm tra lại thông tin.");
  }
};

export const register = async (
  payload: RegisterPayload
): Promise<ApiItemResponse<RegisterResponse>> => {
  const url = `${API_URL}/api/auth/register`;
  try {
    const result = await api.post(url, payload);
    return result.data;
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    throw new Error("Không thể đăng ký. Vui lòng thử lại sau.");
  }
};

export const getCurrentUser = async (token: string): Promise<User> => {
  const res = await api.get(`${API_URL}/api/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const refreshAccessToken = async (
  refreshToken: string
): Promise<ApiItemResponse<{ accessToken: string }>> => {
  const url = `${API_URL}/api/auth/refresh-token`;
  const result = await api.post(url, { refreshToken });
  return result.data;
};
