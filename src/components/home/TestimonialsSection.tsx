import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import victorImg from "@/assets/testimonials/victor.png";
import cassiaImg from "@/assets/testimonials/cassia.png";
import zackImg from "@/assets/testimonials/zack.png";
import emilyImg from "@/assets/testimonials/emily.png";
import joshImg from "@/assets/testimonials/josh.png";
import jennImg from "@/assets/testimonials/jenn.png";
import adamImg from "@/assets/testimonials/adam.png";
import noahImg from "@/assets/testimonials/noah.png";
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
import { imageUrl } from "@/lib/cloudflare-images";

const testimonials = [{
  id: 5,
  quote: <>Sam is a top notch human-focused designer. Sam quickly diagnoses root problems and designs elegant, intuitive and efficient solutions. In our time working together, Sam was someone I always looked to for feedback on my designs work, knowing that her intuition and high bar for quality would elevate my work. In my time working with Sam, every project team was relieved and grateful when she was assigned to their project. When Sam is on your team, you know the end result will be amazing and the process getting there will be easy and fun.</>,
  highlightText: "every project team was relieved and grateful when she was assigned to their project.",
  author: "Josh Mantooth",
  role: "Senior Staff Product Designer at Paypal",
  image: imageUrl("testimonial-josh", "Avatar", joshImg)
}, {
  id: 2,
  quote: <>[Sam is] one of the most compelling presenters and storytellers I know, with a rare ability to connect the dots between complex user needs and business goals. I've seen her dive fearlessly into the most challenging problem spaces, break down potential solutions with exceptional clarity, and navigate stakeholder feedback with ease. Every solution she delivers is beautifully crafted, deeply thoughtful, and always rooted in user needs. Sam is the kind of teammate who makes the whole team better.</>,
  highlightText: "I've seen her dive fearlessly into the most challenging problem spaces, break down potential solutions with exceptional clarity, and navigate stakeholder feedback with ease.",
  author: "Cassia Brooks",
  role: "Staff Product Designer at Shopify",
  image: imageUrl("testimonial-cassia", "Avatar", cassiaImg)
}, {
  id: 3,
  quote: <>I can't say enough good things about Sam. Not only is she a seriously talented and professional UX designer and researcher, but she's just a tremendous joy to be around and work with. She radiates empathy for users' experiences and she truly cares about her work. I hope that my path crosses with Sam's in the future. I'd gladly welcome the opportunity to work with her again.</>,
  highlightText: "She radiates empathy for users' experiences and she truly cares about her work.",
  author: "Zack Onisko",
  role: "Former CEO at Dribbble",
  image: imageUrl("testimonial-zack", "Avatar", zackImg)
}, {
  id: 6,
  quote: <>I've worked with Sam on multiple products in various industries from healthcare, to B2C mobile apps, to enterprise software. Her passion for her work combined with her undeniable talent makes her an asset to any team. Don't miss an opportunity to work with her.</>,
  highlightText: "Her passion for her work combined with her undeniable talent makes her an asset to any team.",
  author: "Jenn Dearth",
  role: "Group PM, AI Product Management at Workday",
  image: imageUrl("testimonial-jenn", "Avatar", jennImg)
}, {
  id: 1,
  quote: <>Sam has a rare ability to make the complex simple and the difficult seem effortless. I've had the privilege of working with her on some of the most challenging and ambiguous projects of my career, and one quality stands out above all: Sam embraces complexity and ambiguity, consistently delivering high-quality solutions at an impressive speed—all while keeping the team and stakeholders fully aligned and informed.</>,
  highlightText: "Sam embraces complexity and ambiguity, consistently delivering high-quality solutions at an impressive speed—all while keeping the team and stakeholders fully aligned and informed.",
  author: "Víctor Niharra Fe",
  role: "Leading Product at Shopify",
  image: imageUrl("testimonial-victor", "Avatar", victorImg)
}, {
  id: 7,
  quote: <>I've got this short list of people that I've worked with in the past that I'd leap at the opportunity to work with again. Sam is absolutely on that list.</>,
  highlightText: "Sam is absolutely on that list.",
  author: "Adam Darowski",
  role: "Senior Design Director at Sports Reference",
  image: imageUrl("testimonial-adam", "Avatar", adamImg)
}, {
  id: 4,
  quote: <>Sam is a self-starter with great instincts for what is needed to move a decision forward. Her pace, fast problem solving, and breadth of problem solving is extraordinary. She has a bias to ship and get things done, balancing long-term goals with respect for timelines, while always maintaining the high quality bar we set at Shopify. I would jump at any opportunity to work with her again!</>,
  highlightText: "Her pace, fast problem solving, and breadth of problem solving is extraordinary.",
  author: "Emily Rucker",
  role: "Senior UX Manager at Shopify",
  image: imageUrl("testimonial-emily", "Avatar", emilyImg)
}, {
  id: 8,
  quote: <>Sam is an incredible UX designer/researcher who I had the privilege of having on my team at Dribbble. She is thoughtful, thorough, communicates well, is an exemplary teammate and a great UX designer to boot. I would highly recommend Sam and hope to work with her one day again.</>,
  highlightText: "She is thoughtful, thorough, communicates well, is an exemplary teammate and a great UX designer to boot.",
  author: "Noah Stokes",
  role: "Head of Talent at Iverson",
  image: imageUrl("testimonial-noah", "Avatar", noahImg)
}];

