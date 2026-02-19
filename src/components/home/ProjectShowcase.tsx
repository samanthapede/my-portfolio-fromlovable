import { useRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";

const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const ProjectShowcase = () => {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const tagLine = (project: (typeof projects)[0]) => {
    if (project.tags && project.tags.length > 0) {
      return project.tags.join(" · ");
    }
    const parts = [project.role, project.year].filter(Boolean);
    return parts.length ? parts.join(" · ") : "";
  };

  const getProjectThumbnail = (project: (typeof projects)[0]) => {
    const first = project.homepageCover ?? project.carouselItems?.[0] ?? project.images?.[0];
    if (!first) return null;
    if (typeof first === "string") return { type: "image" as const, url: first };
    return first;
  };

  const featuredProjects = projects.slice(0, 3);

  const projectCard = (project: (typeof projects)[0]) => {
    const thumbnail = getProjectThumbnail(project);
    const isLocked = project.locked === true;
    return (
    <div className="project-card-border-wrapper group transition-transform duration-150 group-active:scale-[0.98] relative">
      {isLocked && (
        <span className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/90 dark:bg-muted/70 border border-border backdrop-blur-sm" title="Password protected">
          <Lock className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Locked</span>
        </span>
      )}
      <a
        href={project.link}
        className="project-card-hover group group/view flex w-full flex-col lg:flex-row text-left rounded-2xl overflow-hidden border border-border bg-card transition-colors touch-manipulation block"
        onMouseEnter={(e) => e.currentTarget.querySelector("video")?.play()}
        onMouseLeave={(e) => {
          const video = e.currentTarget.querySelector("video");
          if (video) {
            video.pause();
            video.currentTime = 0;
          }
        }}
      >
        {/* Photo: always left — 4:3 ratio fits most project images across breakpoints */}
        <div className="w-full lg:w-1/2 aspect-[4/3] flex-shrink-0 bg-muted/50 dark:bg-muted/20 overflow-hidden relative">
          {thumbnail?.type === "videoFile" && thumbnail.url ? (
            <>
              {"poster" in thumbnail && thumbnail.poster ? (
                <img
                  src={thumbnail.poster}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-center scale-[1.35] sm:scale-[1.25] md:scale-[1.15] lg:scale-100 origin-center"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              ) : null}
              <video
                src={thumbnail.url}
                className="absolute inset-0 w-full h-full object-cover object-center scale-[1.35] sm:scale-[1.25] md:scale-[1.15] lg:scale-100 origin-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                style={{
                  objectFit: project.imageCrop?.objectFit ?? "cover",
                  objectPosition: project.imageCrop?.objectPosition ?? "center",
                }}
                muted
                playsInline
                loop
                preload="metadata"
                aria-hidden
              />
            </>
          ) : thumbnail?.type === "image" && thumbnail.url ? (
            <img
              src={thumbnail.url}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center scale-[1.35] sm:scale-[1.25] md:scale-[1.15] lg:scale-100 origin-center"
              style={{
                objectFit: project.imageCrop?.objectFit ?? "cover",
                objectPosition: project.imageCrop?.objectPosition ?? "center",
              }}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/60 to-muted/30 dark:from-muted/40 dark:to-muted/10">
              <div className="w-24 h-24 rounded-xl bg-background/50 dark:bg-background/20 shadow-sm" />
            </div>
          )}
        </div>
        {/* Content: always right */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-4 sm:p-6 lg:p-10">
          <h3 className="font-semibold text-primary-text dark:text-section-heading text-xl sm:text-2xl lg:text-3xl mb-1 group-hover:text-[#004E95] dark:group-hover:text-[#5B9BD5] transition-all duration-300 ease-in-out">
            {project.title}
          </h3>
          {tagLine(project) && (
            <p className="text-sm text-primary-text/60 mb-4">
              {tagLine(project)}
            </p>
          )}
          {/* Keyword pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-medium text-primary-text bg-[#004E95]/10 rounded-full border border-[#004E95]/20">
              Keyword 1
            </span>
            <span className="px-3 py-1 text-xs font-medium text-primary-text bg-[#004E95]/10 rounded-full border border-[#004E95]/20">
              Keyword 2
            </span>
            <span className="px-3 py-1 text-xs font-medium text-primary-text bg-[#004E95]/10 rounded-full border border-[#004E95]/20">
              Keyword 3
            </span>
          </div>
          <span className="inline-flex items-center text-primary-text dark:text-section-heading text-sm group-hover:text-[#004E95] dark:group-hover:text-[#5B9BD5] transition-colors duration-300 group/view cursor-pointer">
            <span className="relative inline-block origin-left">
              <span className="invisible font-bold text-sm" aria-hidden="true">{isLocked ? "Request access" : "View"}</span>
              <span className="absolute left-0 top-0 font-medium group-hover/view:font-bold transition-all duration-200 ease-out">
                {isLocked ? "Request access" : "View"}
              </span>
            </span>
            <span className="ml-0.5 shrink-0 transition-all duration-200 ease-out [&>svg]:opacity-70 group-hover/view:[&>svg]:opacity-100">
              <ArrowRight className="w-4 h-4" />
            </span>
          </span>
        </div>
      </a>
    </div>
  );
  };

  return (
    <section id="work" ref={sectionRef} className="py-16 sm:py-20 lg:py-32 overflow-x-clip">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 overflow-x-clip">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px", amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-12 lg:mb-14"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-4 sm:mb-6 text-primary-text dark:text-section-heading">
            Selected work
          </h2>
          <p className="text-base sm:text-lg text-primary-text/90 max-w-[70ch] leading-relaxed">
            A few examples of how I help teams make sense of complex product spaces, align around a clear vision, and move forward with confidence.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col gap-6 sm:gap-8 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px", amount: 0.15 }}
          variants={reducedMotion ? undefined : sectionVariants}
        >
          {featuredProjects.map((project) => (
            <motion.article
              key={project.id}
              variants={reducedMotion ? undefined : itemVariants}
              className="w-full"
            >
              {projectCard(project)}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
