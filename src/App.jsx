import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";
import "./App.css";

const App = () => {
  const [showTop, setShowTop] = useState(false);
  const lenisRef = useRef(null);

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Handle anchor clicks for smooth scroll to sections
    const onClick = (e) => {
      const href = e.target.closest("a")?.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) lenis.scrollTo(el, { offset: -80 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      lenis.destroy();
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Router>
      <div className="app grid-bg">
        <Navbar />

        <main>
          <section id="home"><Hero /></section>
          <div className="divider" />
          <section id="about"><About /></section>
          <div className="divider" />
          <section id="projects"><Projects /></section>
          <div className="divider" />
          <section id="experience"><Experience /></section>
          <div className="divider" />
          <section id="contact"><Contact /></section>
        </main>

        <Footer />

        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={() => lenisRef.current?.scrollTo(0)}
              className="fixed bottom-6 right-6 w-10 h-10 flex items-center justify-center rounded-lg bg-bg-raised border border-white/[0.06] hover:border-white/[0.12] text-slate-500 hover:text-white transition-all z-40"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
