import React from 'react';
import { Mail, Globe, Code2 } from 'lucide-react';

export const ContactWindow: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6 select-none">
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-os-border">
        <div className="p-2.5 rounded-xl bg-os-card border border-os-border text-os-accent">
          <Mail className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold font-mono text-os-text">
            Contact & Communication Modules
          </h1>
          <p className="text-xs text-os-muted">
            Direct channels for engineering roles, AI consulting, and technical collaboration
          </p>
        </div>
      </div>

      {/* Main Pitch */}
      <div className="p-6 rounded-2xl bg-os-card/80 border border-os-border space-y-3">
        <h2 className="text-lg sm:text-xl font-bold font-mono text-os-text">
          Let's build something interesting.
        </h2>
        <p className="text-xs sm:text-sm text-os-muted leading-relaxed font-light">
          Whether you want to discuss computer vision pipelines, agentic workflows, software architecture, or engineering roles, my channels are open.
        </p>
      </div>

      {/* Channels Grid with Honest Placeholders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Email */}
        <div className="p-4 rounded-xl bg-os-card/60 border border-os-border space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-os-accent">
            <Mail className="w-4 h-4" />
            <span className="uppercase tracking-wider">Direct Email</span>
          </div>
          <p className="text-xs font-mono text-os-dim">
            Contact information coming soon.
          </p>
        </div>

        {/* GitHub */}
        <div className="p-4 rounded-xl bg-os-card/60 border border-os-border space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-os-text">
            <Code2 className="w-4 h-4" />
            <span className="uppercase tracking-wider">GitHub Profile</span>
          </div>
          <p className="text-xs font-mono text-os-dim">
            Profile link coming soon.
          </p>
        </div>

        {/* LinkedIn */}
        <div className="p-4 rounded-xl bg-os-card/60 border border-os-border space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-os-accent">
            <Globe className="w-4 h-4" />
            <span className="uppercase tracking-wider">LinkedIn</span>
          </div>
          <p className="text-xs font-mono text-os-dim">
            Profile link coming soon.
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="p-3.5 rounded-xl bg-os-surface/60 border border-os-border/50 flex items-center justify-between text-xs font-mono text-os-dim">
        <span>Channel status: STANDBY</span>
        <span className="text-os-emerald">READY FOR PHASE INTEGRATION</span>
      </div>
    </div>
  );
};
