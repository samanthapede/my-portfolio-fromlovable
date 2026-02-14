import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type HighlightVariant = "hero" | "about" | "testimonial" | "footer";

type HighlightTextProps = {
  children: React.ReactNode;
  variant: HighlightVariant;
  /** Delay before the highlight sweep starts (after text is visible) */
  delay?: number;
  /** Duration of the sweep animation */
  duration?: number;
  /** Trigger: 'animate' for parent-driven (pass isInView), 'whileInView' for self-triggered */
  trigger?: "animate" | "whileInView";
  isInView?: boolean;
  className?: string;
};

const variantBgClasses: Record<HighlightVariant, string> = {
  hero: "highlight-bg-hero",
  about: "highlight-bg-about",
  testimonial: "highlight-bg-testimonial",
  footer: "highlight-bg-footer",
};

const variantLegacyClasses: Record<HighlightVariant, string> = {
  hero: "hero-highlight",
  about: "about-highlight",
  testimonial: "testimonial-highlight",
  footer: "footer-highlight",
};

export const HighlightText = ({
  children,
  variant,
  delay = 0.45,
  duration = 0.55,
  trigger = "whileInView",
  isInView,
  className,
}: HighlightTextProps) => {
  const reducedMotion = useReducedMotion();
  const bgClass = variantBgClasses[variant];
  const legacyClass = variantLegacyClasses[variant];

  const sweepAnimate = trigger === "animate" ? (isInView ? { scaleX: 1 } : { scaleX: 0 }) : undefined;
  const sweepWhileInView = trigger === "whileInView" ? { scaleX: 1 } : undefined;

  if (reducedMotion) {
    return (
      <span className={cn(legacyClass, className)}>
        {children}
      </span>
    );
  }

  return (
    <span className={cn("highlight-text-wrapper", className)}>
      <motion.span
        className={cn("highlight-text-bg", bgClass)}
        initial={{ scaleX: 0 }}
        animate={sweepAnimate}
        whileInView={sweepWhileInView}
        viewport={trigger === "whileInView" ? { once: true, margin: "-80px", amount: 0.2 } : undefined}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformOrigin: "left" }}
        aria-hidden
      />
      <span className="highlight-text-inner">{children}</span>
    </span>
  );
};
