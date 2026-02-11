import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import victorImg from "@/assets/testimonials/victor.png";
import cassiaImg from "@/assets/testimonials/cassia.png";
import zackImg from "@/assets/testimonials/zack.png";
import emilyImg from "@/assets/testimonials/emily.png";
import joshImg from "@/assets/testimonials/josh.png";
import pivotalLogo from "@/assets/logos/pivotal.png";
import shopifyLogo from "@/assets/logos/shopify.png";
import vizientLogo from "@/assets/logos/vizient.png";
import vmwareLogo from "@/assets/logos/vmware.png";
import cheggLogo from "@/assets/logos/chegg.png";
import dribbbleLogo from "@/assets/logos/dribbble.png";
import healthtalkLogo from "@/assets/logos/healthtalk-ai.png";
import hexaradLogo from "@/assets/logos/hexarad.png";
import hippLogo from "@/assets/logos/hipp.png";
import augintelLogo from "@/assets/logos/augintel.png";

const testimonials = [{
  id: 1,
  quote: <>Sam has a rare ability to make the complex simple and the difficult seem effortless. I've had the privilege of working with her on some of the most challenging and ambiguous projects of my career, and one quality stands out above all: Sam embraces complexity and ambiguity, consistently delivering high-quality solutions at an impressive speed—all while keeping the team and stakeholders fully aligned and informed.</>,
  highlightText: "Sam embraces complexity and ambiguity, consistently delivering high-quality solutions at an impressive speed—all while keeping the team and stakeholders fully aligned and informed.",
  author: "Víctor Niharra Fe",
  role: "Leading Product at Shopify",
  image: victorImg
}, {
  id: 2,
  quote: <>[Sam is] one of the most compelling presenters and storytellers I know, with a rare ability to connect the dots between complex user needs and business goals. I've seen her dive fearlessly into the most challenging problem spaces, break down potential solutions with exceptional clarity, and navigate stakeholder feedback with ease. Every solution she delivers is beautifully crafted, deeply thoughtful, and always rooted in user needs. Sam is the kind of teammate who makes the whole team better.</>,
  highlightText: "I've seen her dive fearlessly into the most challenging problem spaces, break down potential solutions with exceptional clarity, and navigate stakeholder feedback with ease.",
  author: "Cassia Brooks",
  role: "Staff Product Designer at Shopify",
  image: cassiaImg
}, {
  id: 3,
  quote: <>I can't say enough good things about Sam. Not only is she a seriously talented and professional UX designer and researcher, but she's just a tremendous joy to be around and work with. She radiates empathy for users' experiences and she truly cares about her work. I hope that my path crosses with Sam's in the future. I'd gladly welcome the opportunity to work with her again.</>,
  highlightText: "She radiates empathy for users' experiences and she truly cares about her work.",
  author: "Zack Onisko",
  role: "Former CEO at Dribbble",
  image: zackImg
}, {
  id: 4,
  quote: <>Sam is a self-starter with great instincts for what is needed to move a decision forward. Her pace, fast problem solving, and breadth of problem solving is extraordinary. She has a bias to ship and get things done, balancing long-term goals with respect for timelines, while always maintaining the high quality bar we set at Shopify. I would jump at any opportunity to work with her again!</>,
  highlightText: "Her pace, fast problem solving, and breadth of problem solving is extraordinary.",
  author: "Emily Rucker",
  role: "Senior UX Manager at Shopify",
  image: emilyImg
}, {
  id: 5,
  quote: <>Sam is a top notch human-focused designer. Sam quickly diagnoses root problems and designs elegant, intuitive and efficient solutions. In our time working together, Sam was someone I always looked to for feedback on my designs work, knowing that her intuition and high bar for quality would elevate my work. In my time working with Sam, every project team was relieved and grateful when she was assigned to their project. When Sam is on your team, you know the end result will be amazing and the process getting there will be easy and fun.</>,
  highlightText: "every project team was relieved and grateful when she was assigned to their project.",
  author: "Josh Mantooth",
  role: "Senior Staff Product Designer at Paypal",
  image: joshImg
}];

const companyLogos = [{
  name: "Shopify",
  logo: shopifyLogo,
  size: "h-7 lg:h-9"
}, {
  name: "Dribbble",
  logo: dribbbleLogo,
  size: "h-9 lg:h-11"
}, {
  name: "VMware",
  logo: vmwareLogo,
  size: "h-7 lg:h-9"
}, {
  name: "Pivotal",
  logo: pivotalLogo,
  size: "h-7 lg:h-9"
}, {
  name: "Chegg",
  logo: cheggLogo,
  size: "h-7 lg:h-9"
}, {
  name: "HealthTalk AI",
  logo: healthtalkLogo,
  size: "h-7 lg:h-9"
}, {
  name: "Vizient",
  logo: vizientLogo,
  size: "h-7 lg:h-9"
}, {
  name: "Hexarad",
  logo: hexaradLogo,
  size: "h-7 lg:h-9"
}, {
  name: "Hipp",
  logo: hippLogo,
  size: "h-7 lg:h-9"
}, {
  name: "Augintel",
  logo: augintelLogo,
  size: "h-7 lg:h-9"
}];

