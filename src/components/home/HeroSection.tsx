import { useRef, useEffect, useCallback, useState } from "react";
import { motion, useInView, useAnimationControls } from "framer-motion";
import handIcon from "@/assets/hand-icon.png";
export const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const handRef = useRef<HTMLImageElement>(null);
  const handControls = useAnimationControls();
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect if device is mobile/touch
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Wave animation function
  const waveAnimation = useCallback(() => {
    handControls.start({
      rotate: [5, 25, 5, 30, 5],
      transition: {
        duration: 3,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1]
      }
    });
  }, [handControls]);

  // Wave once when component loads, then stop
  useEffect(() => {
    waveAnimation();
  }, [waveAnimation]);
  
  return <section id="home" ref={ref} className="min-h-[80vh] lg:min-h-screen py-16 sm:py-20 lg:py-28 border-solid border-secondary-foreground rounded-none border-0 flex items-center justify-center text-[#004E95]">
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
        }} className="text-lg sm:text-xl lg:text-2xl mb-4 font-medium text-[#004E95]/80">
            Hi, I'm Sam <motion.img 
              ref={handRef}
              src={handIcon} 
              alt="wave" 
              className="inline-block w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2 align-middle origin-bottom-right cursor-pointer -mt-1"
              initial={{ rotate: 5 }}
              animate={handControls}
              onMouseEnter={!isMobile ? waveAnimation : undefined}
              onClick={isMobile ? waveAnimation : undefined}
            />
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
        }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight md:leading-[2.2] mb-6 sm:mb-8">
            <span className="warm-gradient-text opacity-[0.65] dark:opacity-100 transition-opacity duration-500 cursor-pointer hover:opacity-[0.85]">
              Product clarity
            </span>{" "}
            for moments where getting it wrong is expensive.
          </motion.h1>

        </motion.div>
      </div>
    </section>;
};