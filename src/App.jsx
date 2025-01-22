import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import './App.css';
import Navbar from "./components/NavBar";

const App = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Router>
      <div className="app-container font-sans bg-gray-800">
        <Navbar />
        
        <main className="relative">
          {/* Landing Page Section */}
          <section id="landingpage" className="relative">
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

          {/* Contact Section */}
          <section id="contact" className="min-h-screen flex items-center justify-center bg-gray-800 text-white py-16 pt-20 -mt-20">
            <Contact />
          </section>
        </main>

        {showScrollToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-5 right-5 p-4 bg-gray-600 text-white rounded-full shadow-lg hover:bg-purple-600 hover:scale-125 transition-transform duration-300 transition-all z-40">
            <FaArrowUp />
          </button>
        )}

        <Footer />
      </div>
    </Router>
  );
};

export default App;