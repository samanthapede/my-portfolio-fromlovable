import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const HeroSection = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl lg:text-2xl text-[#2E4150] mb-4"
          >
            Hi, I'm Sam 👋
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8"
          >
            Fractional{" "}
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="relative inline-block pb-4 cursor-pointer group">
                    <span 
                      className="text-[#4A56D4] transition-colors duration-500 ease-out group-hover:text-[#5E69D9]"
                    >
                      design partner
                    </span>
                    <svg
                      className="absolute bottom-0 left-0 w-full h-4 overflow-visible transition-all duration-500 ease-out group-hover:scale-x-105 group-hover:opacity-80"
                      viewBox="0 0 200 16"
                      preserveAspectRatio="none"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 10C15 8 30 12 50 9C70 6 90 13 110 10C130 7 150 14 170 10C185 7 200 11 200 11"
                        stroke="url(#gradient1)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-500 ease-out group-hover:[stroke-width:5]"
                      />
                      <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4B1B9E" />
                          <stop offset="50%" stopColor="#4E8DD3" />
                          <stop offset="100%" stopColor="#14E3F4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </TooltipTrigger>
                <TooltipContent 
                  side="bottom" 
                  className="max-w-sm bg-gradient-to-r from-[#4A56D4] to-[#262D6E] text-white border-none rounded-md px-5 py-4 text-base font-medium shadow-2xl"
                >
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
                  <span className="relative inline-block pb-4 cursor-pointer group">
                    <span 
                      className="text-[#4A56D4] transition-colors duration-500 ease-out group-hover:text-[#5E69D9]"
                    >
                      users love
                    </span>
                    <svg
                      className="absolute bottom-0 left-0 w-full h-4 overflow-visible transition-all duration-500 ease-out group-hover:scale-x-105 group-hover:opacity-80"
                      viewBox="0 0 200 16"
                      preserveAspectRatio="none"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 8C20 12 40 6 65 10C90 14 110 7 135 11C160 15 180 8 200 10"
                        stroke="url(#gradient2)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-500 ease-out group-hover:[stroke-width:5]"
                      />
                      <defs>
                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4B1B9E" />
                          <stop offset="50%" stopColor="#4E8DD3" />
                          <stop offset="100%" stopColor="#14E3F4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </TooltipTrigger>
                <TooltipContent 
                  side="bottom" 
                  className="max-w-sm bg-gradient-to-r from-[#4A56D4] to-[#262D6E] text-white border-none rounded-md px-5 py-4 text-base font-medium shadow-2xl"
                >
                  <p className="leading-relaxed">
                    💜 Designing great experiences for your users is just good business. Too many businesses think they know what their users want, but miss out on valuable insights that transform products from good to great. Let's learn from your users and win faster. 🏆
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.h1>

        </motion.div>
      </div>
    </section>
  );
};
