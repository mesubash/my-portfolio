import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import './App.css';
import Navbar from "./components/NavBar";

const App = () => {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Router>
      <div className="app-container font-sans bg-gray-50">
        {/* Header */}
        <Navbar />

        {/* Landing Page Section */}
        <section id="landingpage">
          <LandingPage />
        </section>

        {/* About Section */}
        <section id="about">
          <About />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <Projects />
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center bg-gray-800 text-white py-16"
        >
          <Contact />
        </section>

        {/* "Back to Top" Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all"
        >
          ↑
        </button>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
