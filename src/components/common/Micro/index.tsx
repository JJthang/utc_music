import React, {
    useCallback,
    useEffect,
    useRef,
} from "react";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophoneAlt } from "react-icons/fa";

type Props = {
    isActive: boolean;
    language?: string;
    onChangeIsActive?: (active: boolean) => void;
    onMicro?: (text: string) => void;
    onTimeout?: (text: string) => void;
    className?: string;
};

const useDebouncedCallback = (fn: () => void, delay: number) => {
    const timerRef = useRef<number | null>(null);

    return () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            fn();
        }, delay);
    };
};

export const Micro: React.FC<Props> = ({
    isActive,
    language = "vi-VN",
    onChangeIsActive,
    onMicro,
    onTimeout,
    className
}) => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const timeoutRef = useRef<number | null>(null);

    const clearCurrentTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const stopListening = useCallback(() => {
        onChangeIsActive?.(false);
        onTimeout?.(transcript);
        SpeechRecognition.stopListening();
        clearCurrentTimeout();
    }, [onChangeIsActive, onTimeout, transcript]);

    const resetTimeout = useCallback(() => {
        clearCurrentTimeout();
        timeoutRef.current = window.setTimeout(() => {
            stopListening();
        }, 5000); // 5 giây timeout
    }, [stopListening]);

    const startListening = useCallback(() => {
        if (listening) return;

        onChangeIsActive?.(true);
        onMicro?.("");          // clear text ở parent
        resetTranscript();

        SpeechRecognition.startListening({
            continuous: true,
            language,
        });

        resetTimeout();
    }, [language, listening, onChangeIsActive, onMicro, resetTimeout, resetTranscript]);

    // Debounce giống useDebounceFn(..., 500) bên Vue
    const debounceToggleMicro = useDebouncedCallback(() => {
        if (listening) {
            stopListening();
        } else {
            startListening();
        }
    }, 500);

    // giống watch(result) + processMessage trong Vue
    useEffect(() => {
        if (transcript && transcript.trim()) {
            resetTimeout();
            onMicro?.(transcript);
        }
    }, [transcript, resetTimeout, onMicro]);

    // Đảm bảo timeout được set khi bắt đầu nghe
    useEffect(() => {
        if (listening) {
            // Khi đang nghe, đảm bảo timeout đang chạy
            // Nếu chưa có timeout, set một timeout mới
            // Điều này đảm bảo timeout luôn chạy ngay cả khi startListening không set nó
            if (!timeoutRef.current) {
                resetTimeout();
            }
        }
        // Không cần clear timeout khi listening = false vì stopListening đã làm điều đó
    }, [listening, resetTimeout]);

    // Sync với prop isActive từ parent (giống watch(props.isActive))
    useEffect(() => {
        if (!isActive && listening) {
            stopListening();
        } else if (isActive && !listening) {
            startListening();
        }
    }, [isActive, listening, startListening, stopListening]);

    // cleanup khi unmount
    useEffect(() => {
        return () => {
            clearCurrentTimeout();
            if (listening) {
                SpeechRecognition.stopListening();
            }
        };
    }, [listening]);

    if (!browserSupportsSpeechRecognition) {
        return <div>Trình duyệt không hỗ trợ SpeechRecognition</div>;
    }

    return (
        <div
            className={`micro-wrap ${listening ? "active" : ""} ${className}`}
            onClick={debounceToggleMicro}
        >
            <FaMicrophoneAlt className="size-5 text-text-muted" style={{ color: 'var(--color-text-muted)' }} />
        </div>
    );
};
