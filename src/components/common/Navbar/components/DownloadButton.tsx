import { Download } from "lucide-react";

export const DownloadButton = () => {
  return (
    <button className="w-10 h-10 rounded-full bg-black bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all">
      <Download className="w-5 h-5 text-white" />
    </button>
  );
};
