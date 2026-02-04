import { motion } from "framer-motion";
import headshot from "@/assets/headshot.jpg";

const specialties = [
  "UX Design",
  "UI Design",
  "Design Systems",
  "User Research",
  "Product Strategy",
  "Rapid Prototyping",
  "Team Leadership",
  "Design Ops",
];

export const SpecialtiesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
              <img
                src={headshot}
                alt="Samantha Pede"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            {/* Decorative gradient accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 gradient-line rounded-full blur-2xl opacity-30" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
              Bringing your best ideas to life to{" "}
              <span className="gradient-text">level up your business</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              I bring a mix of strategic thinking and hands-on execution to every 
              engagement. I'm most effective when I'm helping teams move fast while 
              staying focused on what matters.
            </p>

            {/* Specialty Pills */}
            <div className="flex flex-wrap gap-3">
              {specialties.map((specialty, index) => (
                <motion.span
                  key={specialty}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-colors cursor-default"
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
