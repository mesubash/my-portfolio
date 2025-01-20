import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import './App.css';

const App = () => (
  <Router>
    <div className="app-container font-sans bg-gray-50">
      {/* Header */}
      <Header />

      {/* Landing Page Section */}
      <section className="flex items-center justify-center bg-blue-600 text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Hello, I'm [Your Name]</h1>
          <p className="text-lg mt-4">A passionate Web Developer</p>
          <a href="#about" className="mt-8 inline-block px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full">
            Learn More
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center bg-gray-800 text-white py-16">
        <About />
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center bg-blue-100 py-16">
        <Projects />
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center bg-gray-800 text-white py-16">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  </Router>
);

export default App;
