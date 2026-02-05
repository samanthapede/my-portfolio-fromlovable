import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
export const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return <section ref={ref} className="min-h-[80vh] py-16 lg:py-24 border-solid border-secondary-foreground rounded-none border-0 flex items-center justify-center">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div initial={{
        opacity: 0,
        y: 40,
        scale: 0.95
      }} animate={isInView ? {
        opacity: 1,
        y: 0,
        scale: 1
      } : {
        opacity: 0,
        y: 40,
        scale: 0.95
      }} transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      }} className="max-w-6xl">
          {/* Greeting */}
          <motion.p initial={{
          opacity: 0,
          y: 30,
          rotateX: -15
        }} animate={isInView ? {
          opacity: 1,
          y: 0,
          rotateX: 0
        } : {
          opacity: 0,
          y: 30,
          rotateX: -15
        }} transition={{
          duration: 0.7,
          delay: 0.15,
          ease: [0.34, 1.56, 0.64, 1],
          type: "spring",
          stiffness: 120,
          damping: 12
        }} className="text-xl lg:text-2xl mb-4 text-muted-foreground">
            Hi, I'm Sam 👋
          </motion.p>

          {/* Main Headline */}
          <motion.h1 initial={{
          opacity: 0,
          y: 30,
          scale: 0.98
        }} animate={isInView ? {
          opacity: 1,
          y: 0,
          scale: 1
        } : {
          opacity: 0,
          y: 30,
          scale: 0.98
        }} transition={{
          duration: 0.8,
          delay: 0.25,
          ease: [0.16, 1, 0.3, 1],
          type: "spring",
          stiffness: 90,
          damping: 14
        }} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight md:leading-[2.2] mb-8">
            Fractional{" "}
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-[#4A56D4] transition-colors duration-500 ease-out cursor-pointer hover:text-[#5E69D9]">
                    design partner
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-sm bg-black/90 backdrop-blur-xl text-white border border-white/10 rounded-none px-5 py-4 text-base font-medium shadow-[0_0_30px_rgba(74,86,212,0.3)]">
                  <p className="leading-relaxed">
                    ✨ You know your business intimately. I know how to learn from your users and drive quality designs at speed. We're better together. 🤝
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>{" "}
            for high-impact experiences that{" "}
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-[#4A56D4] transition-colors duration-500 ease-out cursor-pointer hover:text-[#5E69D9]">
                    users love
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-sm bg-black/90 backdrop-blur-xl text-white border border-white/10 rounded-none px-5 py-4 text-base font-medium shadow-[0_0_30px_rgba(74,86,212,0.3)]">
                  <p className="leading-relaxed">
                    💜 Designing great experiences for your users is just good business. Too many businesses think they know what their users want, but miss out on valuable insights that transform products from good to great. Let's learn from your users and win faster. 🏆
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.h1>

        </motion.div>
      </div>
    </section>;
};