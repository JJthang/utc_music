import type { ApiItemResponse } from "@/types/api-response.type";

/**
 * Groq API Configuration - Free AI API
 *
 * Để sử dụng chatbot AI:
 * 1. Đăng ký tài khoản miễn phí tại: https://console.groq.com/
 * 2. Tạo API Key trong phần "API Keys"
 * 3. Thêm vào file .env: VITE_GROQ_API_KEY=your_api_key_here
 *
 * Groq API miễn phí và có tốc độ xử lý rất nhanh!
 */
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export interface ChatbotMessage {
  message: string;
  conversationId?: string;
}

export interface ChatbotResponse {
  response: string;
  conversationId?: string;
}

interface MessageHistory {
  role: "user" | "assistant" | "system";
  content: string;
}

// Store conversation history in memory (in a real app, you might want to use localStorage or a backend)
const conversationHistories = new Map<string, MessageHistory[]>();

/**
 * Gửi tin nhắn đến Groq AI API (Free)
 * @param message - Tin nhắn từ người dùng
 * @param conversationId - ID cuộc hội thoại (optional, để duy trì context)
 * @returns Phản hồi từ chatbot
 */
export const sendChatbotMessage = async (
  message: string,
  conversationId?: string
): Promise<ApiItemResponse<ChatbotResponse>> => {
  // Tạo conversationId mới nếu chưa có
  const convId =
    conversationId ||
    `conv_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

  // Lấy lịch sử hội thoại
  let history = conversationHistories.get(convId) || [];

  // System prompt cho chatbot về music
  const systemPrompt: MessageHistory = {
    role: "system",
    content: `Bạn là trợ lý ảo thân thiện và chuyên nghiệp của một ứng dụng nghe nhạc. 
Bạn có thể giúp người dùng:
- Tìm kiếm và khám phá bài hát, nghệ sĩ, album
- Hướng dẫn sử dụng các tính năng của ứng dụng (playlist, tìm kiếm, phát nhạc)
- Giải thích về gói Premium và đăng ký
- Tư vấn về cách sử dụng ứng dụng nghe nhạc
- Trả lời các câu hỏi liên quan đến âm nhạc

Hãy trả lời ngắn gọn, thân thiện và hữu ích. Nếu câu hỏi không liên quan đến ứng dụng nghe nhạc, 
hãy nhẹ nhàng chuyển hướng cuộc trò chuyện về chủ đề âm nhạc.`,
  };

  // Thêm system prompt nếu đây là cuộc hội thoại mới
  if (history.length === 0) {
    history = [systemPrompt];
  }

  // Thêm tin nhắn người dùng vào lịch sử
  history.push({
    role: "user",
    content: message,
  });

  try {
    // Gọi Groq API
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // Model miễn phí và nhanh của Groq
        messages: history,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    const botResponse =
      data.choices?.[0]?.message?.content ||
      "Xin lỗi, tôi không thể trả lời câu hỏi này lúc này.";

    // Thêm phản hồi bot vào lịch sử
    history.push({
      role: "assistant",
      content: botResponse,
    });

    // Lưu lịch sử (giới hạn 20 tin nhắn gần nhất để tránh token limit)
    if (history.length > 20) {
      history = [systemPrompt, ...history.slice(-18)];
    }
    conversationHistories.set(convId, history);

    return {
      success: true,
      data: {
        response: botResponse,
        conversationId: convId,
      },
    };
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn đến Groq API:", error);

    // Nếu không có API key, throw error để fallback handler xử lý
    if (!GROQ_API_KEY) {
      throw new Error("Vui lòng cấu hình VITE_GROQ_API_KEY trong file .env");
    }

    throw error;
  }
};
