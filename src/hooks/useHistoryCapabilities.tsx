import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useHistoryCapabilities() {
  const location = useLocation();
  const [state, setState] = useState({
    canGoBack: false,
    canGoForward: false,
  });

  useEffect(() => {
    const idx = window.history.state?.idx ?? 0;
    const length = window.history.length;

    setState({
      canGoBack: idx > 0,
      canGoForward: idx < length - 1,
    });
  }, [location]);

  return state;
}
