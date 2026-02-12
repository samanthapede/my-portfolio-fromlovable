import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

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

export const SpecialtiesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="pt-8 lg:pt-10 pb-20 sm:pb-24 lg:pb-32 bg-specialties"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6 sm:mb-8 text-primary-text dark:text-section-heading"
        >
          Ways I partner
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          <Accordion
            type="single"
            collapsible
            className="space-y-3"
          >
            {ways.map((way, index) => (
              <AccordionItem
                key={way.number}
                value={way.number}
                className={cn(
                  "group rounded-xl border border-border bg-card overflow-hidden transition-colors",
                  "hover:border-[rgba(249,79,151,0.4)] dark:hover:border-[rgba(111,33,216,0.4)]",
                  "data-[state=open]:border-[#004E95]/25 data-[state=open]:shadow-sm"
                )}
              >
                <AccordionTrigger className="gradient-hover-subtle px-5 py-5 sm:px-6 sm:py-6 hover:no-underline [&[data-state=open]]:bg-muted/20">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-left">
                    <span className="text-sm font-medium text-primary-text/70 tabular-nums mb-1 sm:mb-0 sm:w-8 shrink-0">
                      {way.number}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-primary-text leading-tight">
                        {way.title}
                      </h3>
                      <p className="text-sm sm:text-base text-primary-text/80 font-normal mt-0.5">
                        {way.subtitle}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-6">
                  <div className="pl-0 sm:pl-10 space-y-5">
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
    </section>
  );
};
