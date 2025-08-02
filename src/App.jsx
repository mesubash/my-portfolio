import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
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
    const MINIMUM_LOADING_TIME = 3000; // Minimum time for the preloader (3 seconds)
    const startTime = Date.now();

    const img = new Image();
    img.src = "/assets/profile.webp"; 
    img.onload = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime);

      setTimeout(() => setIsLoading(false), remainingTime);
    };

    // Fallback in case the image fails to load
    const timeout = setTimeout(() => setIsLoading(false), MINIMUM_LOADING_TIME + 2000); // Extra 2 seconds fallback

    return () => clearTimeout(timeout);
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
          <LandingPage />

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

        {/* Go to Top Button with Tooltip */}
        {showScrollToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-5 right-5 p-4 bg-gray-600 text-white rounded-full shadow-lg hover:bg-purple-600 hover:scale-125 transition-transform duration-300 transition-all z-40"
            data-tooltip-id="go-to-top-tooltip"
            data-tooltip-content="Go to Top"
          >
            <FaArrowUp />
          </button>
        )}

        {/* Tooltip for Go to Top Button */}
        <ReactTooltip
          id="go-to-top-tooltip"
          place="left"
          effect="solid"
          className="!bg-gray-800 !text-white !rounded-md !px-2 !py-1"
        />

        <Footer />
      </div>
      )}
    </Router>
  );
};

export default App;