const companyLogos = [{
  name: "Shopify",
  logo: imageUrl("logo-shopify", "Logo", shopifyLogo),
  size: "h-7 lg:h-9"
}, {
  name: "Dribbble",
  logo: imageUrl("logo-dribbble", "Logo", dribbbleLogo),
  size: "h-9 lg:h-11"
}, {
  name: "VMware",
  logo: imageUrl("logo-vmware", "Logo", vmwareLogo),
  size: "h-7 lg:h-9"
}, {
  name: "Pivotal",
  logo: imageUrl("logo-pivotal", "Logo", pivotalLogo),
  size: "h-7 lg:h-9"
}, {
  name: "Chegg",
  logo: imageUrl("logo-chegg", "Logo", cheggLogo),
  size: "h-7 lg:h-9"
}, {
  name: "HealthTalk AI",
  logo: imageUrl("logo-healthtalk-ai", "Logo", healthtalkLogo),
  size: "h-7 lg:h-9"
}, {
  name: "Vizient",
  logo: imageUrl("logo-vizient", "Logo", vizientLogo),
  size: "h-7 lg:h-9"
}, {
  name: "Hexarad",
  logo: imageUrl("logo-hexarad", "Logo", hexaradLogo),
  size: "h-7 lg:h-9"
}, {
  name: "Hipp",
  logo: imageUrl("logo-hipp", "Logo", hippLogo),
  size: "h-7 lg:h-9"
}, {
  name: "Augintel",
  logo: imageUrl("logo-augintel", "Logo", augintelLogo),
  size: "h-7 lg:h-9"
}];

const viewport = { once: true, margin: "-80px", amount: 0.15 } as const;
const ease = [0.16, 1, 0.3, 1] as const;

