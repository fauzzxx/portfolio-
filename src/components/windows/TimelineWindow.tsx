import React, { useState } from 'react';
import { TIMELINE_DATA } from '../../data/timeline';
import type { TimelineEntry } from '../../data/timeline';
import type { AppId } from '../../types/os';
import {
  GraduationCap,
  Trophy,
  Briefcase,
  Calendar,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { logActivity } from '../../utils/recentActivity';

interface TimelineWindowProps {
  onOpenApp?: (appId: AppId) => void;
}

export const TimelineWindow: React.FC<TimelineWindowProps> = ({ onOpenApp }) => {
  const [filter, setFilter] = useState<'all' | 'experience' | 'achievement' | 'education'>('all');

  const filteredEntries = TIMELINE_DATA.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const getCategoryIcon = (category: TimelineEntry['category']) => {
    switch (category) {
      case 'education':
        return <GraduationCap className="w-4 h-4 text-[#0078d4]" />;
      case 'achievement':
        return <Trophy className="w-4 h-4 text-[#f7b500]" />;
      case 'experience':
        return <Briefcase className="w-4 h-4 text-[#107c41]" />;
    }
  };

  const handleEntryClick = (entry: TimelineEntry) => {
    if (entry.targetAppId && onOpenApp) {
      logActivity('open_app', `Timeline: ${entry.title}`, { appId: entry.targetAppId });
      onOpenApp(entry.targetAppId);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f9f9f9] dark:bg-[#191919] select-none text-win-text-light dark:text-win-text-dark font-sans overflow-hidden">
      {/* Top Banner & Filter Strip */}
      <div className="p-4 sm:p-5 border-b border-black/10 dark:border-white/10 bg-white dark:bg-[#202020] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-sm sm:text-base font-bold text-win-text-light dark:text-win-text-dark">
              Career & Milestone Timeline
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-win-accent/10 text-win-accent text-[10px] font-mono font-semibold">
              Verified Record
            </span>
          </div>
          <p className="text-xs text-win-muted-light dark:text-win-muted-dark mt-0.5">
            Chronological academic foundation, national hackathons, and engineering roles
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-lg border border-black/5 dark:border-white/5 self-start sm:self-auto text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'experience', label: 'Experience' },
            { id: 'achievement', label: 'Awards' },
            { id: 'education', label: 'Education' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                filter === tab.id
                  ? 'bg-white dark:bg-[#2d2d2d] text-win-text-light dark:text-win-text-dark shadow-sm'
                  : 'text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Timeline View */}
      <div className="flex-1 overflow-y-auto win-scrollbar p-4 sm:p-6">
        <div className="relative border-l-2 border-win-accent/30 ml-4 sm:ml-6 space-y-6 pb-6">
          {filteredEntries.map((entry) => (
            <div key={entry.id} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Bullet Node */}
              <div
                className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-2 border-white dark:border-[#191919] flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${
                  entry.isMilestone
                    ? 'bg-win-accent text-white'
                    : 'bg-[#e0e0e0] dark:bg-[#333333] text-win-text-light dark:text-win-text-dark'
                }`}
              >
                {getCategoryIcon(entry.category)}
              </div>

              {/* Timeline Card */}
              <div
                onClick={() => handleEntryClick(entry)}
                className={`p-4 rounded-xl border transition-all ${
                  entry.targetAppId ? 'cursor-pointer hover:shadow-md' : ''
                } ${
                  entry.isMilestone
                    ? 'border-win-accent/40 bg-white dark:bg-[#222222] shadow-sm hover:border-win-accent'
                    : 'border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#202020] hover:border-black/20 dark:hover:border-white/20'
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center space-x-2">
                    {entry.period && (
                      <span className="flex items-center space-x-1 text-[11px] font-mono text-win-accent font-semibold">
                        <Calendar className="w-3 h-3" />
                        <span>{entry.period}</span>
                      </span>
                    )}
                    {entry.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/5 dark:bg-white/10 text-win-muted-light dark:text-win-muted-dark">
                        {entry.badge}
                      </span>
                    )}
                  </div>

                  {entry.gradeOrPrize && (
                    <span className="px-2 py-0.5 rounded-full bg-[#f7b500]/15 text-[#f7b500] text-[11px] font-bold font-mono">
                      {entry.gradeOrPrize}
                    </span>
                  )}
                </div>

                {/* Title & Organization */}
                <h3 className="text-sm font-bold text-win-text-light dark:text-win-text-dark tracking-tight">
                  {entry.title}
                </h3>
                <div className="flex items-center space-x-3 text-xs text-win-muted-light dark:text-win-muted-dark mt-0.5 font-medium">
                  <span>{entry.organization}</span>
                  {entry.location && (
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-win-muted-light/60" />
                      <span>{entry.location}</span>
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-win-text-light/80 dark:text-win-text-dark/80 leading-relaxed mt-2">
                  {entry.description}
                </p>

                {/* Target App Quick Jump */}
                {entry.targetAppId && (
                  <div className="mt-3 pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] text-win-accent font-medium">
                    <span>Inspect details in {entry.targetAppId.toUpperCase()}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
