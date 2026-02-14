import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type LazySectionProps = {
  children: React.ReactNode;
  /** Min height of placeholder (prevents layout shift) */
  minHeight?: string;
  /** Trigger when within this margin of viewport (e.g. "200px" = load 200px before visible) */
  margin?: string;
  /** Optional className for wrapper */
  className?: string;
};

const EASING = [0.16, 1, 0.3, 1] as const;

/**
 * Defers rendering children until the section scrolls into view.
 * Uses modern scroll-triggered reveal with smooth animation.
 */
export const LazySection = ({
  children,
  minHeight = "40vh",
  margin = "200px",
  className = "",
}: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin, amount: 0.1 });
  const reducedMotion = useReducedMotion();

  return (
    <div ref={ref} className={className} style={{ minHeight: isInView ? undefined : minHeight }}>
      {isInView && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.55,
            ease: EASING,
          }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};
