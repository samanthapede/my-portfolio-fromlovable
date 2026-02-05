import { useState } from "react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useInView } from "framer-motion";
import { useRef } from "react";

const specialties = ["Web apps", "Mobile apps", "Websites", "0 → 1 projects", "Design leadership", "Strategy", "Systems thinking", "User research", "Rapid prototyping"];

export const SpecialtiesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-specialties dark:!bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
              {isInView && (
                <img
                  src={new URL("@/assets/headshot.jpg", import.meta.url).href}
                  alt="Samantha Pede"
                  className={`w-full h-full object-cover object-top transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                />
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            {/* Decorative gradient accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 gradient-line rounded-full blur-2xl opacity-30" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-medium text-[#2E4150] dark:text-muted-foreground mb-4 text-xl">
              Specialties
            </h3>
            <h2 className="text-3xl xl:text-5xl font-bold mb-6 leading-[1.5] py-[80px] lg:text-4xl pt-[60px] pb-[40px]">
              Bringing your best ideas to&nbsp;life to{" "}
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-[#4A56D4] transition-colors duration-500 ease-out cursor-pointer hover:text-[#5E69D9]">
                      level up your business
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-sm bg-black/90 backdrop-blur-xl text-white border border-white/10 rounded-none px-5 py-4 text-base font-medium shadow-[0_0_30px_rgba(74,86,212,0.3)]">
                    <p className="leading-relaxed">
                      🚀 I'm a Staff-level product designer with over a decade of experience leading user experience, interface design, and user research across fast-moving teams. I bring a mix of strategic thinking and hands-on execution to every engagement. I'm most effective when I'm helping product teams move fast while staying focused on what matters. 🎯
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h2>

            {/* Specialty Pills */}
            <div className="flex flex-wrap gap-[10px]">
              {isInView && specialties.map((specialty, index) => (
                <motion.span
                  key={specialty}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium cursor-default"
                >
                  {specialty}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};