import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Lightbulb,
  Users,
  Zap,
  BarChart3,
  Target,
  Handshake,
  Compass,
  Layers,
} from "lucide-react";

const strengths = [
  { icon: Lightbulb, label: "Strategic and system thinking" },
  { icon: Users, label: "Leading teams, projects, and design cycles" },
  { icon: Zap, label: "Hands-on execution & rapid iteration" },
  { icon: BarChart3, label: "Translating research & data into user-centered designs" },
  { icon: Target, label: "Balancing user needs with business goals" },
  { icon: Handshake, label: "Collaborating to ship smart, scalable solutions" },
  { icon: Compass, label: "Stakeholder alignment" },
  { icon: Layers, label: "Creating greenpath visions and viable MVPs" },
];

export const KeyStrengthsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-24 bg-specialties dark:!bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* SVG gradient definition - cool gradient at 24deg */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="cool-gradient-icons" x1="0%" y1="0%" x2="91.26%" y2="40.68%" gradientUnits="userSpaceOnUse">
              <stop offset="28.92%" stopColor="rgb(111, 33, 216)" />
              <stop offset="61.39%" stopColor="rgb(0, 97, 162)" />
              <stop offset="88.66%" stopColor="rgb(0, 125, 134)" />
            </linearGradient>
          </defs>
        </svg>
        
        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-4 sm:mb-6 text-[#004E95]"
        >
          Key Strengths
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {strengths.map((strength, index) => (
            <motion.div
              key={strength.label}
              initial={{ opacity: 0, y: 50, scale: 0.75, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : { opacity: 0, y: 50, scale: 0.75, rotateY: -15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.34, 1.56, 0.64, 1],
                type: "spring",
                stiffness: 90,
                damping: 11
              }}
              className="bg-card border border-border rounded-xl p-6"
            >
                <strength.icon className="w-8 h-8 mb-4" stroke="url(#cool-gradient-icons)" fill="none" strokeWidth={1.5} />
                <p className="font-medium text-[#004E95]">{strength.label}</p>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
