import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Terminal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const commands = {
    help: () => ["", "  help       Show commands", "  about      About me", "  skills     Tech stack", "  projects   My work", "  contact    How to reach me", "  clear      Clear terminal", "  exit       Close", ""],
    about: () => ["", "  Subash Singh Dhami", "  Software Engineer, Kathmandu", "", "  Backend engineer at Himalayan Guardian Nepal.", "  Building with Spring Boot, Flutter, React.", ""],
    skills: () => ["", "  Backend   Spring Boot, Node.js, PostgreSQL, Redis, Docker", "  Mobile    Flutter, Android", "  Frontend  React, Next.js, Tailwind", "  ML        Python, TensorFlow, Scikit-learn", "  DevOps    AWS, CI/CD, Nginx, Linux, RabbitMQ", ""],
    projects: () => ["", "  Yugo          Transport fare collection system", "  QuizMaster    Full-stack quiz platform", "  Khojdu        Rental property platform", "  SMS Spam      ML spam classifier", "", "  github.com/mesubash", ""],
    contact: () => ["", "  Email     subashdhamee@gmail.com", "  GitHub    github.com/mesubash", "  LinkedIn  linkedin.com/in/subashsdhami", ""],
    clear: () => { setHistory([]); return []; },
    exit: () => { onClose(); return []; },
    quit: () => { onClose(); return []; },
  };

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  useEffect(() => {
    const onEsc = (e) => { if (e.key === "Escape" && isOpen) onClose(); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  const run = (cmd) => {
    const t = cmd.trim();
    if (!t) return;
    setCmdHistory((p) => [...p, t]);
    setHistIdx(-1);
    setHistory((p) => [...p, { type: "cmd", text: `$ ${t}` }]);
    const name = t.toLowerCase().split(" ")[0];
    if (commands[name]) {
      const out = commands[name]();
      if (out.length) setHistory((p) => [...p, { type: "out", lines: out }]);
    } else {
      setHistory((p) => [...p, { type: "err", lines: [`  command not found: ${name}`, '  type "help" for commands'] }]);
    }
    setInput("");
  };

  const onKey = (e) => {
    if (e.key === "Enter") run(input);
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length) {
        const i = histIdx === -1 ? cmdHistory.length - 1 : Math.max(0, histIdx - 1);
        setHistIdx(i); setInput(cmdHistory[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx !== -1) {
        const i = histIdx + 1;
        if (i >= cmdHistory.length) { setHistIdx(-1); setInput(""); }
        else { setHistIdx(i); setInput(cmdHistory[i]); }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(commands).find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <motion.div className="bg-[#0c0d12] border border-white/[0.06] rounded-xl w-full max-w-2xl max-h-[70vh] flex flex-col overflow-hidden" initial={{ scale: 0.96, y: 10, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.96, y: 10, opacity: 0 }} transition={{ duration: 0.2 }}>
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <button onClick={onClose} className="w-2.5 h-2.5 rounded-full bg-zinc-700 hover:bg-red-500 transition-colors" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                </div>
                <span className="text-[11px] font-mono text-slate-600">terminal</span>
              </div>
              <button onClick={onClose} className="text-slate-600 hover:text-slate-400 transition-colors"><X className="w-3.5 h-3.5" /></button>
            </div>
            <div ref={scrollRef} className="flex-1 p-4 font-mono text-[13px] leading-relaxed overflow-y-auto" onClick={() => inputRef.current?.focus()}>
              <div className="text-slate-600 mb-3">
                <span className="text-slate-400">subash.dev</span> ~ type <span className="text-indigo">help</span> to start
              </div>
              {history.map((entry, i) => (
                <div key={i} className="mb-1">
                  {entry.type === "cmd" && <div className="text-slate-400">{entry.text}</div>}
                  {entry.type === "out" && <div className="text-slate-500 whitespace-pre">{entry.lines.join("\n")}</div>}
                  {entry.type === "err" && <div className="text-red-400/60 whitespace-pre">{entry.lines.join("\n")}</div>}
                </div>
              ))}
              <div className="flex items-center">
                <span className="text-slate-600 mr-2">$</span>
                <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey} className="flex-1 bg-transparent text-slate-300 outline-none caret-indigo min-w-0" autoComplete="off" spellCheck="false" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