export const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const logosRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const logosInView = useInView(logosRef, { once: true, margin: "-50px" });
  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [mobileLogoIndex, setMobileLogoIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  // Helper function to render quote with highlight on hover
  const renderQuote = (testimonial: typeof testimonials[0], isHovered: boolean) => {
    const highlightText = testimonial.highlightText;
    
    if (!highlightText) {
      return <>{testimonial.quote}</>;
    }

    // Extract text content from React element
    const getTextContent = (element: React.ReactNode): string => {
      if (typeof element === 'string') return element;
      if (typeof element === 'number') return String(element);
      if (Array.isArray(element)) {
        return element.map(getTextContent).join('');
      }
      if (element && typeof element === 'object' && 'props' in element) {
        return getTextContent(element.props.children);
      }
      return '';
    };

    const quoteText = getTextContent(testimonial.quote);
    
    if (!quoteText.includes(highlightText)) {
      return <>{testimonial.quote}</>;
    }

    const parts = quoteText.split(highlightText);
    if (parts.length !== 2) {
      return <>{testimonial.quote}</>;
    }

    return (
      <>
        {parts[0]}
        <span className={isHovered ? (isDark ? "warm-gradient-text-testimonial font-bold transition-all duration-300" : "warm-gradient-text-testimonial-light font-bold transition-all duration-300") : "font-bold transition-all duration-300"}>
          {highlightText}
        </span>
        {parts[1]}
      </>
    );
  };

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const goPrev = useCallback(() => {
    setMobileIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, []);
  const goNext = useCallback(() => {
    setMobileIndex((i) => (i + 1) % testimonials.length);
  }, []);

  const goPrevLogo = useCallback(() => {
    setMobileLogoIndex((i) => (i - 1 + companyLogos.length) % companyLogos.length);
  }, []);
  const goNextLogo = useCallback(() => {
    setMobileLogoIndex((i) => (i + 1) % companyLogos.length);
  }, []);

  const getCardWidth = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 516; // 500 + 16 gap
    const firstCard = el.children[0] as HTMLElement | undefined;
    if (!firstCard) return 516;
    const gap = parseFloat(getComputedStyle(el).gap) || 24;
    return firstCard.offsetWidth + gap;
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = getCardWidth();
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  }, [getCardWidth]);

  const scrollDesktop = useCallback((direction: "left" | "right") => {
    const newIndex = direction === "right"
      ? (desktopIndex + 1) % testimonials.length
      : (desktopIndex - 1 + testimonials.length) % testimonials.length;
    setDesktopIndex(newIndex);
    scrollToIndex(newIndex);
  }, [desktopIndex, scrollToIndex]);

  // Sync desktopIndex with manual scroll
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
        if (idx >= testimonials.length) {
          el.scrollLeft = el.scrollLeft - testimonials.length * cardWidth;
          setDesktopIndex(idx - testimonials.length);
        } else if (idx < 0) {
          el.scrollLeft = el.scrollLeft + testimonials.length * cardWidth;
          setDesktopIndex(idx + testimonials.length);
        } else {
          setDesktopIndex(idx);
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
    const timer = setTimeout(() => {
      const cardWidth = getCardWidth();
      el.scrollLeft = testimonials.length * cardWidth;
    }, 50);
    return () => clearTimeout(timer);
  }, [isInView, getCardWidth]);

  // Triple the items: [clone-set] [original-set] [clone-set] for seamless looping
  const tripleTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 lg:py-32 overflow-x-hidden pt-[90px] pb-16 sm:pb-20 lg:pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.96 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="text-left mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-4 sm:mb-6 text-[#004E95] dark:warm-gradient-text">
            A Trusted Partner to Ambitious Teams
          </h2>
          <p className="text-base sm:text-lg text-[#004E95]/80 leading-relaxed max-w-[70ch]">
            I have partnered with startups and scale-ups building complex, high-impact products, helping them move forward with clarity and confidence.
          </p>
        </motion.div>
      </div>

      {/* Mobile: single card with chevron navigation */}
      {isInView && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative w-full mb-16 lg:hidden"
        >
          <div className="container mx-auto px-6 lg:px-12 flex items-center gap-2 lg:gap-4">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              onClick={goPrev}
              className="flex-shrink-0 w-11 h-11 md:w-10 md:h-10 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0"
              aria-label="Previous testimonial"
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
                  className="border-warm-gradient-testimonial rounded-2xl p-6 w-full max-w-lg mx-auto my-1"
                  onMouseEnter={() => setHoveredCardId(testimonials[mobileIndex].id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <img src={testimonials[mobileIndex].image} alt={testimonials[mobileIndex].author} className="w-12 h-12 rounded-full object-cover" loading="lazy" />
                    <div>
                      <p 
                        className="font-medium text-[#004E95]"
                        style={isDark ? { color: '#004E95' } : undefined}
                      >
                        {testimonials[mobileIndex].author}
                      </p>
                      <p 
                        className="text-base text-muted-foreground dark:text-[#004E95] testimonial-role"
                        style={isDark ? { color: '#004E95' } : undefined}
                      >
                        {testimonials[mobileIndex].role}
                      </p>
                    </div>
                  </div>
                  <p 
                    className="text-[#004E95] leading-relaxed text-base"
                    style={isDark ? { color: '#004E95' } : undefined}
                  >
                    "{renderQuote(testimonials[mobileIndex], hoveredCardId === testimonials[mobileIndex].id)}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              onClick={goNext}
              className="flex-shrink-0 w-11 h-11 md:w-10 md:h-10 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Desktop: scrollable row with manual chevron navigation */}
      <div className="max-w-7xl mx-auto relative hidden lg:block mb-16">
        <motion.button
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          onClick={() => scrollDesktop("left")}
          className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-10 md:h-10 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          onClick={() => scrollDesktop("right")}
          className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-10 md:h-10 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </motion.button>

        {/* Fade overlays */}
        <div className="absolute right-0 top-0 bottom-0 w-16 lg:w-24 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-24 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div
            ref={scrollRef}
            className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-12 py-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {tripleTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                initial={{ opacity: 0, y: 40, scale: 0.92, rotateY: -5 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : { opacity: 0, y: 40, scale: 0.92, rotateY: -5 }}
                transition={{
                  duration: 0.6,
                  delay: Math.min((index % testimonials.length) * 0.12, 0.7),
                  ease: [0.34, 1.56, 0.64, 1],
                  type: "spring",
                  stiffness: 90,
                  damping: 12
                }}
                className="flex-shrink-0 w-[400px] lg:w-[500px] border-warm-gradient-testimonial rounded-2xl p-6 lg:p-8 my-1"
                onMouseEnter={() => setHoveredCardId(testimonial.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <div className="flex items-center gap-3 mb-6">
                  <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover" loading="lazy" />
                  <div>
                    <p 
                      className="font-medium text-foreground"
                      style={isDark ? { color: '#004E95' } : undefined}
                    >
                      {testimonial.author}
                    </p>
                    <p 
                      className="text-base text-muted-foreground dark:text-[#004E95] testimonial-role"
                      style={isDark ? { color: '#004E95' } : undefined}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p 
                  className="text-foreground leading-relaxed text-base"
                  style={isDark ? { color: '#004E95' } : undefined}
                >
                  "{renderQuote(testimonial, hoveredCardId === testimonial.id)}"
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Company Logos */}
      <div ref={logosRef} className="container mx-auto px-6 lg:px-12">
        {/* Mobile: Carousel with chevrons */}
        <div className="lg:hidden">
          <div className="flex items-center justify-center gap-4 px-4">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={logosInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              onClick={goPrevLogo}
              className="flex-shrink-0 w-11 h-11 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Previous logo"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            
            <div className="flex-1 flex items-center justify-center min-h-[80px] px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileLogoIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.3, y: 30, rotate: -10 }}
                    animate={logosInView ? { opacity: 0.4, scale: 1, y: 0, rotate: 0 } : { opacity: 0, scale: 0.3, y: 30, rotate: -10 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.34, 1.56, 0.64, 1],
                      type: "spring",
                      stiffness: 120,
                      damping: 10
                    }}
                    className="grayscale dark:grayscale-0 dark:invert dark:opacity-80"
                  >
                    <img
                      src={companyLogos[mobileLogoIndex].logo}
                      alt={companyLogos[mobileLogoIndex].name}
                      className={`${companyLogos[mobileLogoIndex].size} w-auto object-contain`}
                      loading="lazy"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={logosInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              onClick={goNextLogo}
              className="flex-shrink-0 w-11 h-11 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Next logo"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </motion.button>
          </div>
          
          {/* Logo indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {companyLogos.map((_, index) => (
              <button
                key={index}
                onClick={() => setMobileLogoIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === mobileLogoIndex
                    ? "w-6 bg-foreground/60"
                    : "w-1.5 bg-foreground/20"
                }`}
                aria-label={`Go to logo ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden lg:grid grid-cols-5 gap-x-16 gap-y-10 items-center justify-items-center max-w-4xl mx-auto">
          {companyLogos.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, scale: 0.3, y: 30, rotate: -10 }}
              animate={logosInView ? { opacity: 0.4, scale: 1, y: 0, rotate: 0 } : { opacity: 0, scale: 0.3, y: 30, rotate: -10 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.34, 1.56, 0.64, 1],
                type: "spring",
                stiffness: 120,
                damping: 10
              }}
              className="grayscale dark:grayscale-0 dark:invert dark:opacity-80"
            >
              <img
                src={company.logo}
                alt={company.name}
                className={`${company.size} w-auto object-contain`}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};