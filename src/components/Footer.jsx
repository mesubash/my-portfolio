import React, { useState } from "react";
import { Mail, Twitter, Linkedin, Github, Instagram, Terminal, Code2 } from "lucide-react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import TerminalComponent from "./Terminal";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("subashdhamee@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  const socialLinks = [
    { 
      href: "mailto:subashdhamee@gmail.com", 
      Icon: Mail, 
      label: "email", 
      tooltip: copied ? "copied!" : "subashdhamee@gmail.com",
      onClick: copyEmail,
      special: true
    },
    { 
      href: "https://github.com/mesubash", 
      Icon: Github, 
      label: "github", 
      tooltip: "/mesubash" 
    },
    { 
      href: "https://www.linkedin.com/in/subashsdhami/", 
      Icon: Linkedin, 
      label: "linkedin", 
      tooltip: "/in/subashsdhami" 
    },
    { 
      href: "https://x.com/subashdhamee", 
      Icon: Twitter, 
      label: "twitter", 
      tooltip: "@subashdhamee" 
    },
    { 
      href: "https://www.instagram.com/da.subashh/", 
      Icon: Instagram, 
      label: "instagram", 
      tooltip: "@da.subashh" 
    },
  ];

  const quickLinks = [
    { href: "#landingpage", text: "home" },
    { href: "#about", text: "about" },
    { href: "#projects", text: "projects" },
    { href: "#hire-me", text: "hire" },
    { href: "#contact", text: "contact" },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Terminal className="w-5 h-5 text-purple-400" />
              <span className="text-white font-mono text-lg font-medium">dev.portfolio</span>
            </div>
            <p className="text-gray-400 text-sm font-mono leading-relaxed">
              // Building digital experiences<br />
              // One line of code at a time
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h3 className="text-white font-mono text-sm font-medium flex items-center">
              <Code2 className="w-4 h-4 mr-2 text-purple-400" />
              navigation
            </h3>
            <nav className="grid grid-cols-2 gap-2">
              {quickLinks.map(({ href, text }) => (
                <a
                  key={text}
                  href={href}
                  className="group text-gray-400 hover:text-purple-400 font-mono text-sm transition-all duration-300 hover:translate-x-2 transform inline-block"
                >
                  <span className="group-hover:font-semibold">./{text}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-white font-mono text-sm font-medium flex items-center">
              <Terminal className="w-4 h-4 mr-2 text-purple-400" />
              connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ href, Icon, label, tooltip, onClick, special }) => (
                <div key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={special ? onClick : undefined}
                    className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-purple-600 border border-gray-700 hover:border-purple-400 text-gray-400 hover:text-white rounded-lg transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1"
                    data-tooltip-id={`${label}-tooltip`}
                    data-tooltip-content={tooltip}
                  >
                    <Icon className="w-4 h-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-gray-500 font-mono text-xs">
                © {new Date().getFullYear()} • crafted with ❤️ and ☕
              </p>
              <button
                onClick={() => setIsTerminalOpen(true)}
                className="group flex items-center px-2 py-1 bg-gray-800 hover:bg-green-600 border border-gray-700 hover:border-green-500 text-gray-400 hover:text-white rounded transition-all duration-300 font-mono text-xs hover:scale-105 hover:shadow-md hover:shadow-green-500/30 transform"
                title="Open Terminal"
              >
                <Terminal className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform duration-300" />
                cli
              </button>
            </div>
            <p className="text-gray-500 font-mono text-xs">
              // powered by react + vite
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Tooltips */}
      {socialLinks.map(({ label, tooltip }) => (
        <ReactTooltip
          key={label}
          id={`${label}-tooltip`}
          place="top"
          effect="solid"
          className="!bg-gray-800 !text-green-400 !border !border-gray-700 !rounded-md !px-3 !py-2 !font-mono !text-xs"
        />
      ))}

      {/* Interactive Terminal */}
      <TerminalComponent 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </footer>
  );
};

export default Footer;