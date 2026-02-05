import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const sectionLinks = [
  { name: "Work", id: "work" },
  { name: "About", id: "about" },
];

export const Header = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  const scrollToSection = useCallback((id: string) => {
    // Navigate home first if not on homepage
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current ? "down" : "up";
    
    if (direction === "down" && latest > 100) {
      setIsVisible(false);
      setIsMobileMenuOpen(false);
    } else {
      setIsVisible(true);
    }
    
    lastScrollY.current = latest;
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : -100 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-4 z-50"
      >
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 px-6 py-3 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg">
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
          >
            Sam Pede
          </Link>

          <ul className="flex items-center gap-6">
            {sectionLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="relative text-sm transition-colors py-1 font-semibold text-muted-foreground hover:text-foreground"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            )}
          </button>

          <a
            href="https://calendly.com/sam-geodedesign/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 bg-[#4A56D4] hover:bg-[#5E69D9] text-white text-sm font-semibold rounded-full transition-colors"
          >
            Book a Call
          </a>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center gap-3 px-4 py-3 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg">
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Sam Pede
          </Link>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-foreground" />
            ) : (
              <Moon className="w-4 h-4 text-foreground" />
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-foreground" />
            ) : (
              <Menu className="w-4 h-4 text-foreground" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-4 z-40 md:hidden"
          >
            <div className="bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-lg p-4 min-w-[180px]">
              <ul className="flex flex-col gap-2">
                {sectionLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="block w-full text-left px-4 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
                <li>
                  <a
                    href="https://calendly.com/sam-geodedesign/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left px-4 py-2 rounded-lg text-sm font-semibold text-[#4A56D4] hover:bg-[#4A56D4]/10 transition-colors"
                  >
                    Book a Call
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
