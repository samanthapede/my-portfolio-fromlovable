import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const PhilosophySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold mb-8"
          >
            Philosophy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl lg:text-3xl leading-relaxed text-muted-foreground"
          >
            Design, for me, is about{" "}
            <span className="text-foreground font-medium">clarity</span>,{" "}
            <span className="text-foreground font-medium">momentum</span>, and{" "}
            <span className="text-foreground font-medium">impact</span>. I thrive
            in environments where I can help shape the big picture, while sweating
            the details that make an experience truly work.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
