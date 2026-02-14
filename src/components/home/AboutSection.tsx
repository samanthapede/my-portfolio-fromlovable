import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  Users,
  BarChart3,
  Compass,
  Layers,
  Flag,
  Rocket,
  Lightbulb,
  Zap,
  GitMerge,
  Puzzle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import headshot from "@/assets/headshot.jpg";

type PartnerWay = {
  number: string;
  title: string;
  subtitle: string;
  body: string;
  bullets?: string[];
  bulletsLabel?: string;
  outcome?: string;
};

const ways: PartnerWay[] = [
  {
    number: "01",
    title: "Product clarity and direction",
    subtitle: "Product clarity for new and evolving products",
    body: "I help teams figure out what to build, why it matters, and how it should work, before costly execution begins.",
    bulletsLabel: "This often includes:",
    bullets: [
      "uncovering real user needs and assumptions",
      "defining core flows and system behavior",
      "shaping early product vision and design direction",
      "translating vision into build-ready steps",
    ],
    outcome: "Outcome: confident decisions, aligned teams, and forward momentum.",
  },
  {
    number: "02",
    title: "Strategy and systems",
    subtitle: "Turning vision into scalable product systems",
    body: "I design systems that connect user needs, business goals, and technical realities, creating clarity where things previously felt tangled or undefined.",
    bulletsLabel: "This work is especially valuable for products with:",
    bullets: [
      "complex workflows",
      "multiple user types",
      "interconnected features",
    ],
  },
  {
    number: "03",
    title: "0 → 1 product leadership",
    subtitle: "From idea to launch",
    body: "I partner with founders and early teams to guide products from concept to launch, helping them move fast without sacrificing clarity or quality.",
    bullets: undefined,
    outcome: "This often looks like stepping in as a strategic design and product partner during critical early phases.",
  },
];

const strengths = [
  { icon: Compass, title: "Product clarity in ambiguous spaces", description: "Helping teams quickly make sense of complex problems and focus on what matters most." },
  { icon: Layers, title: "System and flow design", description: "Designing how products work end to end, not just how individual screens look." },
  { icon: BarChart3, title: "User-rooted decision making", description: "Translating research, data, and real user behavior into confident product direction." },
  { icon: Flag, title: "Vision to build-ready direction", description: "Turning long-term goals into clear, actionable next steps teams can actually ship." },
  { icon: Users, title: "Stakeholder alignment", description: "Creating shared understanding across product, engineering, and leadership." },
  { icon: Rocket, title: "Momentum without rework", description: "Helping teams move forward with confidence and avoid costly missteps." },
];

const viewport = { once: true, margin: "-80px", amount: 0.15 } as const;
const ease = [0.16, 1, 0.3, 1] as const;

