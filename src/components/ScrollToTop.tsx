import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to top when the route changes. Uses useLayoutEffect so it runs
 * before paint, and behavior: "auto" for instant scroll (no animation).
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Direct assignment bypasses scroll-behavior: smooth (no animation)
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
};
