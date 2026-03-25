import React, { useState } from "react";
import { Mail, Twitter, Linkedin, Github, Instagram, Terminal, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import TerminalComponent from "./Terminal";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const copyEmail = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText("subashdhamee@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  const socialLinks = [
    { href: "mailto:subashdhamee@gmail.com", Icon: Mail, label: "Email", onClick: copyEmail },
    { href: "https://github.com/mesubash", Icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/subashsdhami/", Icon: Linkedin, label: "LinkedIn" },
    { href: "https://x.com/subashdhamee", Icon: Twitter, label: "X" },
    { href: "https://www.instagram.com/da.subashh/", Icon: Instagram, label: "Instagram" },
  ];

  const quickLinks = [
    { href: "#landingpage", text: "Home" },
    { href: "#about", text: "About" },
    { href: "#projects", text: "Projects" },
    { href: "#hire-me", text: "Hire Me" },
    { href: "#contact", text: "Contact" },
  ];

  return (
    <footer className="bg-dark-950 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center border border-violet-500/20">
                <Terminal className="w-4 h-4 text-violet-400" />
              </div>
              <span className="text-white font-mono text-base font-medium">
                subash<span className="text-violet-400">.dev</span>
              </span>
            </div>
            <p className="text-gray-600 text-sm font-mono leading-relaxed">
              {"// Building digital experiences"}<br />
              {"// One line of code at a time"}
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h3 className="text-gray-400 font-medium text-sm flex items-center gap-2">
              <Code2 className="w-4 h-4 text-violet-400" />
              Navigation
            </h3>
            <nav className="grid grid-cols-2 gap-2">
              {quickLinks.map(({ href, text }) => (
                <a
                  key={text}
                  href={href}
                  className="text-gray-600 hover:text-violet-400 text-sm transition-colors duration-300 font-mono"
                >
                  ./{text.toLowerCase()}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-gray-400 font-medium text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4 text-violet-400" />
              Connect
            </h3>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ href, Icon, label, onClick }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClick}
                  className="group flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-500 hover:text-violet-400 hover:bg-violet-500/10 hover:border-violet-500/20 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  title={label === "Email" && copied ? "Copied!" : label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            {copied && (
              <p className="text-emerald-400 text-xs font-mono animate-fade-in">
                Email copied to clipboard!
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-gray-600 font-mono text-xs">
              &copy; {new Date().getFullYear()} Subash Singh Dhami
            </p>
            <motion.button
              onClick={() => setIsTerminalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] hover:bg-emerald-500/10 border border-white/[0.06] hover:border-emerald-500/20 text-gray-600 hover:text-emerald-400 rounded-lg transition-all duration-300 font-mono text-xs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Open Terminal"
            >
              <Terminal className="w-3 h-3" />
              cli
            </motion.button>
          </div>
          <p className="text-gray-700 font-mono text-xs">
            {"// react + vite + framer-motion"}
          </p>
        </div>
      </div>

      {/* Interactive Terminal */}
      <TerminalComponent isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </footer>
  );
};

export default Footer;
