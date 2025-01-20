import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import './App.css';

const App = () => (
  <Router>
    <div className="app-container font-sans bg-gray-50">
      {/* Header */}
      <Header />

      {/* Landing Page Section */}
      <section id="landingpage">
       <LandingPage/>
      </section>

      {/* About Section */}
      <section id="about">
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
