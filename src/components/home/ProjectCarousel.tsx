import { motion } from "framer-motion";

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
  // Duplicate for infinite scroll effect
  const allImages = [...projectImages, ...projectImages];

  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="relative">
        <div
          className="flex gap-4 animate-scroll-left-slow"
          style={{ width: "fit-content" }}
        >
          {allImages.map((img, index) => (
            <div
              key={`top-${index}`}
              className={`flex-shrink-0 w-64 h-48 lg:w-80 lg:h-56 rounded-xl bg-gradient-to-br ${img.color} flex items-center justify-center shadow-lg`}
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
