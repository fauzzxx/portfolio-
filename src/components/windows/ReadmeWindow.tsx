import React from 'react';

export const ReadmeWindow: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1e1e1e] text-win-text-light dark:text-win-text-dark font-mono text-xs select-text">
      {/* Notepad Menu Bar */}
      <div className="h-7 px-3 border-b border-black/10 dark:border-white/10 bg-[#f8f8f8] dark:bg-[#252525] flex items-center gap-4 text-xs font-sans text-win-text-light dark:text-win-text-dark select-none shrink-0">
        <span className="hover:bg-black/5 dark:hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer">File</span>
        <span className="hover:bg-black/5 dark:hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer">Edit</span>
        <span className="hover:bg-black/5 dark:hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer">View</span>
      </div>

      {/* Notepad Text Canvas */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 win-scrollbar leading-relaxed">
        <div>
          <div className="text-sm font-bold text-win-text-light dark:text-win-text-dark mb-1">
            # FAUZAAN OS — Personal Operating System
          </div>
          <div className="text-win-muted-light dark:text-win-muted-dark">
            Personal workstation for exploring the engineering, experiments, architecture, and journey of Syed Kareem Fauzaan.
          </div>
        </div>

        <div className="border-t border-black/10 dark:border-white/10 pt-3">
          <div className="font-bold text-win-text-light dark:text-win-text-dark mb-1">
            ## Philosophy
          </div>
          <div className="italic text-win-accent">
            Build. Break. Learn. Repeat.
          </div>
          <div className="text-win-muted-light dark:text-win-muted-dark text-[11.5px] mt-1">
            "Not everything I build starts as a commercial product. Some things begin as rapid experiments to master cutting-edge primitives — all contributing to high-performance production engineering."
          </div>
        </div>

        <div className="border-t border-black/10 dark:border-white/10 pt-3">
          <div className="font-bold text-win-text-light dark:text-win-text-dark mb-2">
            ## System Architecture & Application Catalog
          </div>
          <div className="space-y-2 text-win-text-light dark:text-win-text-dark">
            <div>
              <strong className="text-win-accent">01. Web Development Platforms</strong>
              <div className="text-win-muted-light dark:text-win-muted-dark text-[11px]">
                High-scale e-commerce, transaction logic, and bulk buying platforms (Alpha Omega, SIOUGE, Crestline Capital, Ammu's Pets).
              </div>
            </div>

            <div>
              <strong className="text-emerald-600 dark:text-emerald-400">02. AI Automation & Machine Learning</strong>
              <div className="text-win-muted-light dark:text-win-muted-dark text-[11px]">
                Computer vision queue flow analytics (Post Office Analyzer, Cafe Crowd Analyzer), Generative Engine Optimization (MarketNOW), and Weaver AI.
              </div>
            </div>

            <div>
              <strong className="text-blue-500">03. Mobile Apps & Edge Intelligence</strong>
              <div className="text-win-muted-light dark:text-win-muted-dark text-[11px]">
                RouteX Capital (Flutter/Gemini), Smart Classroom Assist, AL-AQL offline agent, and Mahdaviat Islamic knowledge platform.
              </div>
            </div>

            <div>
              <strong className="text-amber-600 dark:text-amber-400">04. Creative Experiments & Lab Tools</strong>
              <div className="text-win-muted-light dark:text-win-muted-dark text-[11px]">
                Blender MCP 3D tool calling, Football pitch tracker, and interactive neural classifier.
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 dark:border-white/10 pt-3">
          <div className="font-bold text-win-text-light dark:text-win-text-dark mb-1">
            ## How to Navigate
          </div>
          <div className="text-win-muted-light dark:text-win-muted-dark text-[11.5px] space-y-1">
            <div>• Free Explore Mode: Multitask across all 12 desktop programs, minimize and arrange windows.</div>
            <div>• Guided Presentation: Click the Quick Settings or Desktop icon to take the cinematic 26-chapter walkthrough.</div>
            <div>• Windows Terminal: Open the PowerShell terminal and run `help`, `projects`, or `dir`.</div>
          </div>
        </div>
      </div>

      {/* Notepad Status Bar */}
      <div className="h-6 px-3 border-t border-black/10 dark:border-white/10 bg-[#f8f8f8] dark:bg-[#252525] flex items-center justify-between text-[11px] font-sans text-win-muted-light dark:text-win-muted-dark select-none shrink-0">
        <span>Ln 42, Col 1</span>
        <span>100%</span>
        <span>Windows (CRLF)</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
};
