import { motion } from "framer-motion";
import { HighlightText } from "@/components/HighlightText";
import { Button } from "@/components/ui/button";
import { useConversationModal } from "@/contexts/ConversationModalContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const ConversationSection = () => {
  const { openDialog } = useConversationModal();
  const reducedMotion = useReducedMotion();

  return (
    <section className="py-16 sm:py-20 lg:py-32 border-solid border-0 bg-warm-gradient-subtle-conversation overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl space-y-8 sm:space-y-10 lg:space-y-12">
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px", amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal leading-tight mb-0 text-primary-text"
          >
            I help teams make{" "}
            <HighlightText variant="about" delay={0.4} duration={0.55} className="font-semibold">
              the right product decisions early
            </HighlightText>
            , so they can move forward with confidence.
          </motion.p>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px", amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
      </div>
    </section>
  );
};
