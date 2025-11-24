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
    }, [isActive]);

    const resetTimeout = useCallback(() => {

        clearCurrentTimeout();
        timeoutRef.current = setTimeout(() => {
            console.log('HEHE setTimeout');
            stopListening();
        }, 5000);
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
    }, [isActive]);

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
        if (transcript) {
            resetTimeout();
            onMicro?.(transcript);
        }
    }, [transcript, resetTimeout, onMicro]);

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
    }, []);

    if (!browserSupportsSpeechRecognition) {
        return <div>Trình duyệt không hỗ trợ SpeechRecognition</div>;
    }

    return (
        <div
            className={`micro-wrap ${listening ? "active" : ""} ${className}`}
            onClick={debounceToggleMicro}
        >
            <FaMicrophoneAlt className="size-5 text-[#B3B3C2]" />
        </div>
    );
};
