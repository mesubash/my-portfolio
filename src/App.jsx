import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";
import WritingsPage from "./components/writings/WritingsPage";
import WritingDetail from "./components/writings/WritingDetail";
import "./App.css";

const HomePage = () => (
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
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app grid-bg">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/writings" element={<WritingsPage />} />
          <Route path="/writings/:slug" element={<WritingDetail />} />
        </Routes>

        <Footer />

        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
