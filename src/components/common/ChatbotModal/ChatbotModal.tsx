import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Loader2 } from 'lucide-react';
import Modal from '../Modal/Modal';
import { sendChatbotMessage } from '@/services/Apis/chatbot.service';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const ChatbotModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
    isOpen,
    onClose,
}) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Xin chào! Tôi là trợ lý ảo của bạn. Tôi có thể giúp gì cho bạn hôm nay?',
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState<string | undefined>();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    // Reset conversation khi đóng modal (optional - bạn có thể xóa dòng này nếu muốn giữ lịch sử)
    useEffect(() => {
        if (!isOpen) {
            // Có thể giữ lại conversationId để tiếp tục khi mở lại
            // Hoặc reset để bắt đầu cuộc hội thoại mới
            // setConversationId(undefined);
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessageText = inputValue.trim();
        const userMessage: Message = {
            id: Date.now().toString(),
            text: userMessageText,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Gọi Groq AI API
            const response = await sendChatbotMessage(userMessageText, conversationId);
            
            if (response?.data?.response) {
                const botResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    text: response.data.response,
                    sender: 'bot',
                    timestamp: new Date(),
                };
                
                // Lưu conversationId để duy trì context
                if (response.data.conversationId) {
                    setConversationId(response.data.conversationId);
                }
                
                setMessages((prev) => [...prev, botResponse]);
            } else {
                throw new Error('Không nhận được phản hồi từ AI');
            }
        } catch (error: any) {
            // Fallback: Sử dụng keyword matching nếu API không khả dụng
            console.warn('Chatbot API không khả dụng, sử dụng fallback:', error);
            
            let errorMessage = getBotResponse(userMessageText);
            
            // Hiển thị thông báo lỗi nếu thiếu API key
            if (error?.message?.includes('VITE_GROQ_API_KEY')) {
                errorMessage = '⚠️ Vui lòng cấu hình VITE_GROQ_API_KEY trong file .env để sử dụng AI chatbot. Hiện tại đang sử dụng chế độ cơ bản.\n\n' + errorMessage;
            }
            
            setTimeout(() => {
                const botResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    text: errorMessage,
                    sender: 'bot',
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, botResponse]);
            }, 500);
        } finally {
            setIsLoading(false);
        }
    };

    const getBotResponse = (userInput: string): string => {
        const lowerInput = userInput.toLowerCase();
        
        if (lowerInput.includes('chào') || lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return 'Xin chào! Rất vui được trò chuyện với bạn. Bạn cần tôi giúp gì không?';
        }
        if (lowerInput.includes('bài hát') || lowerInput.includes('nhạc') || lowerInput.includes('song')) {
            return 'Bạn có thể tìm kiếm bài hát bằng cách sử dụng thanh tìm kiếm ở trên. Tôi cũng có thể giúp bạn khám phá các bài hát mới!';
        }
        if (lowerInput.includes('playlist') || lowerInput.includes('danh sách')) {
            return 'Bạn có thể tạo và quản lý playlist của mình từ menu bên trái. Cần tôi hướng dẫn thêm không?';
        }
        if (lowerInput.includes('đăng ký') || lowerInput.includes('subscription') || lowerInput.includes('premium')) {
            return 'Để nâng cấp tài khoản Premium, bạn có thể vào phần "Nâng cấp" trong menu. Premium sẽ cho bạn trải nghiệm nghe nhạc không giới hạn!';
        }
        if (lowerInput.includes('cảm ơn') || lowerInput.includes('thanks') || lowerInput.includes('thank')) {
            return 'Không có gì! Luôn sẵn sàng giúp đỡ bạn. Có gì cần hỏi thêm không?';
        }
        
        return 'Cảm ơn bạn đã liên hệ! Tôi đang học hỏi thêm để phục vụ bạn tốt hơn. Bạn có thể thử hỏi về bài hát, playlist, hoặc đăng ký Premium.';
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="md"
            showCloseButton={false}
        >
            <div className="flex flex-col h-[600px] bg-gradient-to-br from-slate-900 via-blue-900/10 to-slate-900 rounded-lg overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-blue-700/50 bg-gradient-to-r from-blue-900/30 to-slate-900/30">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600/20 rounded-lg">
                            <Bot className="text-blue-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">Trợ lý ảo</h3>
                            <p className="text-xs text-gray-400">Luôn sẵn sàng hỗ trợ</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-blue-700/30"
                        aria-label="Close chatbot"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex gap-3 ${
                                message.sender === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                        >
                            {message.sender === 'bot' && (
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                                    <Bot className="text-blue-400" size={18} />
                                </div>
                            )}
                            <div
                                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                                    message.sender === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-sm'
                                        : 'bg-slate-800/50 text-gray-100 border border-blue-700/30 rounded-bl-sm'
                                }`}
                            >
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                    {message.text}
                                </p>
                                <span
                                    className={`text-xs mt-1 block ${
                                        message.sender === 'user'
                                            ? 'text-blue-100'
                                            : 'text-gray-400'
                                    }`}
                                >
                                    {formatTime(message.timestamp)}
                                </span>
                            </div>
                            {message.sender === 'user' && (
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                                    <User className="text-blue-400" size={18} />
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3 justify-start">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                                <Bot className="text-blue-400" size={18} />
                            </div>
                            <div className="bg-slate-800/50 text-gray-100 border border-blue-700/30 rounded-2xl rounded-bl-sm px-4 py-2.5">
                                <div className="flex items-center gap-2">
                                    <Loader2 className="text-blue-400 animate-spin" size={16} />
                                    <span className="text-sm text-gray-400">Đang suy nghĩ...</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-blue-700/50 bg-slate-900/50">
                    <div className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Nhập tin nhắn của bạn..."
                            className="flex-1 px-4 py-2.5 bg-slate-800/50 border border-blue-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim() || isLoading}
                            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                            aria-label="Send message"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <Send size={18} />
                            )}
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        Nhấn Enter để gửi
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default ChatbotModal;

