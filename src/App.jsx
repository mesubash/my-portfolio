import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import "./App.css";
import Navbar from "./components/NavBar";
import Preloader from "./components/Preloader";
import WelcomeToast from "./components/WelcomeToast";
import HireMe from "./components/HireMe";
import MouseFollower from "./components/MouseFollower";

const App = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading && window.location.hash) {
      const currentUrl = window.location.href.split("#")[0];
      window.history.replaceState(null, null, currentUrl);
    }
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => setShowScrollToTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
    if (window.location.hash) {
      const currentUrl = window.location.href.split("#")[0];
      window.history.replaceState(null, null, currentUrl);
    }
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        ) : (
          <motion.div
            key="app"
            className="app-container noise-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MouseFollower />

            <div className="mesh-gradient">
              <div className="orb orb-1" />
              <div className="orb orb-2" />
              <div className="orb orb-3" />
            </div>

            <Navbar />

            <main className="relative z-10">
              <section id="landingpage"><LandingPage /></section>
              <div className="section-divider" />
              <section id="about"><About /></section>
              <div className="section-divider" />
              <section id="projects"><Projects /></section>
              <div className="section-divider" />
              <section id="hire-me"><HireMe /></section>
              <div className="section-divider" />
              <section id="contact"><Contact /></section>
            </main>

            <AnimatePresence>
              {showScrollToTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  onClick={scrollToTop}
                  className="fixed bottom-6 right-6 group flex items-center justify-center w-11 h-11 bg-white/[0.05] hover:bg-violet-500/20 border border-white/[0.08] hover:border-violet-500/30 text-gray-400 hover:text-violet-400 rounded-xl backdrop-blur-xl shadow-2xl transition-colors duration-300 z-40"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowUp className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>

            <WelcomeToast />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
};

export default App;
