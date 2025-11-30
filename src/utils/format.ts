export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const formatDate = (
  isoString: string,
  format: "year" | "date"
): string => {
  if (!isoString) return "";

  try {
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
      console.error("Lỗi định dạng ngày tháng: Chuỗi không hợp lệ.");
      return isoString;
    }

    if (format === "year") {
      return date.getFullYear().toString();
    } else if (format === "date") {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }

    return isoString;
  } catch (error) {
    console.error("Lỗi trong quá trình định dạng ngày tháng:", error);
    return isoString;
  }
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toString();
};
