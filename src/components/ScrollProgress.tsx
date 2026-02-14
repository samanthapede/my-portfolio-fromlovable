import { motion, useScroll } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Thin progress bar at top of page showing scroll position.
 * Hidden when user prefers reduced motion.
 */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-primary/30 z-[100] origin-left"
      style={{ scaleX: scrollYProgress }}
      aria-hidden
    />
  );
};
