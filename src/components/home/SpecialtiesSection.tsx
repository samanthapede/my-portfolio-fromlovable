import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const specialties = [
  {
    title: "Web apps",
    description:
      "Complex, responsive web applications built for scale and usability.",
  },
  {
    title: "Mobile apps",
    description:
      "Thoughtful mobile experiences that feel native and intuitive.",
  },
  {
    title: "Websites",
    description:
      "Marketing sites and landing pages that convert and delight.",
  },
  {
    title: "0 → 1 projects",
    description:
      "Taking ideas from concept to shipped product with speed and clarity.",
  },
  {
    title: "Design leadership",
    description:
      "Guiding teams, setting direction, and raising the bar on craft.",
  },
  {
    title: "Strategy",
    description:
      "Aligning product vision with user needs and business objectives.",
  },
  {
    title: "Systems thinking",
    description:
      "Building scalable design systems and reusable component libraries.",
  },
  {
    title: "User research",
    description:
      "Grounding decisions in real user insights and behavioral data.",
  },
  {
    title: "Rapid prototyping",
    description:
      "High-fidelity prototypes to validate ideas before engineering invests.",
  },
];

export const SpecialtiesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-specialties dark:!bg-background"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h3 className="font-medium text-[#2E4150] dark:text-muted-foreground mb-4 text-xl">
            Specialties
          </h3>
          <h2 className="text-3xl xl:text-5xl font-bold leading-[1.4] max-w-3xl lg:text-4xl">
            Bringing your best ideas to&nbsp;life to{" "}
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-[#4A56D4] transition-colors duration-500 ease-out cursor-pointer hover:text-[#5E69D9]">
                    level up your business
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-sm bg-black/90 backdrop-blur-xl text-white border border-white/10 rounded-none px-5 py-4 text-base font-medium shadow-[0_0_30px_rgba(74,86,212,0.3)]"
                >
                  <p className="leading-relaxed">
                    🚀 I'm a Staff-level product designer with over a decade of
                    experience leading user experience, interface design, and
                    user research across fast-moving teams. I bring a mix of
                    strategic thinking and hands-on execution to every
                    engagement. I'm most effective when I'm helping product teams
                    move fast while staying focused on what matters. 🎯
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h2>
        </motion.div>

        {/* Numbered Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {isInView &&
            specialties.map((specialty, index) => (
              <motion.div
                key={specialty.title}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
                className="group"
              >
                <span className="block text-sm font-medium text-muted-foreground/50 mb-2 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                  {specialty.title}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {specialty.description}
                </p>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