export const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const logosRef = useRef(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px", amount: 0.15 });
  const reducedMotion = useReducedMotion();
  const [mobileIndex, setMobileIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(testimonials.length); // start at middle set
  const [isJumping, setIsJumping] = useState(false); // skip animation when resetting loop
  const [mobileLogoIndex, setMobileLogoIndex] = useState(0);
  const [cardStep, setCardStep] = useState(516);

  // Triple testimonials for seamless infinite loop with chevron control
  const tripleTestimonials = [...testimonials, ...testimonials, ...testimonials];

  const TRANSITION_MS = 500;

  const scrollDesktop = useCallback((direction: "left" | "right") => {
    setDisplayIndex((i) =>
      direction === "right" ? i + 1 : i - 1
    );
  }, []);

  // Seamless infinite: when we reach a clone, wait for animation to finish, then jump
  // (jumping during/before animation causes visible jerk)
  useEffect(() => {
    if (displayIndex >= testimonials.length * 2) {
      const t = setTimeout(() => {
        setIsJumping(true);
        setDisplayIndex((i) => i - testimonials.length);
      }, TRANSITION_MS);
      return () => clearTimeout(t);
    }
    if (displayIndex < testimonials.length) {
      const t = setTimeout(() => {
        setIsJumping(true);
        setDisplayIndex((i) => i + testimonials.length);
      }, TRANSITION_MS);
      return () => clearTimeout(t);
    }
  }, [displayIndex]);

  // Reset jump flag after one frame (allows instant style apply, then re-enables animate)
  useEffect(() => {
    if (isJumping) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsJumping(false));
      });
      return () => cancelAnimationFrame(id);
    }
  }, [isJumping]);

  // Measure card width + gap for transform
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !isInView) return;
    const measure = () => {
      const first = el.children[0] as HTMLElement | undefined;
      if (!first) return;
      const gap = parseFloat(getComputedStyle(el).gap) || 24;
      setCardStep(first.offsetWidth + gap);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isInView]);

  const renderRole = (role: string) => {
    const atIdx = role.lastIndexOf(" at ");
    if (atIdx === -1) return role;
    return (
      <>
        {role.slice(0, atIdx + 4)}
        <span className="font-semibold">{role.slice(atIdx + 4)}</span>
      </>
    );
  };

  // Render quote with highlighted phrase (static gradient, no animation)
  const renderQuote = (testimonial: typeof testimonials[0]) => {
    const highlightText = testimonial.highlightText;
    if (!highlightText) return <>{testimonial.quote}</>;

    const getTextContent = (element: React.ReactNode): string => {
      if (typeof element === 'string') return element;
      if (typeof element === 'number') return String(element);
      if (Array.isArray(element)) return element.map(getTextContent).join('');
      if (element && typeof element === 'object' && 'props' in element) {
        return getTextContent(element.props.children);
      }
      return '';
    };

    const quoteText = getTextContent(testimonial.quote);
    if (!quoteText.includes(highlightText)) return <>{testimonial.quote}</>;

    const parts = quoteText.split(highlightText);
    if (parts.length !== 2) return <>{testimonial.quote}</>;

    return (
      <>
        {parts[0]}
        <span className="testimonial-highlight font-bold">{highlightText}</span>
        {parts[1]}
      </>
    );
  };

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


  return (
    <section ref={sectionRef} className="py-20 sm:py-24 lg:py-32 overflow-x-hidden pt-[90px] pb-16 sm:pb-20 lg:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-left mb-12 space-y-4 sm:space-y-6">
          <motion.h2
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.05, ease }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-0 text-primary-text dark:text-section-heading"
          >
            A trusted partner to ambitious teams
          </motion.h2>
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.55, delay: 0.15, ease }}
            className="text-base sm:text-lg text-primary-text/80 dark:text-primary-text/85 leading-relaxed max-w-[70ch] mb-0"
          >
            I have partnered with startups and scale-ups building complex, high-impact products, helping them move forward with clarity and confidence.
          </motion.p>
        </div>
      </div>

      {/* Mobile: single card with chevron navigation */}
      {isInView && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative w-full mb-16 md:hidden"
        >
          <div className="container mx-auto px-4 sm:px-6 flex items-center gap-2 sm:gap-4">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              onClick={goPrev}
              className="flex-shrink-0 w-11 h-11 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors min-h-[44px] min-w-[44px]"
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
                  className="border-warm-gradient-testimonial rounded-lg p-4 sm:p-6 w-full max-w-[min(100%,28rem)] sm:max-w-lg mx-auto my-1"
                >
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <img src={testimonials[mobileIndex].image} alt={testimonials[mobileIndex].author} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0" loading="lazy" />
                    <div className="min-w-0">
                      <p className="font-medium text-primary-text text-sm sm:text-base truncate">
                        {testimonials[mobileIndex].author}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground testimonial-role line-clamp-2">
                        {renderRole(testimonials[mobileIndex].role)}
                      </p>
                    </div>
                  </div>
                  <p className="text-primary-text leading-relaxed text-sm sm:text-base">
                    "{renderQuote(testimonials[mobileIndex])}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              onClick={goNext}
              className="flex-shrink-0 w-11 h-11 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Desktop/Tablet: scrollable row with chevron navigation (seamless infinite loop) */}
      <div className="hidden md:block mb-16">
        {/* Content aligns with container padding (matches header, logos) — flex so chevrons stay visible (no overflow clip) */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex items-center gap-2 sm:gap-3 lg:gap-4">
          <button
            type="button"
            onClick={() => scrollDesktop("left")}
            className="flex-shrink-0 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors min-h-[44px] min-w-[44px]"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5 text-foreground" />
          </button>

          <div className="flex-1 min-w-0 relative">
            {/* Right fade overlay for scroll effect */}
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-16 lg:w-24 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, delay: 0.15, ease }}
              className="overflow-hidden"
            >
              <div
                ref={trackRef}
                className="flex gap-4 lg:gap-6 py-1"
                style={{
                  transform: `translateX(${-displayIndex * cardStep}px)`,
                  transition: isJumping ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {tripleTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.id}-${index}`}
                    initial={reducedMotion ? false : { opacity: 0, y: 32, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={viewport}
                    transition={{
                      duration: 0.55,
                      delay: Math.min(index * 0.1, 0.6),
                      ease,
                    }}
                    className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] lg:w-[420px] xl:w-[500px] border-warm-gradient-testimonial rounded-lg p-5 sm:p-6 lg:p-8 my-1"
                  >
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <img src={testimonial.image} alt={testimonial.author} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0" loading="lazy" />
                      <div className="min-w-0">
                        <p className="font-medium text-primary-text text-sm sm:text-base truncate">
                          {testimonial.author}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground testimonial-role line-clamp-2">
                          {renderRole(testimonial.role)}
                        </p>
                      </div>
                    </div>
                    <p className="text-primary-text leading-relaxed text-sm sm:text-base">
                      "{renderQuote(testimonial)}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <button
            type="button"
            onClick={() => scrollDesktop("right")}
            className="flex-shrink-0 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-background/90 dark:bg-background/80 shadow-lg border border-border/50 flex items-center justify-center hover:bg-background transition-colors min-h-[44px] min-w-[44px]"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Company Logos */}
      <div ref={logosRef} className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Mobile: Carousel with chevrons */}
        <div className="md:hidden">
          <div className="flex items-center justify-center gap-4 px-4">
            <motion.button
              initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.2, ease }}
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
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.3, y: 20, rotate: -8 }}
                    whileInView={{ opacity: 0.4, scale: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true, margin: "-50px", amount: 0.2 }}
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
              initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.2, ease }}
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

        {/* Desktop/Tablet: Grid layout */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-x-8 lg:gap-x-16 gap-y-12 lg:gap-y-10 items-center justify-items-center max-w-4xl mx-auto">
          {companyLogos.map((company, index) => (
            <motion.div
              key={company.name}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.4, y: 24 }}
              whileInView={{ opacity: 0.4, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease,
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