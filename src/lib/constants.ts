/**
 * Shared animation and layout constants.
 * Centralizes values used across components for consistency and easy tuning.
 */

/** Cubic-bezier easing: smooth deceleration at end. Used for most entrance animations. */
export const EASING_SMOOTH = [0.16, 1, 0.3, 1] as const;

/** Spring-like easing for bouncy effects. */
export const EASING_SPRING = [0.34, 1.56, 0.64, 1] as const;

/** Default viewport options for scroll-triggered animations. */
export const VIEWPORT_DEFAULT = {
  once: true,
  margin: "-80px",
  amount: 0.2,
} as const;

/** Tighter margin for elements that should animate earlier. */
export const VIEWPORT_EARLY = {
  once: true,
  margin: "-60px",
  amount: 0.15,
} as const;

/** Looser margin for elements that can animate later. */
export const VIEWPORT_LAZY = {
  once: true,
  margin: "-100px",
  amount: 0.2,
} as const;
