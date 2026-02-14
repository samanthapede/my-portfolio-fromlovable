import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useConversationModal } from "@/contexts/ConversationModalContext";
import { HighlightText } from "@/components/HighlightText";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px", amount: 0.2 });
  const reducedMotion = useReducedMotion();
  const { openDialog } = useConversationModal();

  return (
    <footer id="contact" ref={footerRef} className="bg-warm-gradient-subtle border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-24">
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          <motion.h2
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base leading-relaxed text-primary-text/70 mb-0"
          >
            If you are building something new or navigating a major product shift and want clear direction before execution, let's talk.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
          <Button
            size="lg"
            variant="outline"
            onClick={openDialog}
            className="conversation-cta-btn rounded-lg px-8 py-6 text-lg font-medium transition-all duration-300 hover:bg-background"
          >
            <span className="relative z-10">Start a conversation</span>
          </Button>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 pt-8 border-t border-border"
        >
          <p className="text-base text-primary-text/70">
            © {new Date().getFullYear()} Samantha Pede. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
