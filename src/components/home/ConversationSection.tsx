import { motion } from "framer-motion";
import { HighlightText } from "@/components/HighlightText";
import { ConversationCTA } from "@/components/ConversationCTA";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASING_SMOOTH, VIEWPORT_DEFAULT } from "@/lib/constants";

export function ConversationSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="py-16 sm:py-20 lg:py-32 border-solid border-0 bg-warm-gradient-subtle-conversation overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl space-y-8 sm:space-y-10 lg:space-y-12">
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_DEFAULT}
            transition={{ duration: 0.6, delay: 0.1, ease: EASING_SMOOTH }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal leading-tight mb-0 text-primary-text"
          >
            I help teams make
            <br className="sm:hidden" />
            <HighlightText
              variant="about"
              delay={0.4}
              duration={0.55}
              className="font-semibold"
              viewport={{ once: true, amount: "some" }}
            >
              the right product decisions early
            </HighlightText>
            ,<br className="sm:hidden" /> so they can move forward with confidence.
          </motion.p>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_DEFAULT}
            transition={{ duration: 0.55, delay: 0.2, ease: EASING_SMOOTH }}
          >
            <ConversationCTA />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
