import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">About</h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg leading-relaxed mb-6 text-muted-foreground"
          >
            With over a decade of experience leading user experience, interface
            design, and user research across fast-moving teams. I now work
            independently, helping great companies design intuitive, scalable
            interfaces that solve real problems for real people.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed mb-6 text-muted-foreground"
          >
            Over the past 10+ years, I've worked with startups and enterprise
            organizations across a range of industries. Most recently, I spent 4+
            years at Shopify as a lead designer in the logistics space, designing
            complex systems across Inventory, Fulfillment, and Shipping. I'm
            particularly proud of leading the design and execution of a
            CEO-sponsored initiative — collaborating directly with Shopify's senior
            leadership to bring a bold new fulfillment vision to life. That work was
            approved for build and is expected to transform how merchants fulfill
            orders at scale.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg leading-relaxed text-muted-foreground"
          >
            I bring a mix of strategic thinking and hands-on execution to every
            engagement. I'm most effective when I'm helping teams move fast while
            staying focused on what matters.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
