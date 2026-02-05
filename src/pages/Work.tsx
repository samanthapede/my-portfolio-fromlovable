import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lock } from "lucide-react";

const projects = [{
  id: 1,
  title: "Batching Orders",
  year: "2024-2025",
  company: "Shopify",
  description: "Designed a fulfillment tool that introduced Batching, allowing merchants to group similar orders for the first time to streamline their picking, packing, and shipping workflows. Currently merchants have to fulfill orders individually or rely on third-party tools that add complexity and fragments their operations. Once launched, Batching will help merchants save time, reduce manual work, and lower fulfillment costs.",
  gradient: "from-gradient-purple to-gradient-blue"
}, {
  id: 2,
  title: "Fulfillable & Sellable Quantities",
  year: "2023-2024",
  company: "Shopify",
  description: "Designed the concept of Sellable, giving merchants greater flexibility in how they manage and sell products. Previously, they could only sell up to their available inventory—unless they disabled tracking or enabled infinite selling, which led to inaccurate stock data. Sellable decoupled selling from physical availability, allowing merchants to sell more or less than what's on hand without losing inventory accuracy. This foundational shift enabled more advanced strategies like backorders and pre-orders, aligning with Shopify's goal of empowering merchants with greater control and scalability.",
  gradient: "from-gradient-blue to-gradient-cyan"
}, {
  id: 3,
  title: "Inventory Management",
  year: "2021-2022",
  company: "Shopify",
  description: "Designed a foundational inventory management tool that enabled merchants of all sizes to effectively track and manage their product inventory across locations. The tool focused on delivering real-time visibility into stock levels, simplifying manual workflows, and ensuring merchants could confidently maintain accurate inventory. The system was intentionally designed with scalability in mind. This foundational work played a key role in supporting Shopify's broader vision of helping merchants sell the right amount of product to the right customers, with greater confidence and efficiency.",
  gradient: "from-gradient-cyan to-gradient-purple"
}];

const Work = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Selected Work</h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xl text-muted-foreground max-w-2xl text-left lg:text-lg"
            >
              My work cannot be shared publicly due to nondisclosure agreements, but I'd be happy to set up a private walkthrough to chat about the process and strategies that went into solving them.
            </motion.p>
          </motion.div>

          {/* Project Cards */}
          <div className="space-y-8 lg:space-y-12">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
    </>
  );
};

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.98 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-sm font-medium text-muted-foreground">
              {project.company}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              {project.year}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors"
          >
            {project.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted-foreground leading-relaxed mb-6"
          >
            {project.description}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-flex items-center gap-2 text-muted-foreground font-medium transition-all"
          >
            <Lock className="w-4 h-4" />
            Request Access
          </motion.button>
        </div>

        {/* Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`aspect-[4/3] lg:aspect-auto bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
        >
          <span className="text-primary-foreground/80 text-lg font-medium">
            Project Image
          </span>
        </motion.div>
      </div>
    </motion.article>
  );
};

export default Work;