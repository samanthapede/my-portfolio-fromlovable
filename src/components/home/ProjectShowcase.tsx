import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Batching orders",
    description: "Multi-location order fulfillment",
    link: "/work",
  },
  {
    id: 2,
    title: "Fulfillable quantities",
    description: "Real-time inventory visibility",
    link: "/work",
  },
  {
    id: 3,
    title: "Inventory management",
    description: "Streamlined stock operations",
    link: "/work",
  },
  {
    id: 4,
    title: "UI systems",
    description: "Scalable design components",
    link: "/work",
  },
  {
    id: 5,
    title: "Dashboard analytics",
    description: "Data-driven merchant insights",
    link: "/work",
  },
  {
    id: 6,
    title: "Chatbot experience",
    description: "Conversational support flows",
    link: "/work",
  },
  {
    id: 7,
    title: "Sell from incoming",
    description: "Pre-arrival inventory sales",
    link: "/work",
  },
];

export const ProjectShowcase = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Triple the items: [clone-set] [original-set] [clone-set] for seamless looping
  const tripleProjects = [...projects, ...projects, ...projects];

  return (
    <section id="work" ref={sectionRef} className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto relative">
        {/* Chevron buttons - always visible for infinite scroll */}
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

        {/* Fade overlays */}
        <div className="absolute right-0 top-0 bottom-0 w-16 lg:w-24 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-24 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />

        {/* Scrollable row */}
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
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min((index % projects.length) * 0.1, 0.6),
                  ease: "easeOut",
                }}
                className="flex-shrink-0 w-[280px] lg:w-[300px]"
              >
                <Link to={project.link} className="group block">
                  <div className="bg-muted/50 dark:bg-muted/20 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-muted/70 dark:hover:bg-muted/30">
                    {/* Empty frame placeholder */}
                    <div className="aspect-square relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3/4 h-3/4 rounded-xl bg-gradient-to-br from-muted/60 to-muted/30 dark:from-muted/40 dark:to-muted/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                          <div className="w-16 h-16 rounded-lg bg-background/50 dark:bg-background/20 shadow-sm" />
                        </div>
                      </div>
                    </div>

                    {/* Project info */}
                    <div className="p-5">
                      <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
