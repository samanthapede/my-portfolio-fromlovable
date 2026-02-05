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
    <section ref={ref} className="py-16 lg:py-24 bg-strengths dark:!bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-4xl font-bold text-center mb-12"
        >
          Key Strengths
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isInView &&
            strengths.map((strength, index) => (
              <motion.div
                key={strength.label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
              >
                <strength.icon className="w-8 h-8 text-primary mb-4" />
                <p className="font-medium">{strength.label}</p>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
