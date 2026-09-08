import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS_DATA } from '../../data/projects';
import { SKILLS_DATA } from '../../data/skills';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

const COMMANDS = [
  'help',
  'ls',
  'projects',
  'ai-lab',
  'skills',
  'experience',
  'achievements',
  'about',
  'resume',
  'contact',
  'clear',
];

export const TerminalWindow: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'system', text: 'FAUZAAN OS TERMINAL [v1.0.0-release]' },
    { type: 'system', text: 'Type "help" to display available system commands.' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);

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

    const newHistory = [...history, { type: 'input' as const, text: `$ ${trimmed}` }];
    const cmd = trimmed.toLowerCase();

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `FAUZAAN OS SIMULATED SHELL
Available commands:
  help          - Display this command manual
  ls            - List system directories and components
  projects      - Display all cataloged platforms and projects
  ai-lab        - Display autonomous & computer vision modules
  skills        - List technical matrix & toolchains
  experience    - Display professional roles & education
  achievements  - Display national hackathons & awards
  about         - Display career objective & engineering philosophy
  resume        - Display curriculum vitae credentials
  contact       - Display communication channels
  clear         - Clear the terminal screen

Tips:
  - Use Up/Down arrows to recall previous commands.
  - Press [Tab] to auto-complete commands.`,
        });
        break;

      case 'ls':
        newHistory.push({
          type: 'output',
          text: `drwxr-xr-x  projects/            [${PROJECTS_DATA.length} systems]
drwxr-xr-x  ai-lab/              [Computer Vision & Agents]
drwxr-xr-x  skills/              [${SKILLS_DATA.reduce((acc, c) => acc + c.skills.length, 0)} competencies]
drwxr-xr-x  experience/          [Market Now, Rubat AI, Codetech]
drwxr-xr-x  achievements/        [SIH 2024 Winner ₹1,00,000]
-rw-r--r--  README.md            [System Documentation]
-rw-r--r--  resume.pdf           [Credential Verification]`,
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `SYSTEM PROJECTS CATALOG (${PROJECTS_DATA.length} modules):

[WEB DEVELOPMENT]
- Alpha Omega               : E-Commerce Fashion Platform (Tier 1)
- SIOUGE                    : Luxury Perfume Storefront
- Crestline Capital         : Structured Bulk Buying Platform
- Ammu's Pets & Kennels     : Marketplace & Kennel Hub

[AI AUTOMATION & INTELLIGENCE]
- Post Office Analyzer      : Computer Vision Queue Analytics (YOLO)
- Cafe Analyzer             : Smart Hospitality & Flow System (YOLO)
- RAG Document Analyzer     : Knowledge Retrieval (LlamaIndex, ChromaDB)
- Weaver AI                 : Autonomous Website Generator & Vercel Deployer
- MarketNOW                 : AI-Powered SEO & GEO Intelligence

[APP DEVELOPMENT]
- RouteX Capital            : Cross-Border Financial Intelligence (Flutter, Gemini)
- Smart Classroom Assist    : Vision Attendance & Manimator Animations
- AL-AQL                    : Offline AI Assistant & MCP Creative Engine
- Offline AI Chatbot        : Edge Document Intelligence
- Mahdaviat                 : Islamic Knowledge & Community Platform

[EXPERIMENTS]
- Football Analyzer         : Computer vision pitch tracking
- AI Drawing Challenge      : Real-time neural sketch classifier
- Blender MCP Automation    : Prompt-to-3D via Model Context Protocol
- Whack-a-Mole              : Reactive physics arcade
- Blinker Word              : RSVP speed-reading prototype`,
        });
        break;

      case 'ai-lab':
        newHistory.push({
          type: 'output',
          text: `AI LAB MODULES ONLINE:
1. Weaver AI                 [Gemini API, Cloud AI, Voice Prompting]
2. MarketNOW                 [SEO & Generative Engine Optimization]
3. Post Office Analyzer      [YOLOv8/11, Computer Vision, Queue Flow]
4. Cafe Analyzer             [YOLO, Table Occupancy Analytics]
5. RAG Document Analyzer     [LlamaIndex, ChromaDB Vector Index]`,
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `TECHNICAL SKILLS MATRIX:
- Core AI: Computer Vision, Object Tracking, Real-time Systems, Multimodal AI, On-device Inference
- ML/DL: PyTorch, TensorFlow, OpenCV, YOLOv8/11, MediaPipe, Scikit-learn, HuggingFace
- GenAI & LLMs: Gemini API, Stable Diffusion, ControlNet, ElevenLabs, TinyLLaMA, LoRA, RLHF
- Retrieval & Agents: RAG, LlamaIndex, ChromaDB, LangChain, MCP (Model Context Protocol), Groq
- Languages: Python, Dart, JavaScript, SQL
- Backend: FastAPI, Flask, REST APIs, WebSockets, Supabase, Twilio, SQLite
- Frontend & Mobile: Flutter, Gradio, PyAutoGUI`,
        });
        break;

      case 'experience':
        newHistory.push({
          type: 'output',
          text: `PROFESSIONAL EXPERIENCE:
- Senior Backend Developer    : Market Now
- Freelance Software Developer : Independent Contractor
- Senior Backend Developer    : Rubat AI
- Data Analyst Intern         : Codetech IT Solution

EDUCATION:
- Osmania University          : B.Tech in Computer Science Engineering (GPA: 8.32 / 10.0)
- IIPS Riyadh, KSA            : Higher Secondary Class XII (88.8%, Graduated 2022)`,
        });
        break;

      case 'achievements':
        newHistory.push({
          type: 'output',
          text: `NATIONAL ACHIEVEMENTS & AWARDS:
★ Smart India Hackathon 2024 — WINNER (₹1,00,000 Cash Prize)
  Organized by Ministry of Education & AICTE, Government of India
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
          text: `OBJECTIVE:
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
          text: `Resume viewer active. Access via the Resume app icon on the desktop or dock.`,
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `CONTACT CHANNELS:
Official email and social channels open. Launch the Contact app from the desktop.`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${trimmed}". Type "help" for a list of valid commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="h-full flex flex-col p-4 bg-black/95 font-mono text-xs select-text">
      {/* Scrollable history */}
      <div className="flex-1 overflow-auto space-y-2 leading-relaxed">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap ${
              line.type === 'input'
                ? 'text-os-accent font-semibold'
                : line.type === 'error'
                ? 'text-os-rose'
                : line.type === 'system'
                ? 'text-os-dim'
                : 'text-os-text/90'
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Terminal prompt input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(input);
        }}
        className="mt-2 pt-2 border-t border-os-border/50 flex items-center space-x-2"
      >
        <span className="text-os-emerald font-bold">visitor@fauzaan-os:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent text-os-text outline-none font-mono text-xs caret-os-accent"
          placeholder="type a command... (try 'projects' or 'help')"
        />
      </form>
    </div>
  );
};
