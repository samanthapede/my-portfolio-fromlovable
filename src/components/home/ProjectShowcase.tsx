import { useRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { projects } from "@/data/projects";
import { ProjectCard, SECTION_VARIANTS, ITEM_VARIANTS } from "./ProjectCard";
import { EASING_SMOOTH, VIEWPORT_DEFAULT, VIEWPORT_EARLY } from "@/lib/constants";

const FEATURED_COUNT = 3;

export function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const featuredProjects = projects.slice(0, FEATURED_COUNT);

  return (
    <section id="work" ref={sectionRef} className="py-16 sm:py-20 lg:py-32 overflow-x-clip">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 overflow-x-clip">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_DEFAULT}
          transition={{ duration: 0.55, ease: EASING_SMOOTH }}
          className="mb-10 sm:mb-12 lg:mb-14"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-4 sm:mb-6 text-primary-text dark:text-section-heading">
            Selected work
          </h2>
          <p className="text-base sm:text-lg text-primary-text/90 dark:text-primary-text/85 max-w-[70ch] leading-relaxed">
            A few examples of how I help teams make sense of complex product spaces, align around a
            clear vision, and move forward with confidence.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col gap-6 sm:gap-8 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EARLY}
          variants={reducedMotion ? undefined : SECTION_VARIANTS}
        >
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={reducedMotion ? undefined : ITEM_VARIANTS}
              className="w-full"
            >
              <ProjectCard project={project} index={index} reducedMotion={reducedMotion} />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
