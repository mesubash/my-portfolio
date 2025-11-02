import React, { useState, useEffect } from "react";
import { Home, User, Code2, Mail, FileDown, Briefcase, Menu, X, Terminal } from "lucide-react";
import TerminalComponent from "./Terminal";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('landingpage');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

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
    { id: 'landingpage', href: '#landingpage', Icon: Home, text: 'home' },
    { id: 'about', href: '#about', Icon: User, text: 'about' },
    { id: 'projects', href: '#projects', Icon: Code2, text: 'projects' },
    { id: 'hire-me', href: '#hire-me', Icon: Briefcase, text: 'hire' },
    { id: 'contact', href: '#contact', Icon: Mail, text: 'contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/20 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Minimalist Logo */}
        <div className="flex items-center group">
          <a href="https://www.subashsdhami.com.np/" className="flex items-center space-x-2">
            <Terminal className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
            <span className="text-white font-mono text-sm font-medium tracking-wider">
              dev.portfolio
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-1">
          {navItems.map(({ id, href, Icon, text }) => (
            <li key={id}>
              <a 
                href={href}
                className={`group flex items-center px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 transform ${
                  activeSection === id 
                    ? 'bg-purple-500/20 text-purple-300 shadow-lg shadow-purple-500/20' 
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white hover:-translate-y-0.5 hover:shadow-md'
                }`}
              >
                <Icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                {text}
              </a>
            </li>
          ))}

          {/* Terminal Button */}
          <li className="ml-2">
            <button 
              onClick={() => setIsTerminalOpen(true)}
              className="group flex items-center px-4 py-2 bg-gray-800/50 hover:bg-green-600 text-gray-300 hover:text-white rounded-lg transition-all duration-300 font-mono text-sm border border-gray-600 hover:border-green-500 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5"
              title="Open Interactive Terminal"
            >
              <Terminal className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
              terminal
            </button>
          </li>

          {/* Minimalist CV Download */}
          <li className="ml-2">
            <a 
              href="assets/Subash_Singh_Dhami_Resume.pdf" 
              download
              className="group flex items-center px-4 py-2 bg-gray-700/50 hover:bg-purple-600 text-white rounded-lg transition-all duration-300 font-mono text-sm border border-gray-600 hover:border-purple-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5"
            >
              <FileDown className="w-4 h-4 mr-2 group-hover:scale-110 group-hover:translate-y-0.5 transition-all duration-300" />
              resume.pdf
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden flex items-center justify-center w-10 h-10 text-white hover:text-purple-400 transition-colors duration-300 rounded-lg hover:bg-gray-700/50"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Enhanced Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      } bg-gray-900/95 backdrop-blur-lg border-t border-gray-700/20`}>
        <ul className="px-6 py-6 space-y-2">
          {navItems.map(({ id, href, Icon, text }) => (
            <li key={id}>
              <a 
                href={href}
                onClick={closeMobileMenu}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 font-mono text-sm ${
                  activeSection === id 
                    ? 'bg-purple-500/20 text-purple-300 shadow-lg shadow-purple-500/20' 
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 mr-3" />
                <span>{text}</span>
              </a>
            </li>
          ))}
          
          {/* Mobile Terminal Button */}
          <li>
            <button 
              onClick={() => {
                setIsTerminalOpen(true);
                closeMobileMenu();
              }}
              className="flex items-center w-full px-4 py-3 bg-gray-800/50 hover:bg-green-600 text-gray-300 hover:text-white rounded-lg transition-all duration-300 font-mono text-sm border border-gray-600"
            >
              <Terminal className="w-4 h-4 mr-3" />
              <span>terminal</span>
            </button>
          </li>

          {/* Mobile CV Download */}
          <li className="pt-2 border-t border-gray-700/30">
            <a 
              href="assets/Subash_Singh_Dhami_Resume.pdf" 
              download
              onClick={closeMobileMenu}
              className="flex items-center px-4 py-3 bg-gray-700/50 hover:bg-purple-600 text-white rounded-lg transition-all duration-300 font-mono text-sm border border-gray-600"
            >
              <FileDown className="w-4 h-4 mr-3" />
              <span>resume.pdf</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Interactive Terminal */}
      <TerminalComponent 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </header>
  );
};

export default NavBar;
