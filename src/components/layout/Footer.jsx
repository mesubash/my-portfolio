import { Github, Linkedin, Twitter, Instagram, Mail, Terminal as TerminalIcon } from "lucide-react";
import { useState } from "react";
import Terminal from "./Terminal";

const Footer = () => {
  const [termOpen, setTermOpen] = useState(false);

  const links = [
    { Icon: Github, href: "https://github.com/mesubash", label: "GitHub" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/subashsdhami/", label: "LinkedIn" },
    { Icon: Twitter, href: "https://x.com/subashdhamee", label: "X" },
    { Icon: Instagram, href: "https://www.instagram.com/da.subashh/", label: "Instagram" },
    { Icon: Mail, href: "mailto:subashdhamee@gmail.com", label: "Email" },
  ];

  return (
    <footer className="border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <span className="font-heading text-sm font-semibold text-white">subash<span className="text-indigo">.dev</span></span>
            <p className="mt-2 text-xs text-slate-600 max-w-[220px]">Building scalable systems with modern technologies.</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {["Home", "About", "Projects", "Experience", "Contact"].map((l) => (
              <a key={l} href={`/#${l.toLowerCase()}`} className="text-xs text-slate-600 hover:text-slate-300 transition-colors">{l}</a>
            ))}
            <a href="/writings" className="text-xs text-slate-600 hover:text-slate-300 transition-colors">Writings</a>
          </div>

          <div className="flex gap-2">
            {links.map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-300 transition-colors" aria-label={label}>
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.04] flex items-center justify-between">
          <p className="text-[11px] text-slate-700">&copy; {new Date().getFullYear()} Subash Singh Dhami</p>
          <button onClick={() => setTermOpen(true)} className="w-7 h-7 flex items-center justify-center rounded text-slate-700 hover:text-slate-400 transition-colors" aria-label="Terminal">
            <TerminalIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <Terminal isOpen={termOpen} onClose={() => setTermOpen(false)} />
    </footer>
  );
};

export default Footer;
