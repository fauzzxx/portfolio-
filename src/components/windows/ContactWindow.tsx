import React, { useState } from 'react';
import { Mail, Globe, Code2, Copy, Check, Send } from 'lucide-react';

export const ContactWindow: React.FC = () => {
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null);

  const handleCopy = (text: string, channel: string) => {
    navigator.clipboard.writeText(text);
    setCopiedChannel(channel);
    setTimeout(() => setCopiedChannel(null), 1500);
  };

  return (
    <div className="p-5 max-w-2xl mx-auto space-y-5 select-none text-win-text-light dark:text-win-text-dark">
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-black/10 dark:border-white/10">
        <div className="w-10 h-10 rounded-lg bg-win-accent/10 text-win-accent flex items-center justify-center shrink-0 border border-black/10 dark:border-white/10">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-win-text-light dark:text-win-text-dark">
            Contact & Communication Channels
          </h1>
          <p className="text-xs text-win-muted-light dark:text-win-muted-dark">
            Direct channels for engineering opportunities, AI systems consulting, and collaboration
          </p>
        </div>
      </div>

      {/* Intro Card */}
      <div className="p-4 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#242424] space-y-1 shadow-sm">
        <h2 className="text-sm font-semibold text-win-text-light dark:text-win-text-dark">
          Let's build something extraordinary.
        </h2>
        <p className="text-xs text-win-muted-light dark:text-win-muted-dark leading-relaxed">
          Whether you want to discuss computer vision architectures, agentic pipelines, backend engineering roles, or consulting, my communication channels are open.
        </p>
      </div>

      {/* Contact Channels List */}
      <div className="space-y-2.5">
        {/* Email */}
        <div className="p-3.5 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#242424] flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-win-accent/10 text-win-accent flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                Direct Email
              </div>
              <div className="text-[11.5px] text-win-muted-light dark:text-win-muted-dark">
                Available upon contact request
              </div>
            </div>
          </div>

          <button
            onClick={() => handleCopy('skfauzaan@gmail.com', 'email')}
            className="flex items-center gap-1 px-3 py-1 rounded border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/5 dark:hover:bg-white/5 text-xs text-win-text-light dark:text-win-text-dark transition-colors"
          >
            {copiedChannel === 'email' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* GitHub */}
        <div className="p-3.5 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#242424] flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-black/5 dark:bg-white/10 text-win-text-light dark:text-win-text-dark flex items-center justify-center shrink-0">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                GitHub Repositories
              </div>
              <div className="text-[11.5px] text-win-muted-light dark:text-win-muted-dark">
                Explore source code and public engineering projects
              </div>
            </div>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-3 py-1 rounded border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/5 dark:hover:bg-white/5 text-xs text-win-text-light dark:text-win-text-dark transition-colors"
          >
            <span>Visit</span>
          </a>
        </div>

        {/* LinkedIn */}
        <div className="p-3.5 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#242424] flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                Professional Network (LinkedIn)
              </div>
              <div className="text-[11.5px] text-win-muted-light dark:text-win-muted-dark">
                Connect for professional inquiries and career discussions
              </div>
            </div>
          </div>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-3 py-1 rounded border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/5 dark:hover:bg-white/5 text-xs text-win-text-light dark:text-win-text-dark transition-colors"
          >
            <span>Connect</span>
          </a>
        </div>
      </div>

      {/* Quick Message Form */}
      <div className="p-4 rounded-lg border border-black/10 dark:border-white/10 bg-[#fafafa] dark:bg-[#202020] space-y-3">
        <div className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
          Leave a message
        </div>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Your name or email"
            className="w-full h-8 px-3 rounded border border-black/15 dark:border-white/15 bg-white dark:bg-[#1a1a1a] text-xs text-win-text-light dark:text-win-text-dark placeholder:text-win-muted-light dark:placeholder:text-win-muted-dark focus:outline-none focus:border-win-accent"
          />
          <textarea
            rows={3}
            placeholder="Message details..."
            className="w-full p-2.5 rounded border border-black/15 dark:border-white/15 bg-white dark:bg-[#1a1a1a] text-xs text-win-text-light dark:text-win-text-dark placeholder:text-win-muted-light dark:placeholder:text-win-muted-dark focus:outline-none focus:border-win-accent resize-none"
          />
        </div>
        <button
          onClick={() => alert('Thank you! Your message has been recorded.')}
          className="px-4 py-1.5 rounded bg-win-accent hover:bg-win-accent-hover text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send Message</span>
        </button>
      </div>
    </div>
  );
};
