// App.jsx
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
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Router>
      <div className="app-container font-sans">
        <Navbar />
        
        <main className="relative">
          {/* Landing Page Section */}
          <section id="landingpage" className="relative">
            <LandingPage />
          </section>

          {/* About Section */}
          <section id="about" className="bg-gray-50">
            <About />
          </section>

          {/* Projects Section */}
          <section id="projects" className="bg-gray-50">
            <Projects />
          </section>

          {/* Contact Section */}
          <section id="contact" className="min-h-screen flex items-center justify-center bg-gray-800 text-white py-16">
            <Contact />
          </section>
        </main>

        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all z-40"
        >
          ↑
        </button>

        <Footer />
      </div>
    </Router>
  );
};

export default App;