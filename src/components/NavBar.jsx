import { useState, useEffect } from "react";
import { Home, User, Code2, Mail, FileDown, Briefcase, Menu, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalComponent from "./Terminal";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("landingpage");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      // Active section detection
      const sections = ["landingpage", "about", "projects", "hire-me", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const navItems = [
    { id: "landingpage", href: "#landingpage", Icon: Home, text: "Home" },
    { id: "about", href: "#about", Icon: User, text: "About" },
    { id: "projects", href: "#projects", Icon: Code2, text: "Projects" },
    { id: "hire-me", href: "#hire-me", Icon: Briefcase, text: "Hire" },
    { id: "contact", href: "#contact", Icon: Mail, text: "Contact" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-dark-950/70 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500"
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="flex items-center group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <a href="#landingpage" className="flex items-center space-x-3">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              <Terminal className="w-4 h-4 text-violet-400 relative z-10" />
            </div>
            <span className="text-white font-mono text-sm font-medium tracking-wider">
              subash<span className="text-violet-400">.dev</span>
            </span>
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-1 bg-white/[0.03] backdrop-blur-xl rounded-full px-2 py-1.5 border border-white/[0.06]">
          {navItems.map(({ id, href, Icon, text }) => (
            <li key={id}>
              <a
                href={href}
                className={`relative flex items-center px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeSection === id
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {activeSection === id && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-white/[0.08] border border-white/[0.1] rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 mr-2 relative z-10" />
                <span className="relative z-10">{text}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-2">
          <motion.button
            onClick={() => setIsTerminalOpen(true)}
            className="flex items-center px-4 py-2 bg-white/[0.04] hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-400 rounded-full transition-all duration-300 font-mono text-sm border border-white/[0.06] hover:border-emerald-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Open Interactive Terminal"
          >
            <Terminal className="w-3.5 h-3.5 mr-2" />
            terminal
          </motion.button>

          <motion.a
            href="assets/Subash_Singh_Dhami_Resume.pdf"
            download
            className="flex items-center px-4 py-2 bg-gradient-to-r from-violet-600/80 to-purple-600/80 hover:from-violet-500 hover:to-purple-500 text-white rounded-full transition-all duration-300 font-medium text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileDown className="w-3.5 h-3.5 mr-2" />
            Resume
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden flex items-center justify-center w-10 h-10 text-gray-400 hover:text-white transition-colors duration-300 rounded-xl hover:bg-white/[0.06]"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-dark-950/95 backdrop-blur-2xl border-t border-white/[0.06]"
          >
            <div className="px-6 py-6 space-y-2">
              {navItems.map(({ id, href, Icon, text }, index) => (
                <motion.a
                  key={id}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
                    activeSection === id
                      ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                      : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {text}
                </motion.a>
              ))}

              <div className="pt-4 mt-4 border-t border-white/[0.06] space-y-2">
                <motion.button
                  onClick={() => { setIsTerminalOpen(true); setIsMobileMenuOpen(false); }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center w-full px-4 py-3 bg-white/[0.04] hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-400 rounded-xl transition-all duration-300 font-mono text-sm border border-white/[0.06]"
                >
                  <Terminal className="w-4 h-4 mr-3" />
                  terminal
                </motion.button>

                <motion.a
                  href="assets/Subash_Singh_Dhami_Resume.pdf"
                  download
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="flex items-center px-4 py-3 bg-gradient-to-r from-violet-600/80 to-purple-600/80 text-white rounded-xl transition-all duration-300 font-medium text-sm"
                >
                  <FileDown className="w-4 h-4 mr-3" />
                  Download Resume
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Terminal */}
      <TerminalComponent isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </header>
  );
};

export default NavBar;
