import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Lightbulb,
  Users,
  Zap,
  BarChart3,
  Target,
  Handshake,
  Compass,
  Layers,
} from "lucide-react";
import headshot from "@/assets/headshot.jpg";

const strengths = [
  { icon: Lightbulb, label: <><strong>Strategic</strong> and system thinking</> },
  { icon: Users, label: <><strong>Leading teams</strong>, projects, and design cycles</> },
  { icon: Zap, label: <><strong>Hands-on</strong> execution & rapid iteration</> },
  { icon: BarChart3, label: <><strong>Translating research</strong> & data into user-centered designs</> },
  { icon: Target, label: <><strong>Balancing user needs</strong> with business goals</> },
  { icon: Handshake, label: <><strong>Collaborating</strong> to ship smart, scalable solutions</> },
  { icon: Compass, label: <>Stakeholder <strong>alignment</strong></> },
  { icon: Layers, label: <>Creating <strong>greenpath visions</strong> and viable MVPs</> },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const strengthsScrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [desktopStrengthIndex, setDesktopStrengthIndex] = useState(0);

  // Match photo height to content height on desktop
  useEffect(() => {
    const matchHeights = () => {
      if (window.innerWidth >= 1024 && contentRef.current && photoRef.current) {
        const contentHeight = contentRef.current.offsetHeight;
        photoRef.current.style.height = `${contentHeight}px`;
      } else if (photoRef.current) {
        photoRef.current.style.height = 'auto';
      }
    };

    matchHeights();
    window.addEventListener('resize', matchHeights);
    return () => window.removeEventListener('resize', matchHeights);
  }, [isInView, imageLoaded]);

  // Strengths carousel navigation
  const getStrengthCardWidth = useCallback(() => {
    const el = strengthsScrollRef.current;
    if (!el) return 280; // approximate card width + gap
    const firstCard = el.children[0] as HTMLElement | undefined;
    if (!firstCard) return 280;
    const gap = parseFloat(getComputedStyle(el).gap) || 24;
    return firstCard.offsetWidth + gap;
  }, []);

  const scrollStrengthToIndex = useCallback((index: number) => {
    const el = strengthsScrollRef.current;
    if (!el) return;
    const cardWidth = getStrengthCardWidth();
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  }, [getStrengthCardWidth]);

  const scrollStrengthDesktop = useCallback((direction: "left" | "right") => {
    const newIndex = direction === "right"
      ? (desktopStrengthIndex + 1) % strengths.length
      : (desktopStrengthIndex - 1 + strengths.length) % strengths.length;
    setDesktopStrengthIndex(newIndex);
    scrollStrengthToIndex(newIndex);
  }, [desktopStrengthIndex, scrollStrengthToIndex]);

  // Sync desktopStrengthIndex with manual scroll
  useEffect(() => {
    const el = strengthsScrollRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const cardWidth = getStrengthCardWidth();
        const idx = Math.round(el.scrollLeft / cardWidth);
        if (idx >= strengths.length) {
          el.scrollLeft = el.scrollLeft - strengths.length * cardWidth;
          setDesktopStrengthIndex(idx - strengths.length);
        } else if (idx < 0) {
          el.scrollLeft = el.scrollLeft + strengths.length * cardWidth;
          setDesktopStrengthIndex(idx + strengths.length);
        } else {
          setDesktopStrengthIndex(idx);
        }
        ticking = false;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [getStrengthCardWidth]);

  // Triple the items: [clone-set] [original-set] [clone-set] for seamless looping
  const tripleStrengths = [...strengths, ...strengths, ...strengths];

  return (
    <section id="about" ref={ref} className="py-16 lg:py-24 bg-[#F1F4FB] dark:bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row lg:grid lg:grid-cols-2 gap-5 md:gap-6 lg:gap-[74px] items-start">
          {/* Image - max 400px on small screens, text wraps beside it */}
          <motion.div
            ref={photoRef}
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-[400px] min-w-0 lg:w-full lg:max-w-full lg:flex-shrink-0"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-full w-full max-w-[400px] mx-auto lg:mx-0 lg:w-full lg:max-w-full">
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

          {/* Content - flex-1 min-w-0 so text wraps beside photo on small screens */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1 min-w-0 lg:flex-none"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.96 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
                type: "spring",
                stiffness: 100,
                damping: 14
              }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6"
            >
              Over a <span className="text-[#4A56D4]">decade of designing</span> intuitive, scalable interfaces that solve real problems
            </motion.h2>

            <div className="space-y-5">
              <motion.p
                initial={{ opacity: 0, y: 20, x: -10 }}
                animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 20, x: -10 }}
                transition={{
                  duration: 0.6,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                  type: "spring",
                  stiffness: 100,
                  damping: 13
                }}
                className="text-base leading-relaxed text-muted-foreground"
              >
                With over a decade of experience leading user experience, interface
                design, and user research across fast-moving teams. I now work
                independently, helping great companies design intuitive, scalable
                interfaces that solve real problems for real people.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20, x: -10 }}
                animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 20, x: -10 }}
                transition={{
                  duration: 0.6,
                  delay: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                  type: "spring",
                  stiffness: 100,
                  damping: 13
                }}
                className="text-base leading-relaxed text-muted-foreground"
              >
                Most recently, I spent 4+ years at Shopify as a lead designer in the
                logistics space, designing complex systems across Inventory,
                Fulfillment, and Shipping.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20, x: -10 }}
                animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 20, x: -10 }}
                transition={{
                  duration: 0.6,
                  delay: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                  type: "spring",
                  stiffness: 100,
                  damping: 13
                }}
                className="text-base leading-relaxed text-muted-foreground"
              >
                I bring a mix of strategic thinking and hands-on execution to every
                engagement. I'm most effective when I'm helping teams move fast while
                staying focused on what matters.
              </motion.p>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 25, scale: 0.97 }}
              transition={{
                duration: 0.7,
                delay: 0.55,
                ease: [0.16, 1, 0.3, 1],
                type: "spring",
                stiffness: 90,
                damping: 12
              }}
              className="text-xl font-semibold text-foreground mt-8 text-left leading-normal"
            >
              Design, for me, is about clarity, momentum, and impact. <span className="text-[#4A56D4]">I thrive in environments where I can help shape the big picture</span>, while sweating the details that make an experience truly work.
            </motion.h2>
          </motion.div>
        </div>

        {/* Key Strengths Carousel */}
        <div className="mt-16 lg:mt-20 mb-0">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              ease: "easeOut"
            }}
            className="text-xl md:text-2xl font-bold leading-tight text-left mb-8"
          >
            Key Strengths
          </motion.h3>

          {/* Scrollable carousel with chevrons */}
          <div className="relative">
            <motion.button
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              onClick={() => scrollStrengthDesktop("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              onClick={() => scrollStrengthDesktop("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </motion.button>

            {/* Fade overlays */}
            <div className="absolute right-0 top-0 bottom-0 w-16 lg:w-24 z-10 pointer-events-none bg-gradient-to-l from-[#F1F4FB] dark:from-background to-transparent" />
            <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-24 z-10 pointer-events-none bg-gradient-to-r from-[#F1F4FB] dark:from-background to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            >
              <div
                ref={strengthsScrollRef}
                className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-12"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {tripleStrengths.map((strength, index) => (
                  <motion.div
                    key={`${strength.label}-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{
                      duration: 0.5,
                      delay: Math.min((index % strengths.length) * 0.1, 0.6),
                      ease: "easeOut",
                    }}
                    className="flex-shrink-0 w-[260px] bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
                  >
                    <strength.icon className="w-8 h-8 text-primary mb-4" />
                    <p className="font-medium">{strength.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
