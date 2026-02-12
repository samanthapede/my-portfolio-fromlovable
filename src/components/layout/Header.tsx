import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

const sectionLinks = [
  { name: "Work", id: "work" },
  { name: "About", id: "about" },
  { name: "Contact", id: "contact" },
];

export const Header = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  const scrollToSection = useCallback((id: string) => {
    // Navigate home first if not on homepage
    if (location.pathname !== "/") {
      // For "home", just go to homepage without hash
      if (id === "home") {
        window.location.href = "/";
        return;
      }
      window.location.href = `/#${id}`;
      return;
    }
    
    // Handle "home" - scroll to top
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsMobileMenuOpen(false);
      return;
    }
    
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionLinks.map(link => {
        const el = document.getElementById(link.id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          id: link.id,
          top: rect.top,
          bottom: rect.bottom,
        };
      }).filter(Boolean) as Array<{ id: string; top: number; bottom: number }>;

      // Find the section currently in view
      const currentSection = sections.find(section => 
        section.top <= 150 && section.bottom >= 150
      ) || sections.find(section => section.top > 0 && section.top < window.innerHeight);

      // If at top, set to home
      if (window.scrollY < 100) {
        setActiveSection("home");
      } else if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        className="fixed top-4 left-6 right-6 md:left-auto md:right-4 flex justify-center md:justify-end z-50"
      >
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 px-6 py-3 backdrop-blur-md border-warm-gradient rounded-[20px] relative z-0">
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="text-lg font-semibold tracking-tight text-primary-text hover:opacity-90 transition-opacity"
          >
            Sam Pede
          </Link>

          <ul className="flex items-center gap-6">
            {sectionLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={cn(
                      "nav-item relative text-sm py-1 font-medium text-muted-foreground transition-all duration-300 ease-in-out",
                      isActive && "font-bold warm-gradient-text-nav"
                    )}
                  >
                    <span className="nav-item-inner">
                      <span className="nav-item-visible">{link.name}</span>
                      <span className="nav-item-bold" aria-hidden="true">{link.name}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            onClick={toggleDarkMode}
            className="p-2.5 md:p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 flex items-center justify-center"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex flex-col gap-0 md:hidden w-full">
          <div
            className={cn(
              "flex items-center justify-between gap-3 px-4 py-3 backdrop-blur-md border-warm-gradient w-full min-h-[56px]",
              isMobileMenuOpen ? "rounded-t-[20px] border-b-0" : "rounded-[20px]"
            )}
          >
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setIsMobileMenuOpen(false);
                }
              }}
              className="text-lg font-semibold tracking-tight text-primary-text hover:opacity-90 transition-opacity"
            >
              Sam Pede
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="backdrop-blur-md border-warm-gradient border-t-0 rounded-b-[20px] p-4 min-w-[200px]">
              <ul className="flex flex-col gap-2">
                {sectionLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <li key={link.id}>
                      <button
                        onClick={() => scrollToSection(link.id)}
                        className={cn(
                          "block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground transition-all duration-300 ease-in-out min-h-[44px] flex items-center hover:bg-muted/50 hover:font-semibold",
                          isActive && "font-bold warm-gradient-text-nav hover:font-bold"
                        )}
                      >
                        {link.name}
                      </button>
                    </li>
                  );
                })}
                <li className="border-t border-border mt-2 pt-2">
                  <div className="flex w-full items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground min-h-[44px] hover:bg-muted/50 hover:font-semibold transition-all duration-300 cursor-pointer">
                    <label
                      htmlFor="mobile-theme-toggle"
                      className="inline-flex cursor-pointer items-center gap-3 min-w-0 flex-1"
                    >
                      {isDark ? (
                        <>
                          <Moon className="w-5 h-5 shrink-0" />
                          <span className="whitespace-nowrap">Dark mode</span>
                        </>
                      ) : (
                        <>
                          <Sun className="w-5 h-5 shrink-0" />
                          <span className="whitespace-nowrap">Light mode</span>
                        </>
                      )}
                    </label>
                    <Switch
                      id="mobile-theme-toggle"
                      checked={isDark}
                      onCheckedChange={toggleDarkMode}
                      aria-label="Toggle dark mode"
                    />
                  </div>
                </li>
              </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
};
