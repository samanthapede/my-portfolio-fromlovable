import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HighlightText } from "@/components/HighlightText";
import { ConversationCTA } from "@/components/ConversationCTA";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASING_SMOOTH, VIEWPORT_LAZY } from "@/lib/constants";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, VIEWPORT_LAZY);
  const reducedMotion = useReducedMotion();

  return (
    <footer id="contact" ref={footerRef} className="bg-warm-gradient-subtle border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-24">
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          <motion.h2
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, delay: 0.05, ease: EASING_SMOOTH }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight mb-0 text-primary-text dark:text-section-heading"
          >
            <HighlightText variant="footer" trigger="animate" isInView={isInView} delay={0.4} duration={0.5} className="font-semibold">
              Let's clarify
            </HighlightText>{" "}
            your next critical product decision
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASING_SMOOTH }}
            className="text-base leading-relaxed text-primary-text/70 dark:text-primary-text/85 mb-0"
          >
            If you are building something new or navigating a major product shift and want clear direction before execution, let's talk.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.25, ease: EASING_SMOOTH }}
          >
            <ConversationCTA />
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 pt-8 border-t border-border space-y-2"
        >
          <p className="text-base text-primary-text/70 dark:text-primary-text/80">
            © {new Date().getFullYear()} Samantha Pede. All rights reserved.
          </p>
          <p className="text-sm text-primary-text/50 dark:text-primary-text/65">
            ♥ Custom made by Samantha Pede
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
