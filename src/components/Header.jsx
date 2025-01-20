import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 bg-gray-800 text-white p-4 shadow-lg z-10">
      <nav>
        <ul className="flex justify-center space-x-8">
          <li>
            <a href="#home" className="hover:text-gray-400">Home</a>
          </li>
          <li>
            <a href="#about" className="hover:text-gray-400">About</a>
          </li>
          <li>
            <a href="#projects" className="hover:text-gray-400">Projects</a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-400">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
