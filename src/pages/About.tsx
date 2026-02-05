import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, Users, Zap, BarChart3, Target, Handshake, Compass, Layers } from "lucide-react";
import headshot from "@/assets/headshot.jpg";

const strengths = [{
  icon: Lightbulb,
  label: "Strategic and system thinking"
}, {
  icon: Users,
  label: "Leading teams, projects, and design cycles"
}, {
  icon: Zap,
  label: "Hands-on execution & rapid iteration"
}, {
  icon: BarChart3,
  label: "Translating research & data into user-centered designs"
}, {
  icon: Target,
  label: "Balancing user needs with business goals"
}, {
  icon: Handshake,
  label: "Collaborating to ship smart, scalable solutions"
}, {
  icon: Compass,
  label: "Stakeholder alignment"
}, {
  icon: Layers,
  label: "Creating greenpath visions and viable MVPs"
}];

const About = () => {
  const heroRef = useRef(null);
  const strengthsRef = useRef(null);
  const philosophyRef = useRef(null);
  const outsideRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const strengthsInView = useInView(strengthsRef, { once: true, margin: "-100px" });
  const philosophyInView = useInView(philosophyRef, { once: true, margin: "-100px" });
  const outsideInView = useInView(outsideRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              About
            </h1>
          </motion.div>

          {/* Bio Section with Photo Collage */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Bio Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg leading-relaxed mb-6 lg:text-lg text-[#6f6f7b] font-sans font-normal">
                With over a decade of experience leading user experience, interface design, and user research across fast-moving teams. I now work independently, helping great companies design intuitive, scalable interfaces that solve real problems for real people.
              </p>
              <p className="text-lg leading-relaxed mb-6 lg:text-lg text-[#6f6f7b] font-sans font-normal">
                Over the past 10+ years, I've worked with startups and enterprise organizations across a range of industries. Most recently, I spent 4+ years at Shopify as a lead designer in the logistics space, designing complex systems across Inventory, Fulfillment, and Shipping. I'm particularly proud of leading the design and execution of a CEO-sponsored initiative — collaborating directly with Shopify's senior leadership to bring a bold new fulfillment vision to life. That work was approved for build and is expected to transform how merchants fulfill orders at scale.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground lg:text-lg">
                I bring a mix of strategic thinking and hands-on execution to every engagement. I'm most effective when I'm helping teams move fast while staying focused on what matters.
              </p>
            </motion.div>

            {/* Photo Collage */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden">
                <img src={headshot} alt="Samantha Pede" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="aspect-square rounded-xl bg-gradient-to-br from-gradient-purple to-gradient-blue"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="aspect-square rounded-xl bg-gradient-to-br from-gradient-blue to-gradient-cyan"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Strengths Section */}
      <section ref={strengthsRef} className="py-16 lg:py-24 bg-strengths dark:!bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={strengthsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold text-center mb-12"
          >
            Key Strengths
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengthsInView && strengths.map((strength, index) => (
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

      {/* Philosophy Section */}
      <section ref={philosophyRef} className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={philosophyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={philosophyInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl lg:text-4xl font-bold mb-8"
            >
              Philosophy
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={philosophyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl lg:text-3xl leading-relaxed text-muted-foreground"
            >
              Design, for me, is about{" "}
              <span className="text-foreground font-medium">clarity</span>,{" "}
              <span className="text-foreground font-medium">momentum</span>, and{" "}
              <span className="text-foreground font-medium">impact</span>. I thrive 
              in environments where I can help shape the big picture, while sweating 
              the details that make an experience truly work.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Outside of Work Section */}
      <section ref={outsideRef} className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={outsideInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Outside of Work
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={outsideInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-lg lg:text-xl leading-relaxed text-muted-foreground">
                Outside of work, I live with my family in Wyoming, where we explore 
                the mountains, remodel our 100-year-old home, and run a local bike 
                and ski shop. I'm happiest outdoors, creating in the kitchen, or 
                riding bikes with my husband and two sons.
              </p>
            </motion.div>

            {/* Photo Collage Grid */}
            <div className="grid grid-cols-3 gap-3">
              {outsideInView && [...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                  className={`aspect-square rounded-lg bg-gradient-to-br ${
                    index % 3 === 0 ? "from-gradient-purple to-gradient-blue" : 
                    index % 3 === 1 ? "from-gradient-blue to-gradient-cyan" : 
                    "from-gradient-cyan to-gradient-purple"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;