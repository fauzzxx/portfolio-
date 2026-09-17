import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Plus } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/projects';
import { SKILLS_DATA } from '../../data/skills';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

const COMMANDS = [
  'help',
  'dir',
  'ls',
  'projects',
  'ai-lab',
  'skills',
  'experience',
  'achievements',
  'about',
  'resume',
  'contact',
  'cls',
  'clear',
];

export const TerminalWindow: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'system', text: 'Windows PowerShell\nCopyright (C) Microsoft Corporation. All rights reserved.\n\nInstall the latest PowerShell for new features and improvements! https://aka.ms/PSWindows\n' },
    { type: 'system', text: 'Type "help" or "dir" to view cataloged commands.\n' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextPointer =
          historyPointer === -1
            ? commandHistory.length - 1
            : Math.max(0, historyPointer - 1);
        setHistoryPointer(nextPointer);
        setInput(commandHistory[nextPointer]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer !== -1) {
        const nextPointer = historyPointer + 1;
        if (nextPointer < commandHistory.length) {
          setHistoryPointer(nextPointer);
          setInput(commandHistory[nextPointer]);
        } else {
          setHistoryPointer(-1);
          setInput('');
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(input.toLowerCase().trim()));
      if (match) {
        setInput(match);
      }
    }
  };

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryPointer(-1);

    const newHistory = [...history, { type: 'input' as const, text: `PS C:\\Users\\Fauzaan> ${trimmed}` }];
    const cmd = trimmed.toLowerCase();

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `FAUZAAN OS POWERSHELL TERMINAL
Available commands:
  help          - Display this command reference
  dir, ls       - List directories and system contents
  projects      - List all 22 portfolio engineering projects
  ai-lab        - List autonomous agents and computer vision models
  skills        - List technical matrix across ML, backend, and languages
  experience    - Display professional history and education
  achievements  - Display national hackathon honors and awards
  about         - Display career objective & engineering philosophy
  resume        - Display curriculum vitae credentials
  contact       - Display communication channels
  cls, clear    - Clear terminal buffer

Tips:
  - Press [Tab] to auto-complete commands.
  - Press [Up/Down] arrows to navigate command history.`,
        });
        break;

      case 'dir':
      case 'ls':
        newHistory.push({
          type: 'output',
          text: `    Directory: C:\\Users\\Fauzaan

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----          9/9/2026   1:00 AM                Projects (${PROJECTS_DATA.length} systems)
d-----          9/9/2026   1:00 AM                AI-Lab (Vision & LLM Platforms)
d-----          9/9/2026   1:00 AM                Skills (${SKILLS_DATA.reduce((acc, c) => acc + c.skills.length, 0)} cataloged competencies)
d-----          9/9/2026   1:00 AM                Experience (Work History & Osmania Univ)
d-----          9/9/2026   1:00 AM                Achievements (SIH 2024 Winner ₹1,00,000)
-a----          9/9/2026   1:00 AM           4096 Resume.pdf
-a----          9/9/2026   1:00 AM           2048 README.md`,
        });
        break;

      case 'projects': {
        const categories = [
          { key: 'web-development', label: 'Web Development' },
          { key: 'ai-automation', label: 'AI Automation & Intelligence' },
          { key: 'app-development', label: 'App Development' },
          { key: 'experiments', label: 'Experiments' },
        ];
        const lines = [`ENGINEERING PROJECTS PORTFOLIO (${PROJECTS_DATA.length} systems):`];
        for (const cat of categories) {
          const catProjects = PROJECTS_DATA.filter((p) => p.category === cat.key);
          if (catProjects.length > 0) {
            lines.push(`\n[${cat.label}]`);
            catProjects.forEach((p) => {
              const liveTag = p.liveDemoUrl || p.liveUrl ? ' [LIVE DEMO]' : '';
              lines.push(`  • ${p.title.padEnd(25)} - ${p.tagline}${liveTag}`);
            });
          }
        }
        newHistory.push({
          type: 'output',
          text: lines.join('\n'),
        });
        break;
      }

      case 'ai-lab': {
        const aiSystems = [
          { name: 'AL-AQL', desc: 'Offline Multimodal AI Assistant (TinyLLaMA, LoRA, SD, MCP)' },
          { name: 'Weaver AI', desc: 'Real-Time Conversational Voice Agent (Gemini 2.5 Flash, Deepgram)' },
          { name: 'MarketNOW', desc: 'Generative Engine Optimization (GEO) Multi-Model Platform' },
          { name: 'Post Office Analyser', desc: 'Computer Vision Queue & Workflow Analytics (YOLO, OpenCV)' },
          { name: 'Cafe Analyser', desc: 'Hospitality & Customer Flow Intelligence (YOLOv8, OpenCV)' },
          { name: 'Smart Classroom Assist', desc: 'Classroom Monitoring & Attendance [LIVE DEMO]' },
          { name: 'Classroom Analyser', desc: 'Student Engagement & Attention Analysis (PyTorch, Custom YOLO)' },
          { name: 'Football Analyser', desc: 'AI Tactical Match Intelligence & Tracking (ByteTrack, YOLO)' },
          { name: 'PatrolPro', desc: 'Waste Management & Civil Monitoring [LIVE DEMO]' },
          { name: 'RAG Document Analyzer', desc: 'Semantic Document Search (LlamaIndex, ChromaDB)' },
          { name: 'Offline AI Chatbot', desc: 'Offline Document Intelligence & Local Q&A' },
        ];
        const lines = [
          `AI LAB & INTELLIGENCE ARCHITECTURES (${aiSystems.length} systems):`,
          ...aiSystems.map((s, idx) => `${String(idx + 1).padStart(2, ' ')}. ${s.name.padEnd(24)} [${s.desc}]`),
        ];
        newHistory.push({
          type: 'output',
          text: lines.join('\n'),
        });
        break;
      }

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `TECHNICAL SKILLS INVENTORY:
• Artificial Intelligence & ML : Computer Vision, YOLOv8/11, PyTorch, OpenCV, TensorFlow, Multimodal AI
• GenAI & Agentic Systems     : Gemini API, RAG, LlamaIndex, ChromaDB, Stable Diffusion, MCP
• Languages                   : Python, Dart, JavaScript, SQL
• Backend & Systems           : FastAPI, Flask, REST APIs, WebSockets, Supabase, SQLite
• Frontend & Mobile           : React, Flutter, Tailwind CSS, TypeScript`,
        });
        break;

      case 'experience':
        newHistory.push({
          type: 'output',
          text: `PROFESSIONAL HISTORY:
• Senior Backend Developer     : Market Now (Feb 2026 - Sep 2026)
• Freelance Software Developer : Independent Contractor
• Backend Developer Intern     : Rubat AI (Oct 2026)
• Data Analyst Intern          : Codetech IT Solution

EDUCATION:
• Osmania University           : B.E. Computer Science and Engineering (CSE) (GPA: 8.32 / 10.0)
• IIPS Riyadh, KSA             : Higher Secondary Class XII (88.8%, Graduated 2022)`,
        });
        break;

      case 'achievements':
        newHistory.push({
          type: 'output',
          text: `HONORS & RECOGNITIONS:
★ Smart India Hackathon 2024 — WINNER (₹1,00,000 Cash Prize)
  National Champions, Ministry of Education & AICTE, Government of India
★ Best Innovative Idea — NSAKCET's HackEnvision 2.0
★ Job Offer Recipient — Innovator's Fest 24
★ Best Project of II Year — Innovatia Panoply
★ 3rd Place — CSI-MJCET Project Expo
★ 3rd Place — HackRev
★ Finalist — HackCelerate`,
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `ENGINEERING PROFILE:
"Passionate about Computer Vision, Artificial Intelligence, and Machine Learning,
with a strong interest in building intelligent systems and exploring the potential
of emerging technologies such as Agentic AI tools. Enthusiastic about applying
AI-driven solutions to solve real-world problems and continuously expanding
knowledge in advanced deep learning techniques."`,
        });
        break;

      case 'resume':
        newHistory.push({
          type: 'output',
          text: `Official CV viewer ready. Launch the "Resume" icon on the desktop.`,
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `CONTACT:
Email: Fauzaan (via Contact app on desktop)
Location: Hyderabad, India`,
        });
        break;

      case 'cls':
      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `${trimmed} : The term '${trimmed}' is not recognized as the name of a cmdlet, function, or script file. Check the spelling or type 'help'.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div
      className="h-full flex flex-col bg-[#0c0c0c] text-[#cccccc] font-mono text-xs select-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Windows Terminal Tab Strip */}
      <div className="h-8 px-2 bg-[#1f1f1f] border-b border-white/10 flex items-center gap-1 select-none shrink-0">
        <div className="flex items-center gap-2 px-3 py-1 bg-[#0c0c0c] text-white rounded-t border-t border-x border-white/10 text-[11px]">
          <Terminal className="w-3.5 h-3.5 text-blue-400" />
          <span>PowerShell</span>
        </div>
        <button
          title="New Tab"
          className="p-1 text-white/50 hover:text-white hover:bg-white/10 rounded"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal Output Area */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-1 win-scrollbar">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === 'input'
                ? 'text-[#f1f1f1] font-semibold'
                : line.type === 'error'
                ? 'text-[#e81123]'
                : line.type === 'system'
                ? 'text-[#888888]'
                : 'text-[#d4d4d4]'
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />

        {/* Live Input Line */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(input);
          }}
          className="flex items-center gap-2 pt-1"
        >
          <span className="text-[#3a96dd] font-semibold shrink-0">
            PS C:\Users\Fauzaan&gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-transparent text-white outline-none border-none font-mono text-xs caret-white p-0"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
};
