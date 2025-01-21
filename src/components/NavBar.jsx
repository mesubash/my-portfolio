// NavBar.jsx
import React, { useState, useEffect } from "react";

const NavBar = () => {
  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Check if we're at the top of the page
      if (window.scrollY < 50) {
        setIsTransparent(true);
      } else {
        setIsTransparent(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent 
          ? 'bg-transparent' 
          : 'bg-gray-800 shadow-lg'
      }`}
    >
      <nav className="px-4 py-4">
        <ul className="flex justify-center space-x-8">
          <li>
            <a href="#landingpage" className="text-white hover:text-gray-400 transition-colors">Home</a>
          </li>
          <li>
            <a href="#about" className="text-white hover:text-gray-400 transition-colors">About Me</a>
          </li>
          <li>
            <a href="#projects" className="text-white hover:text-gray-400 transition-colors">Projects</a>
          </li>
          <li>
            <a href="#contact" className="text-white hover:text-gray-400 transition-colors">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;