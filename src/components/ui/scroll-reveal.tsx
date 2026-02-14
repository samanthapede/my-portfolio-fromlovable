import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Trigger when this fraction of element is visible (0-1). 0.2 = 20% in view */
  amount?: number;
  /** Root margin for viewport (e.g. "-80px" = trigger 80px before visible) */
  margin?: string;
  /** Stagger delay for children (seconds) */
  staggerDelay?: number;
  /** Animation: fade-up, fade-in, slide-left, slide-right, scale-in */
  variant?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-in";
  /** Duration in seconds */
  duration?: number;
  /** Only animate once (don't re-animate when scrolling back) */
  once?: boolean;
};

const variants = {
  "fade-up": { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 } },
  "fade-in": { initial: { opacity: 0 }, animate: { opacity: 1 } },
  "slide-left": { initial: { opacity: 0, x: 48 }, animate: { opacity: 1, x: 0 } },
  "slide-right": { initial: { opacity: 0, x: -48 }, animate: { opacity: 1, x: 0 } },
  "scale-in": { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 } },
};

const EASING = [0.16, 1, 0.3, 1] as const;

export const ScrollReveal = ({
  children,
  className,
  amount = 0.2,
  margin = "-80px",
  variant = "fade-up",
  duration = 0.6,
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once, margin, amount });
  const { initial, animate } = variants[variant];

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration,
        ease: EASING,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
