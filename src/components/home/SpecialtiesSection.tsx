import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import headshot from "@/assets/headshot.jpg";
const specialties = ["Web apps", "Mobile apps", "Websites", "0 → 1 projects", "Design leadership", "Strategy", "Systems thinking", "User research", "Rapid prototyping"];
export const SpecialtiesSection = () => {
  return <section className="py-16 lg:py-24 bg-specialties dark:!bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Image */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
              <img src={headshot} alt="Samantha Pede" className="w-full h-full object-cover object-top" />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            {/* Decorative gradient accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 gradient-line rounded-full blur-2xl opacity-30" />
          </motion.div>

          {/* Content */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h3 className="font-medium text-[#2E4150] dark:text-muted-foreground mb-4 text-xl">
              Specialties
            </h3>
            <h2 className="text-3xl xl:text-5xl font-bold mb-6 leading-[1.5] py-[80px] lg:text-4xl pt-[60px] pb-[40px] max-w-lg">
              Bringing your best ideas to life to{" "}
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="relative inline-block cursor-pointer group isolate">
                      <span className="relative z-10 text-[#4A56D4] transition-colors duration-500 ease-out group-hover:text-[#5E69D9]">
                        level up your business
                      </span>
                      <svg className="absolute -bottom-2 left-0 w-full h-4 overflow-visible transition-all duration-500 ease-out group-hover:scale-x-105 group-hover:opacity-80 z-0" viewBox="0 0 200 16" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 8C20 12 40 6 65 10C90 14 110 7 135 11C160 15 180 8 200 10" stroke="url(#gradient-specialties-levelup)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-500 ease-out group-hover:[stroke-width:6]" />
                        <defs>
                          <linearGradient id="gradient-specialties-levelup" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4B1B9E" />
                            <stop offset="50%" stopColor="#4E8DD3" />
                            <stop offset="100%" stopColor="#14E3F4" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-sm bg-gradient-to-r from-[#4A56D4] to-[#262D6E] text-white border-none rounded-md px-5 py-4 text-base font-medium shadow-2xl">
                    <p className="leading-relaxed">
                      🚀 I'm a Staff-level product designer with over a decade of experience leading user experience, interface design, and user research across fast-moving teams. I bring a mix of strategic thinking and hands-on execution to every engagement. I'm most effective when I'm helping product teams move fast while staying focused on what matters. 🎯
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h2>

            {/* Specialty Pills */}
            <div className="flex flex-wrap gap-[10px]">
              {specialties.map((specialty, index) => <motion.span key={specialty} initial={{
              opacity: 0,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.3,
              delay: index * 0.05
            }} className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-colors cursor-default">
                  {specialty}
                </motion.span>)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};