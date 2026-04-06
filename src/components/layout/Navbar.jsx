import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FileDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "writings", label: "Writings", isSection: true },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  const isWritingsPage = location.pathname.startsWith("/writings");
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);

      if (isHomePage) {
        for (let i = navItems.length - 1; i >= 0; i--) {
          const el = document.getElementById(navItems[i].id);
          if (el && el.getBoundingClientRect().top <= 120) { setActive(navItems[i].id); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  useEffect(() => {
    if (isWritingsPage) setActive("writings-page");
  }, [isWritingsPage]);

  useEffect(() => {
    const onEsc = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#07080c]/80 backdrop-blur-xl border-b border-white/[0.04] shadow-2xl shadow-black/20" : ""}`}>
      {/* Progress bar — only on home page */}
      {isHomePage && <div className="absolute top-0 left-0 h-[2px] bg-indigo" style={{ width: `${progress}%` }} />}

      <nav className="max-w-6xl mx-auto px-5 sm:px-6 py-4 flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.02 }}>
          <Link to="/" className="font-heading text-sm font-semibold text-white tracking-wide">
            subash<span className="text-indigo">.dev</span>
          </Link>
        </motion.div>

        {/* Desktop nav with animated pill */}
        <ul className="hidden md:flex items-center gap-0.5 bg-bg-card/70 rounded-full px-1.5 py-1 border border-white/[0.04] backdrop-blur-sm">
          {navItems.map(({ id, label, isSection }) => {
            const isActive = isSection ? (isWritingsPage || active === id) : active === id;
            return (
              <li key={id}>
                {isHomePage && !isSection ? (
                  <a href={`#${id}`} className={`relative px-4 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-200 block ${isActive ? "text-white" : "text-slate-500 hover:text-slate-300"}`}>
                    {isActive && (
                      <motion.span layoutId="nav-active" className="absolute inset-0 bg-white/[0.07] border border-white/[0.06] rounded-full" transition={{ type: "spring", bounce: 0.15, duration: 0.5 }} />
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                ) : isSection ? (
                  <Link to="/writings" className={`relative px-4 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200 block ${isActive ? "text-white" : "text-indigo-light/80 hover:text-white"}`}>
                    {isActive ? (
                      <motion.span layoutId="nav-active" className="absolute inset-0 bg-white/[0.07] border border-white/[0.06] rounded-full" transition={{ type: "spring", bounce: 0.15, duration: 0.5 }} />
                    ) : (
                      <span className="absolute inset-0 border border-indigo/25 rounded-full" />
                    )}
                    <span className="relative z-10">{label}</span>
                  </Link>
                ) : (
                  <a href={`/#${id}`} className="relative px-4 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-200 block text-slate-500 hover:text-slate-300">
                    <span className="relative z-10">{label}</span>
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <motion.a href="assets/Subash_Singh_Dhami_Resume.pdf" download className="hidden md:flex items-center gap-2 px-4 py-1.5 text-[13px] font-medium text-slate-400 hover:text-white border border-white/[0.06] hover:border-indigo/30 rounded-full transition-all duration-300" whileHover={{ y: -1 }}>
          <FileDown className="w-3.5 h-3.5" /> Resume
        </motion.a>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white transition-colors" aria-label="Menu">
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="md:hidden overflow-hidden bg-[#07080c]/95 backdrop-blur-xl border-t border-white/[0.04]">
            <div className="px-5 py-5 space-y-1">
              {navItems.map(({ id, label, isSection }, i) => {
                const mobileActive = isSection ? isWritingsPage : (active === id && isHomePage);
                const href = isHomePage ? `#${id}` : `/#${id}`;
                return isSection ? (
                  <motion.div key={id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}>
                    <Link to="/writings" onClick={() => setMobileOpen(false)} className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${mobileActive ? "text-white bg-white/[0.04]" : "text-slate-500 hover:text-slate-300"}`}>
                      {label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a key={id} href={href} onClick={() => setMobileOpen(false)} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }} className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${mobileActive ? "text-white bg-white/[0.04]" : "text-slate-500 hover:text-slate-300"}`}>
                    {label}
                  </motion.a>
                );
              })}
              <div className="pt-3 border-t border-white/[0.04]">
                <a href="assets/Subash_Singh_Dhami_Resume.pdf" download onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-400">
                  <FileDown className="w-4 h-4" /> Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
