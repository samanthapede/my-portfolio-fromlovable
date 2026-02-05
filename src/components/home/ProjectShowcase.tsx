import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
};

const projects: Project[] = [
  {
    id: 1,
    title: "Batching orders",
    description: "Multi-location order fulfillment",
    link: "/work",
    overview: "Designing tools that help merchants group and fulfill orders across multiple locations efficiently.",
    role: "Lead Designer",
    year: "2024–2025",
  },
  {
    id: 2,
    title: "Fulfillable quantities",
    description: "Real-time inventory visibility",
    link: "/work",
    overview: "Surfacing real-time fulfillable quantities so merchants can sell what they can ship.",
    role: "Lead Designer",
    year: "2023–2024",
  },
  {
    id: 3,
    title: "Inventory management",
    description: "Streamlined stock operations",
    link: "/work",
    overview: "Foundational inventory tracking and operations for merchants at scale.",
    role: "Lead Designer",
    year: "2021–2022",
  },
  {
    id: 4,
    title: "UI systems",
    description: "Scalable design components",
    link: "/work",
    overview: "Design systems and components that scale across products and platforms.",
    role: "Design",
    year: "—",
  },
  {
    id: 5,
    title: "Dashboard analytics",
    description: "Data-driven merchant insights",
    link: "/work",
    overview: "Turning data into clear, actionable insights for merchant dashboards.",
    role: "Design",
    year: "—",
  },
  {
    id: 6,
    title: "Chatbot experience",
    description: "Conversational support flows",
    link: "/work",
    overview: "Conversational interfaces that make support and discovery feel natural.",
    role: "Design",
    year: "—",
  },
  {
    id: 7,
    title: "Sell from incoming",
    description: "Pre-arrival inventory sales",
    link: "/work",
    overview: "Enabling merchants to sell inventory before it arrives, with clear availability.",
    role: "Design",
    year: "—",
  },
];

export const ProjectShowcase = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const goPrev = useCallback(() => {
    setMobileIndex((i) => (i - 1 + projects.length) % projects.length);
  }, []);
  const goNext = useCallback(() => {
    setMobileIndex((i) => (i + 1) % projects.length);
  }, []);

  const getCardWidth = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 324; // 300 + 24 gap
    const firstCard = el.children[0] as HTMLElement | undefined;
    if (!firstCard) return 324;
    const gap = parseFloat(getComputedStyle(el).gap) || 24;
    return firstCard.offsetWidth + gap;
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = getCardWidth();
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  }, [getCardWidth]);

  const scroll = useCallback((direction: "left" | "right") => {
    const newIndex = direction === "right"
      ? (currentIndex + 1) % projects.length
      : (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  }, [currentIndex, scrollToIndex]);

  // Sync currentIndex with manual scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const cardWidth = getCardWidth();
        const idx = Math.round(el.scrollLeft / cardWidth);
        // When we've scrolled past the original set into the cloned set, jump back
        if (idx >= projects.length) {
          el.scrollLeft = el.scrollLeft - projects.length * cardWidth;
          setCurrentIndex(idx - projects.length);
        } else if (idx < 0) {
          el.scrollLeft = el.scrollLeft + projects.length * cardWidth;
          setCurrentIndex(idx + projects.length);
        } else {
          setCurrentIndex(idx);
        }
        ticking = false;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [getCardWidth]);


  // Triple the items: [clone-set] [original-set] [clone-set] for seamless looping
  const tripleProjects = [...projects, ...projects, ...projects];

  // After initial render, set scroll position to the start of the middle copy
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isInView) return;
    // Small delay to let DOM render
    const timer = setTimeout(() => {
      const cardWidth = getCardWidth();
      el.scrollLeft = projects.length * cardWidth;
    }, 50);
    return () => clearTimeout(timer);
  }, [isInView, getCardWidth]);

  const projectCard = (project: Project) => (
    <button
      type="button"
      onClick={() => setSelectedProject(project)}
      className="group block w-full text-left"
    >
      <div className="bg-muted/50 dark:bg-muted/20 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-muted/70 dark:hover:bg-muted/30">
        <div className="aspect-square relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/4 rounded-xl bg-gradient-to-br from-muted/60 to-muted/30 dark:from-muted/40 dark:to-muted/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <div className="w-16 h-16 rounded-lg bg-background/50 dark:bg-background/20 shadow-sm" />
            </div>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-base">
            {project.description}
          </p>
        </div>
      </div>
    </button>
  );

  return (
    <section id="work" ref={sectionRef} className="py-12 lg:py-20">
      {/* Mobile: single card with chevron navigation (matches Testimonials layout) */}
      {isInView && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative w-full lg:hidden"
        >
          <div className="container mx-auto px-6 lg:px-12 flex items-center gap-2 lg:gap-4">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              onClick={goPrev}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full max-w-[280px] mx-auto"
                >
                  {projectCard(projects[mobileIndex])}
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              onClick={goNext}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Desktop: scrollable row with absolute chevrons */}
      <div className="max-w-7xl mx-auto relative hidden lg:block">
        <motion.button
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          onClick={() => scroll("left")}
          className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          onClick={() => scroll("right")}
          className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </motion.button>

        <div className="absolute right-0 top-0 bottom-0 w-16 lg:w-24 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-24 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            ref={scrollRef}
            className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {tripleProjects.map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: 10 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : { opacity: 0, y: 40, scale: 0.9, rotateX: 10 }}
                transition={{
                  duration: 0.6,
                  delay: Math.min((index % projects.length) * 0.12, 0.7),
                  ease: [0.34, 1.56, 0.64, 1],
                  type: "spring",
                  stiffness: 90,
                  damping: 12
                }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="flex-shrink-0 w-[280px] lg:w-[300px]"
              >
                {projectCard(project)}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project detail modal (mantoothux-style structure) — Framer Motion */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 gap-0 border-0 sm:rounded-2xl">
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
                  <DialogTitle className="text-2xl md:text-3xl font-bold leading-tight">
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
                      <p className="text-base leading-relaxed text-foreground">
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
                          <p className="font-medium text-foreground">{selectedProject.role}</p>
                        </div>
                      )}
                      {selectedProject.year && (
                        <div>
                          <span className="text-muted-foreground">Year</span>
                          <p className="font-medium text-foreground">{selectedProject.year}</p>
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
                      className="inline-flex items-center font-medium text-primary hover:underline"
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
