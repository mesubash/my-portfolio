import React, { useState, useEffect } from "react";
import { Home, User, FolderGit2, Mail, FileDown, Briefcase, Menu, X } from "lucide-react";

const NavBar = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [activeSection, setActiveSection] = useState('landingpage');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsTransparent(window.scrollY < 50);

      const sections = ['landingpage', 'about', 'projects', 'hire-me', 'contact'];
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
    { id: 'about', href: '#about', Icon: User, text: 'About' },
    { id: 'projects', href: '#projects', Icon: FolderGit2, text: 'Projects' },
    { id: 'hire-me', href: '#hire-me', Icon: Briefcase, text: 'Hire Me' },
    { id: 'contact', href: '#contact', Icon: Mail, text: 'Contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent' : 'bg-gray-800/95 backdrop-blur-sm shadow-lg'}`}>
      <nav className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center hover:scale-105 transition-transform duration-300">
          <a href="https://www.subashsdhami.com.np/">
            <img src="./assets/mylogo.png" alt="Logo" className="h-8 sm:h-10" />
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex justify-end items-center space-x-6 xl:space-x-8">
          {navItems.map(({ id, href, Icon, text }) => (
            <li key={id} className="relative group">
              <a 
                href={href}
                className="flex items-center justify-center w-10 h-10 hover:scale-110 transition-transform duration-300"
              >
                <Icon 
                  className={`w-5 h-5 xl:w-6 xl:h-6 transition-colors duration-300 ${
                    activeSection === id ? 'text-purple-500' : 'text-white hover:text-purple-400'
                  }`}
                />
              </a>
              
              {/* Tooltip */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out bg-gray-900/90 text-white text-sm font-medium rounded-md px-3 py-1 shadow-lg whitespace-nowrap">
                {text}
                <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 bg-gray-900/90 rotate-45"></div>
              </div>
            </li>
          ))}

          {/* CV Download */}
          <li>
            <a 
              href="assets/Subash_Singh_Dhami_Resume.pdf" 
              download
              className="flex items-center px-3 xl:px-4 py-2 bg-gray-600 hover:bg-purple-600 text-white rounded-full transition-colors duration-300 text-sm"
            >
              <FileDown className="w-4 h-4 mr-1 xl:mr-2" />
              <span className="hidden xl:inline">CV</span>
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden flex items-center justify-center w-10 h-10 text-white hover:text-purple-400 transition-colors duration-300"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      } bg-gray-800/95 backdrop-blur-sm`}>
        <ul className="px-4 py-4 space-y-2">
          {navItems.map(({ id, href, Icon, text }) => (
            <li key={id}>
              <a 
                href={href}
                onClick={closeMobileMenu}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-300 ${
                  activeSection === id 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{text}</span>
              </a>
            </li>
          ))}
          
          {/* Mobile CV Download */}
          <li>
            <a 
              href="assets/Subash_Singh_Dhami_Resume.pdf" 
              download
              onClick={closeMobileMenu}
              className="flex items-center px-4 py-3 bg-gray-600 hover:bg-purple-600 text-white rounded-lg transition-colors duration-300"
            >
              <FileDown className="w-5 h-5 mr-3" />
              <span className="font-medium">Download CV</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
