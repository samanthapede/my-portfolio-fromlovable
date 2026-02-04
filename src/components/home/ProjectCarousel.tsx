import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Placeholder project images for the carousel
const projectImages = [
  { id: 1, color: "from-gradient-purple to-gradient-blue", label: "Batching Orders" },
  { id: 2, color: "from-gradient-blue to-gradient-cyan", label: "Sellable Quantities" },
  { id: 3, color: "from-gradient-cyan to-gradient-purple", label: "Inventory Mgmt" },
  { id: 4, color: "from-gradient-purple to-gradient-blue", label: "Project 4" },
  { id: 5, color: "from-gradient-blue to-gradient-cyan", label: "Project 5" },
  { id: 6, color: "from-gradient-cyan to-gradient-purple", label: "Project 6" },
];

export const ProjectCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate for infinite scroll effect
  const allImages = [...projectImages, ...projectImages];

  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl lg:text-3xl font-bold text-center mb-4"
        >
          Recent Projects
        </motion.h2>
      </div>

      {/* Top Row - Scroll Left */}
      <div
        className="relative mb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`flex gap-4 ${isHovered ? "" : "animate-scroll-left"}`}
          style={{ width: "fit-content" }}
        >
          {allImages.map((img, index) => (
            <div
              key={`top-${index}`}
              className={`flex-shrink-0 w-64 h-48 lg:w-80 lg:h-56 rounded-xl bg-gradient-to-br ${img.color} flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer`}
            >
              <span className="text-primary-foreground font-medium text-lg">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row - Scroll Right */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`flex gap-4 ${isHovered ? "" : "animate-scroll-right"}`}
          style={{ width: "fit-content" }}
        >
          {allImages.map((img, index) => (
            <div
              key={`bottom-${index}`}
              className={`flex-shrink-0 w-64 h-48 lg:w-80 lg:h-56 rounded-xl bg-gradient-to-br ${img.color} flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer`}
            >
              <span className="text-primary-foreground font-medium text-lg">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
