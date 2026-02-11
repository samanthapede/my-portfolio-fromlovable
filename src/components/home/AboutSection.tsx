import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users,
  BarChart3,
  Compass,
  Layers,
  Flag,
  Rocket,
} from "lucide-react";
import headshot from "@/assets/headshot.jpg";

const strengths = [
  { icon: Compass, title: "Product clarity in ambiguous spaces", description: "Helping teams quickly make sense of complex problems and focus on what matters most." },
  { icon: Layers, title: "System and flow design", description: "Designing how products work end to end, not just how individual screens look." },
  { icon: BarChart3, title: "User-rooted decision making", description: "Translating research, data, and real user behavior into confident product direction." },
  { icon: Flag, title: "Vision to build-ready direction", description: "Turning long-term goals into clear, actionable next steps teams can actually ship." },
  { icon: Users, title: "Stakeholder alignment", description: "Creating shared understanding across product, engineering, and leadership." },
  { icon: Rocket, title: "Momentum without rework", description: "Helping teams move forward with confidence and avoid costly missteps." },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const highlightContainerRef = useRef<HTMLDivElement>(null);
  const highlightElementRef = useRef<HTMLDivElement>(null);
  const highlightTextRef = useRef<HTMLHeadingElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Set highlight dimensions: width matches container width, height matches text height + 40px padding
  useEffect(() => {
    const updateHighlightSize = () => {
      if (highlightContainerRef.current && highlightElementRef.current && highlightTextRef.current) {
        // Get the full container width including padding (this becomes the rotated width)
        const containerRect = highlightContainerRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;
        
        // Get the actual text height (this becomes the rotated height, but we need to add 40px padding)
        const textRect = highlightTextRef.current.getBoundingClientRect();
        const textHeight = textRect.height;
        
        // Set CSS custom properties
        // --highlight-height: container width (becomes rotated width)
        highlightElementRef.current.style.setProperty('--highlight-height', `${containerWidth}px`);
        // --highlight-width: text height + 40px (20px top + 20px bottom) (becomes rotated height)
        highlightElementRef.current.style.setProperty('--highlight-width', `${textHeight + 40}px`);
      }
    };

    if (isInView && highlightContainerRef.current && highlightTextRef.current) {
      // Use ResizeObserver for accurate measurements
      const resizeObserver = new ResizeObserver(() => {
        updateHighlightSize();
      });
      resizeObserver.observe(highlightContainerRef.current);
      resizeObserver.observe(highlightTextRef.current);
      
      // Initial update with multiple attempts to ensure accurate measurements
      updateHighlightSize();
      setTimeout(updateHighlightSize, 100);
      setTimeout(updateHighlightSize, 300);
      setTimeout(updateHighlightSize, 600);
      
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [isInView]);

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

  return (
    <section id="about" ref={ref} className="py-20 sm:py-24 lg:py-32 bg-specialties dark:bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* SVG gradient definition for icons - cool gradient at 24deg */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="cool-gradient-icons-about" x1="0%" y1="0%" x2="91.26%" y2="40.68%" gradientUnits="userSpaceOnUse">
              <stop offset="28.92%" stopColor="rgb(111, 33, 216)" />
              <stop offset="61.39%" stopColor="rgb(0, 97, 162)" />
              <stop offset="88.66%" stopColor="rgb(0, 125, 134)" />
            </linearGradient>
          </defs>
        </svg>
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
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
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
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-4 sm:mb-6 text-[#004E95] dark:warm-gradient-text"
            >
              About Sam
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
                className="text-base leading-relaxed text-[#004E95]/70"
              >
                I've spent over a decade helping teams design and ship complex products in fast-moving environments.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20, x: -10 }}
                animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 20, x: -10 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                  type: "spring",
                  stiffness: 100,
                  damping: 13
                }}
                className="text-base leading-relaxed text-[#004E95]/70"
              >
                I partner with founders and product leaders at moments when clarity matters most: early product definition, major new features, or times when teams need alignment before execution.
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
                className="text-base leading-relaxed text-[#004E95]/70"
              >
                Most recently, I spent 4+ years at Shopify as a Lead Designer working on large-scale systems across inventory, fulfillment, and shipping, where decisions had meaningful downstream impact and complexity was the norm.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20, x: -10 }}
                animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 20, x: -10 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                  type: "spring",
                  stiffness: 100,
                  damping: 13
                }}
                className="text-base leading-relaxed text-[#004E95]/70"
              >
                <p className="mb-3">Today, I work independently, helping teams:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>make sense of complex problem spaces</li>
                  <li>deeply understand their users (often beyond initial assumptions)</li>
                  <li>translate product vision into focused, build-ready direction</li>
                </ul>
              </motion.div>
            </div>

            <div className="relative mt-8 w-full">
              <div ref={highlightContainerRef} className="relative w-full inline-block" style={{ paddingTop: '20px', paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
                <div ref={highlightElementRef} className="warm-gradient-highlight absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: 1, visibility: 'visible' }}></div>
                <motion.h2
                  ref={highlightTextRef}
                  initial={{ opacity: 0, y: 25, scale: 0.97 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                    type: "spring",
                    stiffness: 90,
                    damping: 12
                  }}
                  className="text-lg md:text-xl font-medium text-[#004E95] text-left leading-normal relative z-10 w-full"
                >
                  I'm most effective when I can help teams focus on the most important thing, move intentionally, and align around a shared understanding of what they're building and why. For me, design is about clarity, momentum, and impact, not just execution.
                </motion.h2>
              </div>
            </div>
          </motion.div>
        </div>

        {/* What Teams Bring Me In For - grid for quick scanning */}
        <div className="mt-16 lg:mt-20 mb-0">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              ease: "easeOut"
            }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6 sm:mb-8 text-[#004E95] dark:warm-gradient-text"
          >
            What Teams Bring Me In For
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, delay: 0.65, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
          >
            {strengths.map((strength, index) => (
              <motion.div
                key={strength.title}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{
                  duration: 0.4,
                  delay: 0.7 + index * 0.05,
                  ease: "easeOut",
                }}
                className="flex flex-col gap-3 rounded-xl p-5 lg:p-6 bg-card border border-border hover:border-[#004E95]/20 hover:bg-muted/20 dark:hover:bg-muted/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-[#004E95]/10 dark:bg-[#004E95]/20">
                    <strength.icon className="w-5 h-5 text-[#004E95]" strokeWidth={1.5} stroke="currentColor" fill="none" />
                  </span>
                  <h4 className="text-[#004E95] font-semibold leading-tight">{strength.title}</h4>
                </div>
                <p className="text-[#004E95]/80 text-sm leading-relaxed pl-0">{strength.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
