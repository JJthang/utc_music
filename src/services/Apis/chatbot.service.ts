import api from "../http";
import type { ApiItemResponse } from "@/types/api-response.type";

const API_URL = import.meta.env.VITE_API_URL;

export interface ChatbotMessage {
  message: string;
  conversationId?: string;
}

export interface ChatbotResponse {
  response: string;
  conversationId?: string;
}

/**
 * Gửi tin nhắn đến chatbot API
 * @param message - Tin nhắn từ người dùng
 * @param conversationId - ID cuộc hội thoại (optional, để duy trì context)
 * @returns Phản hồi từ chatbot
 */
export const sendChatbotMessage = async (
  message: string,
  conversationId?: string
): Promise<ApiItemResponse<ChatbotResponse>> => {
  const url = `${API_URL}/api/chatbot/message`;
  try {
    const result = await api.post(url, {
      message,
      conversationId,
    });
    return result.data;
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn đến chatbot:", error);
    throw error;
  }
};

