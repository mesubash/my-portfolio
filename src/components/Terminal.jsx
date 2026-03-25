import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Terminal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('~/portfolio');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const navigateToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      onClose();
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
      return true;
    }
    return false;
  };

  const commands = {
    help: {
      description: 'Show available commands',
      execute: () => [
        '',
        '  AVAILABLE COMMANDS',
        '  ──────────────────────────────────────',
        '',
        '  Information',
        '    help         Show this help message',
        '    about        Learn about me',
        '    skills       View technical skills',
        '    projects     List my projects',
        '    contact      Get contact information',
        '    education    View education background',
        '    experience   View work experience',
        '',
        '  Navigation',
        '    cd <section> Navigate to a section',
        '                 (home, about, projects, hire, contact)',
        '',
        '  System',
        '    whoami       Display current user',
        '    pwd          Show current directory',
        '    ls           List directory contents',
        '    tree         Show directory structure',
        '    cat <file>   Read file contents',
        '    clear        Clear terminal',
        '    exit         Close terminal',
        '',
        '  Tips: Use arrow keys for command history',
        ''
      ]
    },
    cd: {
      description: 'Navigate to portfolio sections',
      execute: (args) => {
        if (!args || args.length === 0) {
          return ['', '  Usage: cd <section>', '', '  Sections: home, about, projects, hire, contact', ''];
        }
        const section = args[0].toLowerCase();
        const sectionMap = { home: 'landingpage', about: 'about', projects: 'projects', hire: 'hire-me', contact: 'contact' };
        if (sectionMap[section]) {
          const success = navigateToSection(sectionMap[section]);
          if (success) {
            setCurrentPath(`~/portfolio/${section}`);
            return [`  Navigating to ${section}...`];
          }
          return [`  Error: Failed to navigate to ${section}`];
        }
        return [`  Not found: ${section}`, '', '  Available: home, about, projects, hire, contact'];
      }
    },
    about: {
      description: 'About the developer',
      execute: () => [
        '',
        '  SUBASH SINGH DHAMI',
        '  ──────────────────────────────────────',
        '',
        '  Role      Full Stack Developer',
        '  Focus     Scalable Systems & Modern Tech',
        '  Status    Available for opportunities',
        '  Location  Kathmandu, Nepal',
        '',
        '  Currently building Yugo - a smart',
        '  mobility platform for public transport.',
        '',
        '  "Talk is cheap. Show me the code."',
        '                      - Linus Torvalds',
        ''
      ]
    },
    skills: {
      description: 'Technical skills',
      execute: () => [
        '',
        '  TECHNICAL SKILLS',
        '  ──────────────────────────────────────',
        '',
        '  Backend     Java Spring Boot, Node.js',
        '              PostgreSQL, Redis, Docker',
        '',
        '  Mobile      Flutter, Android (Java)',
        '',
        '  Frontend    React, Next.js, Tailwind',
        '',
        '  ML & Data   Python, Scikit-learn',
        '',
        '  DevOps      AWS, CI/CD, Nginx, Git',
        ''
      ]
    },
    projects: {
      description: 'List projects',
      execute: () => [
        '',
        '  PROJECT SHOWCASE',
        '  ──────────────────────────────────────',
        '',
        '  * Yugo: Smart Mobility Platform',
        '    Flutter, Spring Boot, PostgreSQL',
        '',
        '  * QuizMaster',
        '    Spring Boot, Next.js',
        '',
        '  * Khojdu: Rental Platform',
        '    Spring Boot, Next.js, Redis',
        '',
        '  * SMS Spam Detection',
        '    Python, ML, Docker, FastAPI',
        '',
        '  * Library Management System',
        '    Spring Boot, React',
        '',
        '  Navigate: cd projects',
        ''
      ]
    },
    contact: {
      description: 'Contact information',
      execute: () => [
        '',
        '  CONTACT',
        '  ──────────────────────────────────────',
        '',
        '  Email     subashdhamee@gmail.com',
        '  GitHub    github.com/mesubash',
        '  LinkedIn  linkedin.com/in/subashsdhami',
        '  Website   subashsdhami.com.np',
        ''
      ]
    },
    education: {
      description: 'Education',
      execute: () => [
        '',
        '  EDUCATION',
        '  ──────────────────────────────────────',
        '',
        '  Computer Science & Engineering',
        '  Focus: Software Dev, AI & Cloud',
        ''
      ]
    },
    experience: {
      description: 'Work experience',
      execute: () => [
        '',
        '  EXPERIENCE',
        '  ──────────────────────────────────────',
        '',
        '  Project Lead - Yugo Mobility Platform',
        '    Building production-ready transport system',
        '    Microservices, wallet integration, QR flow',
        '',
        '  Full Stack Developer',
        '    Multiple web & mobile applications',
        '    Spring Boot, React, Flutter, PostgreSQL',
        ''
      ]
    },
    whoami: { description: 'Current user', execute: () => ['  subash@portfolio'] },
    pwd: { description: 'Current directory', execute: () => [`  ${currentPath}`] },
    ls: {
      description: 'List files',
      execute: () => [
        '  about.txt    skills.json  contact.md',
        '  resume.pdf   projects/',
      ]
    },
    tree: {
      description: 'Directory tree',
      execute: () => [
        '  ~/portfolio',
        '  ├── about.txt',
        '  ├── skills.json',
        '  ├── contact.md',
        '  ├── resume.pdf',
        '  └── projects/',
        '      ├── yugo/',
        '      ├── quizmaster/',
        '      ├── khojdu/',
        '      ├── spam-detection/',
        '      └── library-mgmt/',
      ]
    },
    clear: { description: 'Clear', execute: () => { setHistory([]); return []; } },
    exit: { description: 'Close terminal', execute: () => { onClose(); return []; } },
    quit: { description: 'Close terminal', execute: () => { onClose(); return []; } },
  };

  const fileContents = {
    'about.txt': ['', '  Subash Singh Dhami - Full Stack Developer', '  ==========================================', '', '  Passionate about creating innovative solutions.', '  Currently building: Yugo mobility platform', ''],
    'skills.json': ['  {', '    "core": ["Spring Boot", "Flutter", "React", "PostgreSQL"],', '    "devops": ["Docker", "AWS", "CI/CD", "Nginx"],', '    "ml": ["Python", "Scikit-learn"]', '  }'],
    'contact.md': ['', '  # Contact', '', '  Email: subashdhamee@gmail.com', '  GitHub: github.com/mesubash', '  LinkedIn: linkedin.com/in/subashsdhami', ''],
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const getSuggestion = (cmd) => {
    const names = Object.keys(commands);
    const match = names.find(n => n.startsWith(cmd) || n.includes(cmd));
    return match || 'help';
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);
    setHistory(prev => [...prev, { type: 'command', content: `${currentPath} $ ${trimmedCmd}` }]);

    const [command, ...args] = trimmedCmd.toLowerCase().split(' ');

    if (command === 'cat' && args.length > 0) {
      const filename = args[0];
      if (fileContents[filename]) {
        setHistory(prev => [...prev, { type: 'output', content: fileContents[filename] }]);
      } else {
        setHistory(prev => [...prev, { type: 'error', content: [`  cat: ${filename}: No such file`] }]);
      }
    } else if (command === 'cd') {
      const output = commands.cd.execute(args);
      setHistory(prev => [...prev, { type: 'output', content: output }]);
    } else if (commands[command]) {
      const output = commands[command].execute();
      if (output.length > 0) {
        setHistory(prev => [...prev, { type: 'output', content: output }]);
      }
    } else {
      setHistory(prev => [...prev, {
        type: 'error',
        content: [`  Command not found: ${command}`, `  Did you mean: ${getSuggestion(command)}?`, '  Type "help" for commands.']
      }]);
    }
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIdx);
        setInput(commandHistory[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIdx = historyIndex + 1;
        if (newIdx >= commandHistory.length) { setHistoryIndex(-1); setInput(''); }
        else { setHistoryIndex(newIdx); setInput(commandHistory[newIdx]); }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (input) {
        const match = Object.keys(commands).find(c => c.startsWith(input.toLowerCase()));
        if (match) setInput(match);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="bg-dark-950 border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <TerminalIcon className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono font-medium">subash@portfolio: ~</span>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/[0.06]">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalRef}
              className="flex-1 p-5 font-mono text-[13px] leading-relaxed overflow-y-auto"
              onClick={() => inputRef.current?.focus()}
            >
              {/* Welcome */}
              <div className="mb-4 text-gray-500">
                <div className="text-violet-400 font-semibold mb-1">Welcome to Subash&apos;s Portfolio Terminal</div>
                <div>Type <span className="text-emerald-400">help</span> for commands, <span className="text-emerald-400">Tab</span> to autocomplete</div>
                <div className="border-b border-white/[0.04] mt-3" />
              </div>

              {/* History */}
              {history.map((entry, index) => (
                <div key={index} className="mb-1.5">
                  {entry.type === 'command' && (
                    <div className="text-cyan-400">{entry.content}</div>
                  )}
                  {entry.type === 'output' && (
                    <div className="text-gray-300 whitespace-pre">
                      {Array.isArray(entry.content) ? entry.content.join('\n') : entry.content}
                    </div>
                  )}
                  {entry.type === 'error' && (
                    <div className="text-red-400/80 whitespace-pre">
                      {Array.isArray(entry.content) ? entry.content.join('\n') : entry.content}
                    </div>
                  )}
                </div>
              ))}

              {/* Input */}
              <div className="flex items-center">
                <span className="text-cyan-400 mr-2 shrink-0">{currentPath} $</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-emerald-400 outline-none caret-emerald-400 min-w-0"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
