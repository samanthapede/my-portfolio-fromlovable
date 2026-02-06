import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  quote: <><strong>Sam has a rare ability to make the complex simple and the difficult seem effortless.</strong> I've had the privilege of working with her on <strong>some of the most challenging and ambiguous projects of my career,</strong> and one quality stands out above all: Sam embraces complexity and ambiguity, consistently delivering high-quality solutions at an impressive speed—all while keeping the team and stakeholders fully aligned and informed.</>,
  author: "Víctor Niharra Fe",
  role: "Leading Product at Shopify",
  image: victorImg
}, {
  id: 2,
  quote: <>[Sam is] one of the most compelling presenters and storytellers I know, with a rare ability to connect the dots between complex user needs and business goals. <strong>I've seen her dive fearlessly into the most challenging problem spaces, break down potential solutions with exceptional clarity, and navigate stakeholder feedback with ease.</strong> Every solution she delivers is beautifully crafted, deeply thoughtful, and always rooted in user needs. Sam is the kind of teammate who makes the whole team better.</>,
  author: "Cassia Brooks",
  role: "Staff Product Designer at Shopify",
  image: cassiaImg
}, {
  id: 3,
  quote: <><strong>I can't say enough good things about Sam.</strong> Not only is she a seriously talented and professional UX designer and researcher, but she's just a tremendous joy to be around and work with. She radiates empathy for users' experiences and she truly cares about her work. I hope that my path crosses with Sam's in the future. I'd gladly welcome the opportunity to work with her again.</>,
  author: "Zack Onisko",
  role: "Former CEO at Dribbble",
  image: zackImg
}, {
  id: 4,
  quote: <>Sam is a self-starter with great instincts for what is needed to move a decision forward. <strong>Her pace, fast problem solving, and breadth of problem solving is extraordinary.</strong> She has a bias to ship and get things done, balancing long-term goals with respect for timelines, while always maintaining the high quality bar we set at Shopify. I would jump at any opportunity to work with her again!</>,
  author: "Emily Rucker",
  role: "Senior UX Manager at Shopify",
  image: emilyImg
}, {
  id: 5,
  quote: <>Sam is a top notch human-focused designer. Sam quickly diagnoses root problems and designs elegant, intuitive and efficient solutions. In our time working together, Sam was someone I always looked to for feedback on my designs work, knowing that her intuition and high bar for quality would elevate my work. In my time working with Sam, <strong>every project team was relieved and grateful when she was assigned to their project.</strong> When Sam is on your team, you know the end result will be amazing and the process getting there will be easy and fun.</>,
  author: "Josh Mantooth",
  role: "Senior Staff Product Designer at Paypal",
  image: joshImg
}];

const companyLogos = [{
  name: "Shopify",
  logo: shopifyLogo,
  size: "h-5 lg:h-7"
}, {
  name: "Dribbble",
  logo: dribbbleLogo,
  size: "h-9 lg:h-12"
}, {
  name: "VMware",
  logo: vmwareLogo,
  size: "h-9 lg:h-11"
}, {
  name: "Pivotal",
  logo: pivotalLogo,
  size: "h-9 lg:h-11"
}, {
  name: "Chegg",
  logo: cheggLogo,
  size: "h-5 lg:h-7"
}, {
  name: "HealthTalk AI",
  logo: healthtalkLogo,
  size: "h-5 lg:h-7"
}, {
  name: "Vizient",
  logo: vizientLogo,
  size: "h-5 lg:h-7"
}, {
  name: "Hexarad",
  logo: hexaradLogo,
  size: "h-5 lg:h-7"
}, {
  name: "Hipp",
  logo: hippLogo,
  size: "h-5 lg:h-7"
}, {
  name: "Augintel",
  logo: augintelLogo,
  size: "h-5 lg:h-7"
}];

export const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const logosRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const logosInView = useInView(logosRef, { once: true, margin: "-50px" });
  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopIndex, setDesktopIndex] = useState(0);

  const goPrev = useCallback(() => {
    setMobileIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, []);
  const goNext = useCallback(() => {
    setMobileIndex((i) => (i + 1) % testimonials.length);
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
    <section ref={sectionRef} className="py-16 lg:py-24 overflow-hidden pt-[90px] pb-[50px]">
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
          <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight mb-4">
            A trusted partner to{" "}
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-[#4A56D4] transition-colors duration-500 ease-out cursor-pointer hover:text-[#5E69D9]">
                    amazing teams
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-sm bg-black/90 backdrop-blur-xl text-white border border-white/10 rounded-none px-5 py-4 text-base font-medium shadow-[0_0_30px_rgba(74,86,212,0.3)]">
                  <p className="leading-relaxed">
                    ✨ I'm a Staff-level product designer with over a decade of experience leading user experience, interface design, and user research across fast-moving teams. I now work independently with startups and enterprises as a freelance and consulting partner — helping them design intuitive, scalable products that solve real problems for real people. 💜
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h2>
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
              className="flex-shrink-0 w-10 h-10 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors"
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
                  className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg mx-auto"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <img src={testimonials[mobileIndex].image} alt={testimonials[mobileIndex].author} className="w-12 h-12 rounded-full object-cover" loading="lazy" />
                    <div>
                      <p className="font-medium text-foreground">
                        {testimonials[mobileIndex].author}
                      </p>
                      <p className="text-base text-muted-foreground">
                        {testimonials[mobileIndex].role}
                      </p>
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed text-base">
                    "{testimonials[mobileIndex].quote}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              onClick={goNext}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors"
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
          className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          onClick={() => scrollDesktop("right")}
          className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors"
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
            className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-12"
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
                className="flex-shrink-0 w-[400px] lg:w-[500px] bg-card border border-border rounded-2xl p-6 lg:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover" loading="lazy" />
                  <div>
                    <p className="font-medium text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-base text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-foreground leading-relaxed text-base">
                  "{testimonial.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Company Logos */}
      <div ref={logosRef} className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-x-10 gap-y-8 lg:gap-x-16 lg:gap-y-10 items-center justify-items-center max-w-4xl mx-auto">
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
                className={`${company.size} w-auto object-contain max-w-[140px] lg:max-w-[180px]`}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};