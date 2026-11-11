import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "#home", type: "scroll" },
  { name: "About", href: "#about", type: "scroll" },
  { name: "Skills", href: "#skills", type: "scroll" },
  { name: "Experience", href: "#experience", type: "scroll" },
  { name: "Projects", href: "#projects", type: "scroll" },
  { name: "Contact", href: "#contact", type: "scroll" },
  { name: "Resume", href: "/resume", type: "route" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, link) => {
    e.preventDefault();
    const wasOpen = isOpen;
    setIsOpen(false);

    if (link.type === "route") {
      navigate(link.href);
    } else {
      if (location.pathname === "/") {
        const delay = wasOpen ? 280 : 0;
        setTimeout(() => {
          const element = document.querySelector(link.href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, delay);
      } else {
        navigate("/", { state: { scrollTo: link.href } });
      }
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-[#080416]/80 border-b border-slate-200/60 dark:border-[#2d1e5a]/60 transition-colors duration-300"
      style={{ backdropFilter: "blur(20px) saturate(180%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1 group"
          >
            <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              Imtiaz
            </span>
            <span className="text-slate-800 dark:text-slate-200 font-extrabold font-mono text-xl">
              &lt;dev/&gt;
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isRouteActive = location.pathname === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-sm font-semibold tracking-wide transition-all duration-300 relative py-1 hover:text-indigo-500 dark:hover:text-indigo-400
                    ${
                      isRouteActive
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-600 dark:text-slate-300"
                    }
                  `}
                >
                  {link.name}
                  {isRouteActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Mobile Button */}
            <button
              onClick={toggleMenu}
              aria-label="Toggle Navigation Menu"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1c1241]/60 transition-colors focus:outline-none"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-[#080416]/95 border-t border-slate-200/60 dark:border-[#2d1e5a]/60"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-lg font-medium py-2 text-slate-700 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors border-b border-slate-100 dark:border-[#1b1b24]/50 last:border-0"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
