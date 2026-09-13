import React from 'react';
import { User, Eye, Cpu, Brain, Sparkles, MapPin, GraduationCap } from 'lucide-react';

export const AboutWindow: React.FC = () => {
  return (
    <div className="p-5 max-w-4xl mx-auto space-y-6 select-none text-win-text-light dark:text-win-text-dark">
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-black/10 dark:border-white/10">
        <div className="w-10 h-10 rounded-lg bg-win-accent/10 text-win-accent flex items-center justify-center shrink-0 border border-black/10 dark:border-white/10">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-win-text-light dark:text-win-text-dark">
            About SK Fauzaan
          </h1>
          <p className="text-xs text-win-muted-light dark:text-win-muted-dark">
            AI Systems Engineer & Full-Stack Developer • Hyderabad, India
          </p>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="p-5 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#242424] space-y-3 shadow-sm">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-win-accent uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Engineering Focus</span>
        </div>

        <p className="text-xs sm:text-sm text-win-text-light dark:text-win-text-dark leading-relaxed">
          Passionate about <strong className="text-win-accent font-semibold">Computer Vision</strong>,{' '}
          <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">Artificial Intelligence</strong>, and{' '}
          <strong className="text-purple-600 dark:text-purple-400 font-semibold">Machine Learning</strong>, with a strong
          interest in building intelligent systems and exploring the potential of emerging
          technologies such as{' '}
          <span className="font-semibold text-win-text-light dark:text-win-text-dark underline decoration-win-accent">
            Agentic AI tools
          </span>
          .
        </p>

        <p className="text-xs text-win-muted-light dark:text-win-muted-dark leading-relaxed">
          Enthusiastic about applying AI-driven solutions to solve real-world problems and
          continuously expanding knowledge in advanced deep learning techniques.
        </p>

        <div className="pt-3 border-t border-black/5 dark:border-white/5 flex flex-wrap items-center gap-4 text-xs text-win-muted-light dark:text-win-muted-dark">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Osmania University (B.E. CSE)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-win-accent" />
            <span>Hyderabad, Telangana, India</span>
          </div>
        </div>
      </div>

      {/* Technical Specializations */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-win-muted-light dark:text-win-muted-dark">
          Primary Architectural Pillars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#242424] space-y-2 shadow-sm">
            <div className="flex items-center space-x-2 text-win-accent text-xs font-semibold">
              <Eye className="w-4 h-4" />
              <span>Vision & Object Tracking</span>
            </div>
            <p className="text-xs text-win-muted-light dark:text-win-muted-dark leading-relaxed">
              Real-time computer vision monitoring, customer flow tracking, and attentiveness analytics using YOLO and OpenCV.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#242424] space-y-2 shadow-sm">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <Cpu className="w-4 h-4" />
              <span>Agentic AI & Synthesis</span>
            </div>
            <p className="text-xs text-win-muted-light dark:text-win-muted-dark leading-relaxed">
              Building autonomous platforms with Model Context Protocol (MCP), voice prompting, and prompt-to-production website synthesis.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#242424] space-y-2 shadow-sm">
            <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 text-xs font-semibold">
              <Brain className="w-4 h-4" />
              <span>Retrieval & Edge Models</span>
            </div>
            <p className="text-xs text-win-muted-light dark:text-win-muted-dark leading-relaxed">
              Knowledge retrieval (RAG) using vector stores like ChromaDB and LlamaIndex, alongside on-device private local inference.
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy Footer */}
      <div className="p-3.5 rounded-lg border border-black/10 dark:border-white/10 bg-[#f5f5f5] dark:bg-[#202020] flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2 text-win-muted-light dark:text-win-muted-dark">
          <span className="font-semibold text-win-text-light dark:text-win-text-dark">
            Engineering Philosophy:
          </span>
          <span className="italic text-win-accent">
            "Build. Break. Learn. Repeat."
          </span>
        </div>
        <span className="text-[11px] text-win-muted-light dark:text-win-muted-dark hidden sm:inline">
          FAUZAAN OS
        </span>
      </div>
    </div>
  );
};
