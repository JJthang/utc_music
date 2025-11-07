import axios from "axios";
import type {
  LoginPayload,
  RegisterPayload,
  LoginResponse,
  RegisterResponse,
} from "@/types/auth.type";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const url = `${API_URL}/api/auth/login`;
  try {
    const result = await axios.post<LoginResponse>(url, payload);
    return result.data;
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    throw new Error("Không thể đăng nhập. Vui lòng kiểm tra lại thông tin.");
  }
};

export const register = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const url = `${API_URL}/api/auth/register`;
  try {
    const result = await axios.post<RegisterResponse>(url, payload);
    return result.data;
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    throw new Error("Không thể đăng ký. Vui lòng thử lại sau.");
  }
};
