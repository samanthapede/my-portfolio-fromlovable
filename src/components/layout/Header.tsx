import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Work", path: "/work" },
];

export const Header = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

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
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 right-4 z-50"
    >
      <nav className="flex items-center gap-8 px-6 py-3 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          Sam Pede
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={cn(
                  "relative text-sm transition-colors py-1 font-semibold",
                  location.pathname === link.path
                    ? "text-[#4A56D4]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#4A56D4] rounded-full"
                    transition={{ type: "spring", stiffness: 320, damping: 40, mass: 0.6 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Dark Mode Toggle */}
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
      </nav>
    </motion.header>
  );
};
