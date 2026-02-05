import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const Footer = () => {
  const calendlyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className="bg-[#F1F4FB] dark:!bg-background border-t border-border">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Let's build something{" "}
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-[#4A56D4] transition-colors duration-500 ease-out cursor-pointer hover:text-[#5E69D9]">
                      great together.
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-sm bg-black/90 backdrop-blur-xl text-white border border-white/10 rounded-none px-5 py-4 text-base font-medium shadow-[0_0_30px_rgba(74,86,212,0.3)]">
                    <p className="leading-relaxed">
                      🚀 If you want to go fast, go alone. If you want to go far, go together. 🤝
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Ready to create something amazing? Book a call to discuss your project
              or reach out via email.
            </p>

            <a
              href="mailto:samanthapede@gmail.com"
              className="inline-flex items-center gap-2 text-lg font-medium text-primary hover:underline"
            >
              <Mail className="w-5 h-5" />
              samanthapede@gmail.com
            </a>
          </motion.div>

          {/* Right Side - Calendly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-xl overflow-hidden shadow-lg"
          >
            <div
              ref={calendlyRef}
              className="calendly-inline-widget"
              data-url="https://calendly.com/sam-geodedesign/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=4a56d4"
              style={{ minWidth: "320px", height: "500px" }}
            />
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Samantha Pede. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
