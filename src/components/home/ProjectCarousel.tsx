import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Project images for the carousel
import chatbot from "@/assets/projects/chatbot.png";
import columnPicker from "@/assets/projects/column-picker.png";
import dashboardMetrics from "@/assets/projects/dashboard-metrics.png";
import fulfillableAdmin from "@/assets/projects/fulfillable-admin.png";
import fulfillableStorefront from "@/assets/projects/fulfillable-storefront.png";
import sellFromIncoming from "@/assets/projects/sell-from-incoming.png";
import uiUplift from "@/assets/projects/ui-uplift.png";
import unavailable from "@/assets/projects/unavailable.png";

const projectImages = [{
  id: 1,
  src: fulfillableStorefront,
  alt: "Fulfillable Storefront"
}, {
  id: 2,
  src: dashboardMetrics,
  alt: "Dashboard Metrics"
}, {
  id: 3,
  src: uiUplift,
  alt: "UI Uplift"
}, {
  id: 4,
  src: chatbot,
  alt: "Chatbot"
}, {
  id: 5,
  src: unavailable,
  alt: "Unavailable Inventory"
}, {
  id: 6,
  src: columnPicker,
  alt: "Column Picker"
}, {
  id: 7,
  src: sellFromIncoming,
  alt: "Sell from Incoming"
}, {
  id: 8,
  src: fulfillableAdmin,
  alt: "Fulfillable Admin"
}];

export const ProjectCarousel = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  
  // Duplicate for infinite scroll effect
  const allImages = [...projectImages, ...projectImages];

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        {isInView && (
          <div
            className="flex gap-4 animate-scroll-left-slow"
            style={{ width: "fit-content" }}
          >
            {allImages.map((img, index) => (
              <motion.div
                key={`top-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
                className="flex-shrink-0 w-64 h-auto lg:w-80 rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full shadow-none border-0 border-none rounded-none object-contain"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};