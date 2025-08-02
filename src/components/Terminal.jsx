import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Minus, Square } from 'lucide-react';

const Terminal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('~/portfolio');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Navigation helper function
  const navigateToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      onClose(); // Close terminal first
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
        '╭─────────────── AVAILABLE COMMANDS ────────────────╮',
        '│                                                   │',
        '│  📖 Information Commands:                         │',
        '│    help         - Show this help message          │',
        '│    about        - Learn about me                  │',
        '│    skills       - View technical skills           │',
        '│    projects     - List my projects                │',
        '│    contact      - Get contact information         │',
        '│    education    - View education background       │',
        '│    experience   - View work experience            │',
        '│                                                   │',
        '│  🧭 Navigation Commands:                          │',
        '│    cd &lt;section&gt; - Navigate to portfolio section   │',
        '│                   (home, about, projects, hire,   │',
        '│                    contact)                       │',
        '│                                                   │',
        '│  🗂️  System Commands:                             │',
        '│    whoami       - Display current user            │',
        '│    pwd          - Show current directory          │',
        '│    ls           - List directory contents         │',
        '│    cat &lt;filename&gt; - Display file contents           │',
        '│    tree         - Show directory structure        │',
        '│    clear        - Clear terminal                  │',
        '│                                                   │',
        '│  💡 Tips:                                         │',
        '│    • Use ↑↓ arrows for command history           │',
        '│    • Try "cd about" to navigate to about section │',
        '│    • Type "cat about.txt" for detailed info      │',
        '│                                                   │',
        '╰───────────────────────────────────────────────────╯'
      ]
    },
    cd: {
      description: 'Navigate to portfolio sections',
      execute: (args) => {
        if (!args || args.length === 0) {
          return [
            '💡 Usage: cd <section>',
            '',
            '📂 Available sections:',
            '   • home      - Landing page',
            '   • about     - About me section', 
            '   • projects  - My projects showcase',
            '   • hire      - Hire me section',
            '   • contact   - Contact information',
            '',
            'Example: cd about'
          ];
        }

        const section = args[0].toLowerCase();
        const sectionMap = {
          'home': 'landingpage',
          'about': 'about',
          'projects': 'projects', 
          'hire': 'hire-me',
          'contact': 'contact'
        };

        if (sectionMap[section]) {
          const success = navigateToSection(sectionMap[section]);
          if (success) {
            setCurrentPath(`~/portfolio/${section}`);
            return [
              `🧭 Navigating to ${section} section...`,
              `📍 Current location: ${section}`,
              '✅ Navigation successful!'
            ];
          } else {
            return [`❌ Failed to navigate to ${section} section`];
          }
        } else {
          return [
            `❌ Directory not found: ${section}`,
            '',
            '📂 Available sections: home, about, projects, hire, contact'
          ];
        }
      }
    },
    about: {
      description: 'Information about the developer',
      execute: () => [
        '╭─────────────── ABOUT SUBASH SINGH DHAMI ──────────────╮',
        '│                                                       │',
        '│  👨‍💻 Full Stack Developer                              │',
        '│  🎯 Problem Solver & Innovation Enthusiast            │',
        '│  🌱 Continuous Learner                                │',
        '│  ☕ Coffee-Driven Code Architect                      │',
        '│                                                       │',
        '│  💭 "Talk is cheap. Show me the code." - Linus        │',
        '│                                                       │',
        '│  🚀 Currently building scalable solutions with        │',
        '│     modern technologies and best practices.           │',
        '│                                                       │',
        '│  📍 Status: Available for new opportunities ✅        │',
        '│                                                       │',
        '│  💡 Fun Fact: Once debugged code while hiking in      │',
        '│     the mountains! 🏔️                                │',
        '│                                                       │',
        '╰───────────────────────────────────────────────────────╯',
        '',
        '🔗 Quick navigation: cd about'
      ]
    },
    skills: {
      description: 'Technical skills and expertise',
      execute: () => [
        '╭─────────────── TECHNICAL EXPERTISE ───────────────╮',
        '│                                                   │',
        '│  🏗️  CORE STACK                                   │',
        '│  ├─ JavaScript (ES6+)    ████████████ 95%        │',
        '│  ├─ Python               ███████████▒ 90%        │',
        '│  ├─ React.js             ████████████ 95%        │',
        '│  └─ Node.js              ██████████▒▒ 85%        │',
        '│                                                   │',
        '│  🚀 PRODUCTION READY                              │',
        '│  ├─ Docker               ████████▒▒▒▒ 80%        │',
        '│  ├─ AWS Services         ███████▒▒▒▒▒ 75%        │',
        '│  ├─ PostgreSQL           ████████████ 95%        │',
        '│  └─ MongoDB              ██████████▒▒ 85%        │',
        '│                                                   │',
        '│  🤖 DATA & AI                                     │',
        '│  ├─ TensorFlow           ████████▒▒▒▒ 80%        │',
        '│  ├─ Pandas               ██████████▒▒ 85%        │',
        '│  ├─ Scikit-learn         ████████▒▒▒▒ 80%        │',
        '│  └─ OpenCV               ███████▒▒▒▒▒ 75%        │',
        '│                                                   │',
        '╰───────────────────────────────────────────────────╯',
        '',
        '💡 Try: cat skills.json'
      ]
    },
    projects: {
      description: 'List of projects',
      execute: () => [
        '╭─────────────── PROJECT SHOWCASE ──────────────╮',
        '│                                               │',
        '│  📊 Advanced Spam Detection System            │',
        '│  ├─ ML-powered email classification           │',
        '│  ├─ 🎯 Accuracy: 98.5%                        │',
        '│  └─ 🛠️  Tech: Python, TensorFlow, Flask       │',
        '│                                               │',
        '│  🧠 Brain Tumor Detection                     │',
        '│  ├─ Medical image analysis using CNN          │',
        '│  ├─ 🎯 Precision: 96.2%                       │',
        '│  └─ 🛠️  Tech: Python, OpenCV, Deep Learning   │',
        '│                                               │',
        '│  🎯 Smart Recommendation Engine               │',
        '│  ├─ Personalized content suggestions          │',
        '│  ├─ 🎯 User engagement: +45%                  │',
        '│  └─ 🛠️  Tech: Python, Pandas, Scikit-learn   │',
        '│                                               │',
        '│  💼 Interactive Portfolio Website             │',
        '│  ├─ Modern developer portfolio with terminal  │',
        '│  ├─ 🎯 Performance Score: 98/100              │',
        '│  └─ 🛠️  Tech: React, Tailwind, Vite           │',
        '│                                               │',
        '╰───────────────────────────────────────────────╯',
        '',
        '🔗 Navigate to projects: cd projects',
        '📄 Detailed info: cat project_<name>'
      ]
    },
    contact: {
      description: 'Contact information',
      execute: () => [
        '📧 Contact Information:',
        '',
        '  Email: subashsdhami@gmail.com',
        '  GitHub: github.com/subash-dhami',
        '  LinkedIn: linkedin.com/in/subash-dhami',
        '  Website: subashsdhami.com.np',
        '',
        '💬 Let\'s connect and build something amazing!'
      ]
    },
    education: {
      description: 'Educational background',
      execute: () => [
        '🎓 Education:',
        '',
        '📚 Computer Science & Engineering',
        '   └─ Focus: Software Development & AI',
        '   └─ Relevant coursework: Data Structures,',
        '      Algorithms, Machine Learning, Web Dev',
        '',
        '🏆 Certifications & Achievements:',
        '   └─ Full Stack Development',
        '   └─ Machine Learning Specialization',
        '   └─ AWS Cloud Practitioner'
      ]
    },
    experience: {
      description: 'Work experience',
      execute: () => [
        '💼 Professional Experience:',
        '',
        '🚀 Full Stack Developer',
        '   └─ Building scalable web applications',
        '   └─ Leading technical projects',
        '   └─ Mentoring junior developers',
        '',
        '🔬 Research & Development',
        '   └─ AI/ML model development',
        '   └─ Data analysis and visualization',
        '   └─ Performance optimization',
        '',
        '📈 Continuous Growth:',
        '   └─ Staying updated with latest tech',
        '   └─ Contributing to open source',
        '   └─ Building personal projects'
      ]
    },
    whoami: {
      description: 'Display current user',
      execute: () => ['subash@portfolio']
    },
    pwd: {
      description: 'Show current directory',
      execute: () => [currentPath]
    },
    ls: {
      description: 'List directory contents',
      execute: () => [
        'total 8',
        'drwxr-xr-x  5 subash  staff   160 Aug  3 14:30 .',
        'drwxr-xr-x  3 subash  staff    96 Aug  3 14:25 ..',
        '-rw-r--r--  1 subash  staff  2048 Aug  3 14:30 about.txt',
        '-rw-r--r--  1 subash  staff  1536 Aug  3 14:29 skills.json',
        'drwxr-xr-x  4 subash  staff   128 Aug  3 14:30 projects/',
        '-rw-r--r--  1 subash  staff   512 Aug  3 14:25 contact.md',
        '-rw-r--r--  1 subash  staff  1024 Aug  3 14:28 resume.pdf'
      ]
    },
    tree: {
      description: 'Show directory structure',
      execute: () => [
        '~/portfolio',
        '├── about.txt',
        '├── skills.json',
        '├── contact.md',
        '├── resume.pdf',
        '└── projects/',
        '    ├── spam-detection/',
        '    │   ├── README.md',
        '    │   └── src/',
        '    ├── brain-tumor-detection/',
        '    │   ├── models/',
        '    │   └── data/',
        '    └── portfolio-website/',
        '        ├── src/',
        '        └── public/',
        '',
        '7 directories, 12 files'
      ]
    },
    clear: {
      description: 'Clear terminal',
      execute: () => {
        setHistory([]);
        return [];
      }
    }
  };

  const fileContents = {
    'about.txt': [
      'Subash Singh Dhami - Full Stack Developer',
      '=========================================',
      '',
      'Passionate about creating innovative solutions',
      'that bridge the gap between complex problems',
      'and elegant, user-friendly applications.',
      '',
      'Currently exploring: WebAssembly, Edge Computing',
      'Fun fact: Debugged code while hiking in the mountains! 🏔️'
    ],
    'skills.json': [
      '{',
      '  "languages": ["JavaScript", "Python", "Java", "C++"],',
      '  "frontend": ["React", "Vue.js", "TypeScript", "Tailwind"],',
      '  "backend": ["Node.js", "Express", "Django", "FastAPI"],',
      '  "database": ["PostgreSQL", "MongoDB", "Redis"],',
      '  "cloud": ["AWS", "Docker", "Kubernetes"],',
      '  "ml_ai": ["TensorFlow", "PyTorch", "Scikit-learn"],',
      '  "tools": ["Git", "Webpack", "Vite", "Jest"]',
      '}'
    ],
    'contact.md': [
      '# Contact Information',
      '',
      '📧 **Email:** subashsdhami@gmail.com',
      '🐙 **GitHub:** github.com/subash-dhami',
      '💼 **LinkedIn:** linkedin.com/in/subash-dhami',
      '🌐 **Website:** subashsdhami.com.np',
      '',
      '## Availability',
      '- Open to full-time opportunities',
      '- Available for consulting projects',
      '- Happy to discuss collaboration'
    ]
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Add to command history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Add command to display history
    setHistory(prev => [...prev, { type: 'command', content: `${currentPath} $ ${trimmedCmd}` }]);

    // Parse command
    const [command, ...args] = trimmedCmd.toLowerCase().split(' ');

    if (command === 'cat' && args.length > 0) {
      const filename = args[0];
      if (fileContents[filename]) {
        setHistory(prev => [...prev, { type: 'output', content: fileContents[filename] }]);
      } else {
        setHistory(prev => [...prev, { type: 'error', content: [`❌ cat: ${filename}: No such file or directory`] }]);
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
        content: [
          `❌ Command not found: ${command}`, 
          '💡 Type "help" for available commands.',
          `🔍 Did you mean: ${getSuggestion(command)}?`
        ] 
      }]);
    }

    setInput('');
  };

  // Simple command suggestion function
  const getSuggestion = (cmd) => {
    const commandNames = Object.keys(commands);
    const suggestions = commandNames.filter(name => 
      name.includes(cmd) || cmd.includes(name.slice(0, 2))
    );
    return suggestions.length > 0 ? suggestions[0] : 'help';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        if (newIndex === commandHistory.length - 1 && historyIndex === commandHistory.length - 1) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-gray-800 px-4 py-3 rounded-t-lg border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <TerminalIcon className="w-4 h-4" />
              <span className="text-sm font-medium">subash@portfolio: ~</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="flex-1 p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-y-auto rounded-b-lg"
        >
          {/* Welcome Message */}
          <div className="mb-6">
            <div className="text-cyan-400 text-lg font-bold mb-2">
              🚀 Welcome to Subash's Interactive Portfolio Terminal!
            </div>
            <div className="text-gray-400 text-sm mb-2">
              ╭─────────────────────────────────────────────────────╮
            </div>
            <div className="text-gray-400 text-sm mb-1">
              │  💡 Type 'help' to see all available commands      │
            </div>
            <div className="text-gray-400 text-sm mb-1">
              │  🧭 Try 'cd about' to navigate to sections         │
            </div>
            <div className="text-gray-400 text-sm mb-1">
              │  📄 Use 'cat &lt;file&gt;' to read file contents         │
            </div>
            <div className="text-gray-400 text-sm mb-1">
              │  ⌨️  Use ↑↓ arrows for command history             │
            </div>
            <div className="text-gray-400 text-sm mb-2">
              ╰─────────────────────────────────────────────────────╯
            </div>
            <div className="border-b border-gray-700 my-3"></div>
          </div>

          {/* Command History */}
          {history.map((entry, index) => (
            <div key={index} className="mb-2">
              {entry.type === 'command' && (
                <div className="text-cyan-400">{entry.content}</div>
              )}
              {entry.type === 'output' && (
                <div className="text-green-400 whitespace-pre-line">
                  {Array.isArray(entry.content) ? entry.content.join('\n') : entry.content}
                </div>
              )}
              {entry.type === 'error' && (
                <div className="text-red-400 whitespace-pre-line">
                  {Array.isArray(entry.content) ? entry.content.join('\n') : entry.content}
                </div>
              )}
            </div>
          ))}

          {/* Current Input Line */}
          <div className="flex items-center">
            <span className="text-cyan-400 mr-2">{currentPath} $ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-400 outline-none"
              autoComplete="off"
              spellCheck="false"
            />
            <span className="text-green-400 animate-pulse ml-1">▊</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
