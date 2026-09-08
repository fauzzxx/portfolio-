import React from 'react';
import { FileCode2 } from 'lucide-react';

export const ReadmeWindow: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6 font-mono text-xs select-text">
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-os-border text-os-muted">
        <FileCode2 className="w-5 h-5 text-os-accent" />
        <span className="text-xs">README.md — FAUZAAN_OS_MANUAL [v1.0.0]</span>
      </div>

      <div className="space-y-6 leading-relaxed text-os-muted">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-os-text mb-2"># FAUZAAN OS</h1>
          <p className="text-os-text/90 text-sm">
            Personal operating system for exploring the work, experiments, ideas, and journey of Fauzaan.
          </p>
        </div>

        {/* Philosophy */}
        <div className="p-4 rounded-xl bg-os-card border border-os-border space-y-2">
          <h2 className="text-xs uppercase tracking-wider text-os-accent font-bold">
            ## Philosophy
          </h2>
          <p className="text-sm text-os-text italic">
            Build. Break. Learn. Repeat.
          </p>
          <p className="text-xs text-os-dim pt-1">
            "Not everything I build starts as a product. Some things start as experiments. And all of that becomes experience."
          </p>
        </div>

        {/* System Architecture */}
        <div className="p-4 rounded-xl bg-os-card border border-os-border space-y-3">
          <h2 className="text-xs uppercase tracking-wider text-os-emerald font-bold">
            ## System Architecture
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-os-surface/70 border border-os-border/70 space-y-1">
              <span className="text-os-accent font-bold block">01. Web Development</span>
              <p className="text-os-dim text-[11px]">
                High-scale e-commerce, transaction logic, and bulk buying platforms.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-os-surface/70 border border-os-border/70 space-y-1">
              <span className="text-os-emerald font-bold block">02. AI Automation & Intelligence</span>
              <p className="text-os-dim text-[11px]">
                Computer vision queue analytics, Generative Engine Optimization, and Weaver AI.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-os-surface/70 border border-os-border/70 space-y-1">
              <span className="text-os-neural font-bold block">03. App Development & Edge</span>
              <p className="text-os-dim text-[11px]">
                RouteX Capital (Flutter), Smart Classroom Assist, AL-AQL, and Mahdaviat.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-os-surface/70 border border-os-border/70 space-y-1">
              <span className="text-os-amber font-bold block">04. Creative Experiments</span>
              <p className="text-os-dim text-[11px]">
                Blender MCP tool calling, Football Analyzer, and reactive arcade physics.
              </p>
            </div>
          </div>
        </div>

        {/* Exploration Modes */}
        <div className="p-4 rounded-xl bg-os-card border border-os-border space-y-2">
          <h2 className="text-xs uppercase tracking-wider text-os-text font-bold">
            ## How to Explore
          </h2>
          <ul className="space-y-1 text-xs text-os-text/90">
            <li>
              <strong className="text-os-accent">Explore Mode:</strong> Click any desktop icon or use the dock launcher to explore applications freely.
            </li>
            <li>
              <strong className="text-os-emerald">Guided Experience:</strong> Launch the cinematic tour from the desktop or dock to walk through all 26 chapters with project walkthroughs and narration infrastructure.
            </li>
            <li>
              <strong className="text-os-dim">Terminal Mode:</strong> Open the terminal and type <code className="text-os-accent bg-os-surface px-1 py-0.5 rounded">help</code> or <code className="text-os-accent bg-os-surface px-1 py-0.5 rounded">projects</code> for direct text interaction.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
