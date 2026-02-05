import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import headshot from "@/assets/headshot.jpg";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section ref={ref} className="py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
              {isInView && (
                <img
                  src={headshot}
                  alt="Samantha Pede"
                  className={`w-full h-full object-cover object-top transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 gradient-line rounded-full blur-2xl opacity-30" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-medium text-[#2E4150] dark:text-muted-foreground mb-4 text-xl">
              About
            </h3>
            <h2 className="text-3xl xl:text-4xl font-bold mb-6 leading-[1.4]">
              A decade of designing intuitive, scalable interfaces that solve real problems
            </h2>

            <div className="space-y-5">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-base leading-relaxed text-muted-foreground"
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
                className="text-base leading-relaxed text-muted-foreground"
              >
                Most recently, I spent 4+ years at Shopify as a lead designer in the
                logistics space, designing complex systems across Inventory,
                Fulfillment, and Shipping. I'm particularly proud of leading the
                design and execution of a CEO-sponsored initiative — collaborating
                directly with Shopify's senior leadership to bring a bold new
                fulfillment vision to life.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base leading-relaxed text-muted-foreground"
              >
                I bring a mix of strategic thinking and hands-on execution to every
                engagement. I'm most effective when I'm helping teams move fast while
                staying focused on what matters.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
