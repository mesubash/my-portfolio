import React, { useState, useEffect } from "react";
import { Home, User, FolderGit2, Mail, FileDown } from "lucide-react";

const NavBar = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [activeSection, setActiveSection] = useState('landingpage');

  useEffect(() => {
    const handleScroll = () => {
      setIsTransparent(window.scrollY < 50);

      const sections = ['landingpage', 'about', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'landingpage', href: '#landingpage', Icon: Home, text: 'Home' },
    { id: 'about', href: '#about', Icon: User, text: 'About Me' },
    { id: 'projects', href: '#projects', Icon: FolderGit2, text: 'Projects' },
    { id: 'contact', href: '#contact', Icon: Mail, text: 'Contact' },
  ];

  return (
    <header className={`fixed w-full z-50 ${isTransparent ? 'bg-transparent' : 'bg-gray-800 shadow-lg'}`}>
      <nav className="w-full px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center ml-10 hover:scale-125 transition-transform duration-300">
          <a href="https://www.subashsdhami.com.np/">
            <img src="./assets/mylogo.png" alt="Logo" className="h-10" />
          </a>
        </div>

        {/* Navigation Links */}
        <ul className="flex justify-end items-center space-x-10">
          {navItems.map(({ id, href, Icon, text }) => (
            <li key={id} className="relative group">
              <a 
                href={href}
                className="flex items-center justify-center w-10 h-10 hover:scale-125 transition-transform duration-300"
              >
                <Icon 
                  className={`w-6 h-6 transition-colors duration-300 ${
                    activeSection === id ? 'text-purple-500' : 'text-white hover:text-purple-400'
                  }`}
                />
              </a>
              
              {/* Tooltip */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out bg-gray-900/90 text-white text-sm font-semibold rounded-md px-3 py-1 shadow-lg">
                {text}
                {/* Tooltip Arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 bg-gray-900/90 rotate-45"></div>
              </div>
            </li>
          ))}

          {/* CV Download */}
          <li>
            <a 
              href="assets/Subash_Singh_Dhami_Resume.pdf" 
              download
              className="flex items-center px-4 py-2 bg-gray-500 hover:bg-purple-600 text-white rounded-full transition-colors duration-300"
            >
              <FileDown className="w-5 h-5 mr-2" />
              <span>CV</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
