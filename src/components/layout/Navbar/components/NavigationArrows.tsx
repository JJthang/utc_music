import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useHistoryCapabilities } from "@/hooks/useHistoryCapabilities";

export const NavigationArrows = () => {
  const navigate = useNavigate();
  const { canGoBack, canGoForward } = useHistoryCapabilities();

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={!canGoBack}
        onClick={() => navigate(-1)}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
          bg-black bg-opacity-20 hover:bg-opacity-30
          ${!canGoBack ? "opacity-40 cursor-not-allowed hover:bg-opacity-20" : "cursor-pointer"}
        `}
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>

      <button
        disabled={!canGoForward}
        onClick={() => navigate(1)}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
          bg-black bg-opacity-20 hover:bg-opacity-30
          ${!canGoForward ? "opacity-40 cursor-not-allowed hover:bg-opacity-20" : "cursor-pointer"}
        `}
      >
        <ArrowRight className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};
