import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl lg:text-2xl text-muted-foreground mb-4"
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
            <span className="gradient-text">design partner</span>{" "}
            for high-impact experiences that{" "}
            <span className="gradient-text">users love</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg lg:text-xl text-muted-foreground max-w-2xl mb-10"
          >
            Staff-level product designer with over a decade of experience leading UX, 
            UI, and research across fast-moving teams.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <a
              href="#contact"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Book a Call
            </a>
            <a
              href="/work"
              className="px-8 py-4 border border-border rounded-full font-medium hover:bg-secondary transition-colors"
            >
              View My Work
            </a>
          </motion.div>
        </motion.div>

        {/* Gradient accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="gradient-line h-1 max-w-lg mt-16 rounded-full origin-left"
        />
      </div>
    </section>
  );
};
