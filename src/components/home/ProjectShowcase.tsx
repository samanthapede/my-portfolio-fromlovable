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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, isInView]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("div")?.offsetWidth ?? 300;
    const amount = direction === "left" ? -cardWidth - 24 : cardWidth + 24;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto relative">
        {/* Chevron buttons */}
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => scroll("left")}
            className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </motion.button>
        )}
        {canScrollRight && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => scroll("right")}
            className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </motion.button>
        )}

        {/* Right fade overlay to hint at more content */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-16 lg:w-24 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
        )}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-24 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
        )}

        {/* Scrollable row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            ref={scrollRef}
            className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-12 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="flex-shrink-0 w-[280px] lg:w-[300px] snap-start"
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
