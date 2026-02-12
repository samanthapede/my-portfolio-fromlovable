import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Project = {
  id: number;
  title: string;
  description: string;
  link: string;
  overview?: string;
  role?: string;
  year?: string;
  /** Dot-separated tags shown on card (e.g. "E-commerce · Lead Design · 2024") */
  tags?: string[];
  /** Optional metrics for card (e.g. "+20% adoption") */
  metrics?: string[];
};

const LOREM = {
  batching:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  fulfillable:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident.",
  inventory:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  uiSystems:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
  dashboard:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
  chatbot:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
  sellIncoming:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

const projects: Project[] = [
  {
    id: 1,
    title: "Batching orders",
    description: "Multi-location order fulfillment",
    link: "/work",
    overview: LOREM.batching,
    role: "Lead Designer",
    year: "2024–2025",
    tags: ["E-commerce", "Lead Design", "2024–2025"],
  },
  {
    id: 2,
    title: "Fulfillable quantities",
    description: "Real-time inventory visibility",
    link: "/work",
    overview: LOREM.fulfillable,
    role: "Lead Designer",
    year: "2023–2024",
    tags: ["E-commerce", "Lead Design", "2023–2024"],
  },
  {
    id: 3,
    title: "Inventory management",
    description: "Streamlined stock operations",
    link: "/work",
    overview: LOREM.inventory,
    role: "Lead Designer",
    year: "2021–2022",
    tags: ["E-commerce", "Product Design", "2021–2022"],
  },
  {
    id: 4,
    title: "UI systems",
    description: "Scalable design components",
    link: "/work",
    overview: LOREM.uiSystems,
    role: "Design",
    year: "—",
    tags: ["Design Systems", "UI", "Components"],
  },
  {
    id: 5,
    title: "Dashboard analytics",
    description: "Data-driven merchant insights",
    link: "/work",
    overview: LOREM.dashboard,
    role: "Design",
    year: "—",
    tags: ["Analytics", "Dashboards", "Product Design"],
  },
  {
    id: 6,
    title: "Chatbot experience",
    description: "Conversational support flows",
    link: "/work",
    overview: LOREM.chatbot,
    role: "Design",
    year: "—",
    tags: ["Conversational UI", "Support", "Product Design"],
  },
  {
    id: 7,
    title: "Sell from incoming",
    description: "Pre-arrival inventory sales",
    link: "/work",
    overview: LOREM.sellIncoming,
    role: "Design",
    year: "—",
    tags: ["E-commerce", "Inventory", "Product Design"],
  },
];

export const ProjectShowcase = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const tagLine = (project: Project) => {
    if (project.tags && project.tags.length > 0) {
      return project.tags.join(" · ");
    }
    const parts = [project.role, project.year].filter(Boolean);
    return parts.length ? parts.join(" · ") : "";
  };

  const featuredProjects = projects.slice(0, 3);

  const projectCard = (project: Project) => (
    <button
      type="button"
      onClick={() => setSelectedProject(project)}
      className="project-card-hover group flex w-full flex-col lg:flex-row text-left rounded-2xl overflow-hidden border-2 border-border bg-card transition-colors hover:border-primary/30 hover:bg-muted/20 dark:hover:bg-muted/10 active:scale-[0.98] touch-manipulation"
    >
      {/* Photo: always left, 4:3 aspect ratio */}
      <div className="w-full lg:w-1/2 aspect-[4/3] flex-shrink-0 bg-muted/50 dark:bg-muted/20 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/60 to-muted/30 dark:from-muted/40 dark:to-muted/10">
          <div className="w-24 h-24 rounded-xl bg-background/50 dark:bg-background/20 shadow-sm" />
        </div>
      </div>
      {/* Content: always right */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-10">
        <h3 className="font-semibold text-primary-text dark:text-section-heading text-xl sm:text-2xl lg:text-3xl mb-1 group-hover:warm-gradient-text-nav dark:group-hover:text-primary-text transition-all duration-300 ease-in-out">
          {project.title}
        </h3>
        <p className="text-primary-text/90 text-base mb-2">
          {project.description}
        </p>
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
        <span className="inline-flex items-center font-medium text-primary-text dark:text-section-heading text-sm group-hover:warm-gradient-text-nav dark:group-hover:text-primary-text transition-all duration-300 ease-in-out">
          View
          <ChevronRight className="w-4 h-4 ml-0.5 opacity-70" />
        </span>
      </div>
    </button>
  );

  return (
    <section id="work" ref={sectionRef} className="py-20 sm:py-24 lg:py-32">
      {/* Match About section: container + padding; photo left, content right */}
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10 sm:mb-12 lg:mb-14"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-4 sm:mb-6 text-primary-text dark:text-section-heading">
            Selected work
          </h2>
          <p className="text-base sm:text-lg text-primary-text/90 max-w-[70ch] leading-relaxed">
            A few examples of how I help teams make sense of complex product spaces, align around a clear vision, and move forward with confidence.
          </p>
        </motion.div>
        <div className="flex flex-col gap-8 lg:gap-12">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.1,
                ease: "easeOut",
              }}
              className="w-full"
            >
              {projectCard(project)}
            </motion.article>
          ))}
        </div>
      </div>

      {/* Project detail modal (mantoothux-style structure) — Framer Motion */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-7xl w-[96vw] max-h-[95vh] overflow-y-auto p-0 gap-0 border-0 sm:rounded-2xl">
          <AnimatePresence mode="wait">
            {selectedProject && (
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <DialogHeader className="p-6 pb-4 pr-12 sm:p-8 sm:pb-6 sm:pr-12 space-y-1 text-left">
                  <motion.span
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="text-sm font-medium text-muted-foreground tabular-nums block"
                  >
                    {String(selectedProject.id).padStart(2, "0")}
                  </motion.span>
                  <DialogTitle className="text-xl sm:text-2xl md:text-3xl leading-tight">
                    <motion.span
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="block"
                    >
                      {selectedProject.title}
                    </motion.span>
                  </DialogTitle>
                </DialogHeader>

                {/* Hero / feature image area */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full aspect-video bg-muted/50 dark:bg-muted/20 flex items-center justify-center"
                >
                  <div className="w-4/5 max-w-xs aspect-video rounded-xl bg-gradient-to-br from-muted/60 to-muted/30 dark:from-muted/40 dark:to-muted/10 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-lg bg-background/50 dark:bg-background/20 shadow-sm" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="p-6 pt-6 sm:p-8 sm:pt-8 space-y-6">
                  {selectedProject.overview && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.25, ease: "easeOut" }}
                    >
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Overview
                      </h4>
                      <p className="text-base leading-relaxed text-primary-text">
                        {selectedProject.overview}
                      </p>
                    </motion.div>
                  )}
                  {(selectedProject.role || selectedProject.year) && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.35, ease: "easeOut" }}
                      className="flex flex-wrap gap-6 text-sm"
                    >
                      {selectedProject.role && (
                        <div>
                          <span className="text-muted-foreground">Role</span>
                          <p className="font-medium text-primary-text">{selectedProject.role}</p>
                        </div>
                      )}
                      {selectedProject.year && (
                        <div>
                          <span className="text-muted-foreground">Year</span>
                          <p className="font-medium text-primary-text">{selectedProject.year}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.45 }}
                    className="pt-2"
                  >
                    <Link
                      to={selectedProject.link}
                      className="inline-flex items-center font-medium text-primary-text hover:warm-gradient-text-nav hover:underline transition-all duration-300 ease-in-out"
                      onClick={() => setSelectedProject(null)}
                    >
                      View full case study →
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
};
