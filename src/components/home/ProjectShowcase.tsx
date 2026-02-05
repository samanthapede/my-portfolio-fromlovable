import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "Batching orders",
    description: "Multi-location order fulfillment",
    link: "/work",
  },
  {
    id: 2,
    title: "Fulfillable quantities",
    description: "Real-time inventory visibility",
    link: "/work",
  },
  {
    id: 3,
    title: "Inventory management",
    description: "Streamlined stock operations",
    link: "/work",
  },
  {
    id: 4,
    title: "UI systems",
    description: "Scalable design components",
    link: "/work",
  },
];

export const ProjectShowcase = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-12 lg:py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <Link
                to={project.link}
                className="group block"
              >
                <div className="bg-muted/50 dark:bg-muted/20 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-muted/70 dark:hover:bg-muted/30">
                  {/* Empty frame placeholder */}
                  <div className="aspect-square relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3/4 h-3/4 rounded-xl bg-gradient-to-br from-muted/60 to-muted/30 dark:from-muted/40 dark:to-muted/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                        <div className="w-16 h-16 rounded-lg bg-background/50 dark:bg-background/20 shadow-sm" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Project info */}
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
