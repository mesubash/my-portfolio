import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ArrowUp, Terminal } from "lucide-react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import "./App.css";
import Navbar from "./components/NavBar";
import Preloader from "./components/Preloader";
import HireMe from "./components/HireMe";

const App = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Clear hash on initial load if preloader is showing
  useEffect(() => {
    if (isLoading && window.location.hash) {
      const currentUrl = window.location.href.split('#')[0];
      window.history.replaceState(null, null, currentUrl);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const LOADING_TIME = 2000; // Show preloader for exactly 2 seconds
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Clear any hash from URL after loading completes
      if (window.location.hash) {
        // Use history.replaceState to clear hash without affecting browser history
        const currentUrl = window.location.href.split('#')[0];
        window.history.replaceState(null, null, currentUrl);
      }
    }, LOADING_TIME);

    return () => clearTimeout(timer);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Router>
      {/* Preloader Component */}
      {isLoading ? (
        <Preloader />
      ):(
      <div className="app-container font-sans bg-gray-800">
        <Navbar />

        <main className="relative">
          {/* Landing Page Section */}
          <section id="landingpage">
            <LandingPage />
          </section>

          {/* About Section */}
          <section id="about" className="bg-gray-800 pt-20 -mt-18">
            <About />
          </section>

          {/* Projects Section */}
          <section id="projects" className="bg-gray-800 pt-20 -mt-18">
            <Projects />
          </section>

          {/* Hire Me Section */}
          <section id="hire-me" className="bg-gray-800">
            <HireMe />
          </section>

          {/* Contact Section */}
          <section
            id="contact"
            className="min-h-screen flex items-center justify-center bg-gray-800 text-white py-16 pt-20 -mt-20"
          >
            <Contact />
          </section>
        </main>

        {/* Enhanced Developer-Style Go to Top Button */}
        {showScrollToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 group flex items-center justify-center w-12 h-12 bg-gray-800/90 hover:bg-purple-600 border border-gray-600 hover:border-purple-400 text-gray-300 hover:text-white rounded-lg backdrop-blur-sm shadow-lg hover:shadow-purple-500/25 transition-all duration-300 z-40"
            data-tooltip-id="go-to-top-tooltip"
            data-tooltip-content="$ cd ~"
          >
            <ArrowUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </button>
        )}

        {/* Enhanced Tooltip */}
        <ReactTooltip
          id="go-to-top-tooltip"
          place="left"
          effect="solid"
          className="!bg-gray-900 !text-green-400 !border !border-gray-700 !rounded-md !px-3 !py-2 !font-mono !text-sm"
        />

        <Footer />
      </div>
      )}
    </Router>
  );
};

export default App;