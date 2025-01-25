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
    <>
      <header className={`fixed w-full z-50 ${isTransparent ? 'bg-transparent' : 'bg-gray-800 shadow-lg'}`}>
        <nav className="w-full px-6 py-4 flex justify-between items-center">
          <div className="flex items-center ml-10 hover:scale-150 transition-transform duration-300">
            <a href="https://www.subashsdhami.com.np/">
              <img src="./assets/mylogo.png" alt="Logo" className="h-10" />
            </a>
          </div>
          <ul className="flex justify-end items-center space-x-12">
            {navItems.map(({ id, href, Icon, text }) => (
              <li key={id} className="relative">
                <a 
                  href={href}
                  className="flex items-center justify-center w-10 h-10 hover:scale-150 transition-transform duration-300"
                >
                  <Icon 
                    className={`w-6 h-6 transition-colors duration-300 ${
                      activeSection === id ? 'text-purple-500' : 'text-white hover:text-purple-400'
                    }`}
                  />
                  <span className="absolute whitespace-nowrap left-1/2 -translate-x-1/2 -bottom-6 text-sm text-white opacity-0 hover:opacity-100 transition-opacity">
                    {text}
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a 
                href="/assets/Resume-subash.pdf" 
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
    </>
  );
};

export default NavBar;