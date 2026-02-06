import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const specialties = [
  {
    title: "Product Design & Growth",
    description:
      "Crafting high-performing digital products — from web apps to marketing sites — that scale beautifully and drive results. Every interaction is designed to delight and convert.",
  },
  {
    title: "Strategy & Systems",
    description:
      "Turning vision into actionable product strategy. I connect user needs with business goals, design scalable systems, and create clarity from complexity.",
  },
  {
    title: "0 → 1 Leadership",
    description:
      "Guiding bold ideas from concept to launch with speed, insight, and craft. Whether leading teams or shaping direction, I help organizations move fast and build right.",
  },
];

export const SpecialtiesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="pt-8 lg:pt-12 pb-16 lg:pb-24 bg-specialties dark:!bg-background"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: "easeOut"
          }}
          className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-6"
        >
          Specialties
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10">
          {specialties.map((specialty, index) => (
            <motion.div
              key={specialty.title}
              initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : { opacity: 0, y: 40, scale: 0.9, rotateX: 10 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.34, 1.56, 0.64, 1],
                type: "spring",
                stiffness: 100,
                damping: 12
              }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08 + 0.2,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                className="block text-sm font-medium text-muted-foreground/50 mb-2 tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
              <h4 className="text-lg font-semibold mb-1">
                {specialty.title}
              </h4>
              <p className="text-base leading-relaxed text-muted-foreground">
                {specialty.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
