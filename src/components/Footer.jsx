import React from "react";
import { FaEnvelope,FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <a href="#home" className="link link-hover">Home</a>
        <a href="#about" className="link link-hover">About Me</a>
        <a href="#projects" className="link link-hover">Projects</a>
        <a href="#contact" className="link link-hover">Contact Me</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-8">
          <a href="mailto:subashdhamee@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 transform hover:scale-150 hover:rotate-12 transition-transform duration-300">
            <FaEnvelope className="w-6 h-6 fill-current" />
          </a>
          
          <a href="https://x.com/subashdhamee" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 transform hover:scale-150 hover:rotate-12 transition-transform duration-300">
            <FaTwitter className="w-6 h-6 fill-current" />
          </a>
          <a href="https://www.linkedin.com/in/subashsdhami/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 transform hover:scale-150 hover:-rotate-12 transition-transform duration-400">
            <FaLinkedin className="w-6 h-6 fill-current" />
          </a>
          <a href="https://github.com/mesubash" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 transform hover:scale-150 hover:rotate-12 transition-transform duration-300">
            <FaGithub className="w-6 h-6 fill-current" />
          </a>
          <a href="https://www.instagram.com/da.subashh/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 transform hover:scale-150 hover:-rotate-12 transition-transform duration-300">
            <FaInstagram className="w-6 h-6 fill-current" />
          </a>

        </div>
      </nav>
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved.</p>
      </aside>
    </footer>
  );
};

export default Footer;