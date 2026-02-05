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
            <span className="relative inline-block">
              <span className="gradient-text">design partner</span>
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
            </span>{" "}
            for high-impact experiences that{" "}
            <span className="relative inline-block">
              <span className="gradient-text">users love</span>
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
            </span>
          </motion.h1>

        </motion.div>
      </div>
    </section>
  );
};
