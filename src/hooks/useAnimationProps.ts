import { useReducedMotion } from "./useReducedMotion";
import { EASING_SMOOTH, VIEWPORT_DEFAULT } from "@/lib/constants";

type FadeInUpConfig = {
  y?: number;
  duration?: number;
  delay?: number;
  ease?: readonly [number, number, number, number];
};

/**
 * Returns animation props that respect reduced-motion preferences.
 * Use for consistent entrance animations across the app.
 */
export function useAnimationProps() {
  const reducedMotion = useReducedMotion();

  const fadeInUp = (config: FadeInUpConfig = {}) => {
    const { y = 24, duration = 0.55, delay = 0, ease = EASING_SMOOTH } = config;
    return {
      initial: reducedMotion ? false : { opacity: 0, y },
      animate: { opacity: 1, y: 0 },
      transition: { duration: reducedMotion ? 0 : duration, delay, ease },
    };
  };

  const fadeInUpWhileInView = (config: FadeInUpConfig = {}) => {
    const { y = 24, duration = 0.55, delay = 0, ease = EASING_SMOOTH } = config;
    return {
      initial: reducedMotion ? false : { opacity: 0, y },
      whileInView: { opacity: 1, y: 0 },
      viewport: VIEWPORT_DEFAULT,
      transition: { duration: reducedMotion ? 0 : duration, delay, ease },
    };
  };

  return { reducedMotion, fadeInUp, fadeInUpWhileInView };
}
