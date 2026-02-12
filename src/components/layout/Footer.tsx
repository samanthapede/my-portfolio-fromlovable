import { motion, useInView } from "framer-motion";
import { Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Footer = () => {
  const footerRef = useRef(null);
  const calendlyRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    checkDarkMode();
    
    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Load Calendly script on mount (no lazy load)
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Prevent scrolling within Calendly iframe after it loads
    const preventScrolling = () => {
      if (calendlyRef.current) {
        const iframe = calendlyRef.current.querySelector('iframe');
        if (iframe) {
          iframe.setAttribute('scrolling', 'no');
          iframe.style.overflow = 'hidden';
          iframe.style.height = '100%';
        }
      }
    };

    setTimeout(preventScrolling, 100);
    setTimeout(preventScrolling, 500);
    setTimeout(preventScrolling, 1000);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <footer id="contact" ref={footerRef} className="bg-warm-gradient-subtle border-t border-border">
      <div className="container mx-auto px-6 lg:px-12 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6 sm:mb-8 text-primary-text dark:text-section-heading">
              Let's clarify your next critical product decision
            </h2>

            <p className="text-base leading-relaxed text-primary-text/70 mb-6">
              If you are building something new or navigating a major product shift and want clear direction before execution, let's talk.
            </p>

            <a
              href="mailto:samanthapede@gmail.com"
              className="email-link-hover inline-flex items-center gap-2 text-base sm:text-lg font-medium text-primary-text underline transition-all duration-300 ease-in-out py-2 min-h-[44px]"
            >
              <span className="email-icon-wrapper">
                <Mail className="w-5 h-5 text-primary-text email-icon" />
              </span>
              samanthapede@gmail.com
            </a>
          </motion.div>

          {/* Right Side - Calendly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-xl overflow-hidden shadow-lg min-h-[500px] h-[70vh] max-h-[800px] sm:h-[65vh] md:h-[70vh] lg:h-[75vh]"
          >
            <div
              key={isDark ? "dark" : "light"}
              ref={calendlyRef}
              className="calendly-inline-widget w-full h-full"
              data-url={
                isDark
                  ? "https://calendly.com/sam-geodedesign/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=60a5fa&background_color=1a1c1f&text_color=fafafa"
                  : "https://calendly.com/sam-geodedesign/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=004e95"
              }
              style={{ minWidth: "320px", height: "100%", colorScheme: "light" }}
            />
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-base text-primary-text/70">
            © {new Date().getFullYear()} Samantha Pede. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/samanthapede/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-muted-foreground hover:warm-gradient-text-nav transition-all duration-300 ease-in-out"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