export const AboutSection = () => {
  const ref = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const reducedMotion = useReducedMotion();

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
  }, [imageLoaded]);

  return (
    <section id="about" ref={ref} className="pt-16 sm:pt-20 lg:pt-32 pb-16 sm:pb-20 lg:pb-32 bg-warm-gradient-about overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
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
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-[74px] items-start">
          {/* Image - responsive sizing */}
          <motion.div
            ref={photoRef}
            initial={reducedMotion ? false : { opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease }}
            className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none min-w-0 lg:w-full lg:flex-shrink-0"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-full w-full lg:w-full">
              <img
                  src={headshot}
                  alt="Samantha Pede"
                  className={`w-full h-full object-cover object-top transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 gradient-line rounded-full blur-2xl opacity-30" />
          </motion.div>

          {/* Content */}
          <motion.div
            ref={contentRef}
            initial={reducedMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease }}
            className="flex-1 min-w-0 w-full lg:flex-none"
          >
            <motion.h2
              initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={viewport}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-4 sm:mb-6 text-primary-text dark:text-section-heading"
            >
              About Sam
            </motion.h2>

            <div className="space-y-5">
              <motion.p
                initial={reducedMotion ? false : { opacity: 0, y: 16, x: -8 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={viewport}
                transition={{ duration: 0.55, delay: 0.15, ease }}
                className="text-base leading-relaxed text-primary-text/70"
              >
                I've spent <span className="font-semibold">over a decade</span> helping teams design and ship complex products in fast-moving environments.
              </motion.p>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 16, x: -8 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={viewport}
                transition={{ duration: 0.55, delay: 0.22, ease }}
                className="text-base leading-relaxed text-primary-text/70"
              >
                <p className="mb-3">I <span className="font-semibold">partner with founders and product leaders</span> at moments when clarity matters most:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#004E95]/25 dark:border-[#004E95]/35">
                      <Lightbulb className="w-4 h-4 text-primary-text" strokeWidth={1.5} />
                    </span>
                    <span className="font-semibold break-words">early product definition</span>
                  </li>
                  <li className="flex items-start gap-3 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#004E95]/25 dark:border-[#004E95]/35">
                      <Zap className="w-4 h-4 text-primary-text" strokeWidth={1.5} />
                    </span>
                    <span className="font-semibold break-words">major new features</span>
                  </li>
                  <li className="flex items-start gap-3 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#004E95]/25 dark:border-[#004E95]/35">
                      <GitMerge className="w-4 h-4 text-primary-text" strokeWidth={1.5} />
                    </span>
                    <span className="break-words">or times when teams need alignment before execution</span>
                  </li>
                </ul>
              </motion.div>

              <motion.p
                initial={reducedMotion ? false : { opacity: 0, y: 16, x: -8 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={viewport}
                transition={{ duration: 0.55, delay: 0.28, ease }}
                className="text-base leading-relaxed text-primary-text/70"
              >
                Most recently, I spent <span className="font-semibold">4+ years at Shopify</span> as a Lead Designer working on large-scale systems across inventory, fulfillment, and shipping, where decisions had meaningful downstream impact and complexity was the norm.
              </motion.p>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 16, x: -8 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={viewport}
                transition={{ duration: 0.55, delay: 0.35, ease }}
                className="text-base leading-relaxed text-primary-text/70"
              >
                <p className="mb-3">Today, I work independently, helping teams:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#004E95]/25 dark:border-[#004E95]/35">
                      <Puzzle className="w-4 h-4 text-primary-text" strokeWidth={1.5} />
                    </span>
                    <span className="font-semibold break-words">make sense of complex problem spaces</span>
                  </li>
                  <li className="flex items-start gap-3 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#004E95]/25 dark:border-[#004E95]/35">
                      <Users className="w-4 h-4 text-primary-text" strokeWidth={1.5} />
                    </span>
                    <span className="break-words">deeply <span className="font-semibold">understand their users</span> (often beyond initial assumptions)</span>
                  </li>
                  <li className="flex items-start gap-3 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#004E95]/25 dark:border-[#004E95]/35">
                      <Flag className="w-4 h-4 text-primary-text" strokeWidth={1.5} />
                    </span>
                    <span className="break-words"><span className="font-semibold">create product vision</span> and translate into focused, build-ready direction</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <div className="relative mt-6 sm:mt-8 w-full min-w-0">
              <motion.h2
                initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={viewport}
                transition={{ duration: 0.6, delay: 0.4, ease }}
                className="text-base sm:text-lg md:text-xl font-medium text-primary-text text-left leading-normal w-full max-w-[65ch]"
              >
                <span className="about-highlight font-semibold">I'm most effective when I can help teams focus on the most important thing, move intentionally, and align around a shared understanding of what they're building and why. For me, design is about clarity, momentum, and impact, not just execution.</span>
              </motion.h2>
            </div>
          </motion.div>
        </div>

        {/* What teams bring me in for - grid for quick scanning */}
        <div className="mt-12 sm:mt-16 lg:mt-20 mb-0">
          <motion.h3
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6 sm:mb-8 text-primary-text dark:text-section-heading"
          >
            What teams bring me in for
          </motion.h3>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
          >
            {strengths.map((strength) => (
              <motion.div
                key={strength.title}
                variants={reducedMotion ? undefined : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease }}
                className="flex flex-col gap-3 rounded-xl p-4 sm:p-5 lg:p-6 bg-card border border-border min-w-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border border-[#004E95]/25 dark:border-[#004E95]/35">
                    <strength.icon className="w-5 h-5 text-primary-text" strokeWidth={1.5} stroke="currentColor" fill="none" />
                  </span>
                  <h4 className="text-primary-text font-semibold leading-tight break-words min-w-0">{strength.title}</h4>
                </div>
                <p className="text-primary-text/80 text-sm leading-relaxed pl-0">{strength.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Ways I partner */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <motion.h3
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6 sm:mb-8 text-primary-text dark:text-section-heading"
          >
            Ways I partner
          </motion.h3>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.55, delay: 0.4, ease }}
          >
            <Accordion
              type="single"
              collapsible
              className="space-y-3"
            >
              {ways.map((way) => (
                <AccordionItem
                  key={way.number}
                  value={way.number}
                  className={cn(
                    "group rounded-xl border border-border bg-card overflow-hidden transition-colors",
                    "hover:border-[rgba(249,79,151,0.4)] dark:hover:border-[rgba(111,33,216,0.4)]",
                    "data-[state=open]:border-[#004E95]/25 data-[state=open]:shadow-sm"
                  )}
                >
                  <AccordionTrigger className="gradient-hover-subtle px-4 py-4 sm:px-6 sm:py-6 hover:no-underline [&[data-state=open]]:bg-muted/20">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-left w-full min-w-0">
                      <span className="text-sm font-medium text-primary-text/70 tabular-nums mb-1 sm:mb-0 sm:w-8 shrink-0">
                        {way.number}
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-base sm:text-lg md:text-xl font-semibold text-primary-text leading-tight break-words">
                          {way.title}
                        </h4>
                        <p className="text-sm sm:text-base text-primary-text/80 font-normal mt-0.5 break-words">
                          {way.subtitle}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-3 sm:px-6 sm:pb-6 sm:pt-4 md:px-8 md:pb-8 md:pt-6">
                    <div className="pl-0 sm:pl-10 space-y-4 sm:space-y-5 min-w-0">
                      <p className="text-primary-text/90 leading-relaxed">
                        {way.body}
                      </p>
                      {way.bullets && way.bullets.length > 0 && (
                        <div>
                          {way.bulletsLabel && (
                            <p className="text-sm font-medium text-primary-text/90 mb-2">
                              {way.bulletsLabel}
                            </p>
                          )}
                          <ul className="list-disc pl-5 space-y-1 text-primary-text/80 text-sm sm:text-base leading-relaxed">
                            {way.bullets.map((bullet, i) => (
                              <li key={i}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {way.outcome && (
                        <p className="text-sm font-medium text-primary-text pt-1">
                          {way.outcome}
                        </p>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
