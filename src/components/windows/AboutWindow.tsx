import React from 'react';
import { User, Eye, Cpu, Brain, Compass, Sparkles } from 'lucide-react';

export const AboutWindow: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6 select-none">
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-os-border">
        <div className="p-2.5 rounded-xl bg-os-card border border-os-border text-os-accent">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold font-mono text-os-text">About Fauzaan</h1>
          <p className="text-xs text-os-muted">
            Computer Vision, Machine Learning & Intelligent Systems Builder
          </p>
        </div>
      </div>

      {/* Core Objective Card - Naturally formatted without fabrication */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-os-card via-os-card to-os-surface border border-os-border shadow-xl space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono text-os-accent uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Engineering Focus</span>
        </div>

        <p className="text-sm sm:text-base text-os-text leading-relaxed font-light">
          Passionate about <span className="text-os-accent font-medium">Computer Vision</span>,{' '}
          <span className="text-os-emerald font-medium">Artificial Intelligence</span>, and{' '}
          <span className="text-os-neural font-medium">Machine Learning</span>, with a strong
          interest in building intelligent systems and exploring the potential of emerging
          technologies such as{' '}
          <span className="text-os-text font-medium underline decoration-os-accent/40">
            Agentic AI tools
          </span>
          .
        </p>

        <p className="text-xs sm:text-sm text-os-muted leading-relaxed">
          Enthusiastic about applying AI-driven solutions to solve real-world problems and
          continuously expanding knowledge in advanced deep learning techniques.
        </p>
      </div>

      {/* Technical Specializations */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono text-os-muted uppercase tracking-wider">
          Primary Architectural Pillars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-os-card/70 border border-os-border space-y-2">
            <div className="flex items-center space-x-2 text-os-accent text-xs font-mono">
              <Eye className="w-4 h-4" />
              <span>VISION & OBJECT DETECTION</span>
            </div>
            <p className="text-xs text-os-muted leading-relaxed">
              Real-time computer vision monitoring, customer flow tracking, and attentiveness analytics using YOLO and OpenCV.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-os-card/70 border border-os-border space-y-2">
            <div className="flex items-center space-x-2 text-os-emerald text-xs font-mono">
              <Cpu className="w-4 h-4" />
              <span>AGENTIC AI & TOOLCALLING</span>
            </div>
            <p className="text-xs text-os-muted leading-relaxed">
              Building autonomous platforms with Model Context Protocol (MCP), voice prompting, and prompt-to-production website synthesis.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-os-card/70 border border-os-border space-y-2">
            <div className="flex items-center space-x-2 text-os-neural text-xs font-mono">
              <Brain className="w-4 h-4" />
              <span>RETRIEVAL & EDGE MODELS</span>
            </div>
            <p className="text-xs text-os-muted leading-relaxed">
              Knowledge retrieval (RAG) using vector stores like ChromaDB and LlamaIndex, alongside on-device private local inference.
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <div className="p-4 rounded-xl bg-os-card/40 border border-os-border flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2.5 text-os-muted">
          <Compass className="w-4 h-4 text-os-accent" />
          <span>Engineering Philosophy:</span>
          <span className="text-os-text font-bold">Build. Break. Learn. Repeat.</span>
        </div>
        <span className="text-[11px] text-os-dim hidden sm:inline">FAUZAAN_OS // KERNEL</span>
      </div>
    </div>
  );
};
