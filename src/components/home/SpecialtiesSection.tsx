import { motion } from "framer-motion";
import headshot from "@/assets/headshot.jpg";
const specialties = ["Web apps", "Mobile apps", "Websites", "0 → 1 projects", "Design leadership", "Strategy", "Systems thinking", "User research", "Rapid prototyping"];
export const SpecialtiesSection = () => {
  return <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
              <img src={headshot} alt="Samantha Pede" className="w-full h-full object-cover" />
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
            <h3 className="text-2xl font-medium text-[#2E4150] mb-4">
              Specialties
            </h3>
            <h2 className="text-3xl xl:text-5xl font-bold mb-6 leading-[1.9] lg:text-3xl">
              Bringing your best ideas to life to{" "}
              <span className="relative inline">
                <span className="text-[#4A56D4]">level up your business</span>
                <svg className="absolute -bottom-1 left-0 w-full h-4 overflow-visible -z-10" viewBox="0 0 200 16" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 8C20 12 40 6 65 10C90 14 110 7 135 11C160 15 180 8 200 10" stroke="url(#gradient-specialties-levelup)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="gradient-specialties-levelup" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4B1B9E" />
                      <stop offset="50%" stopColor="#4E8DD3" />
                      <stop offset="100%" stopColor="#14E3F4" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>

            {/* Specialty Pills */}
            <div className="flex flex-wrap gap-3">
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