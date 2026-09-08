import React from 'react';
import { Trophy, Award, Star } from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '../../data/achievements';

export const AchievementsWindow: React.FC = () => {
  const winnerSIH = ACHIEVEMENTS_DATA.find((a) => a.id === 'sih-2024');
  const otherAchievements = ACHIEVEMENTS_DATA.filter((a) => a.id !== 'sih-2024');

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-os-border gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-os-card border border-os-border text-os-amber">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-mono text-os-text">
              National Honors & Competitive Milestones
            </h1>
            <p className="text-xs text-os-muted">
              Hackathon victories, institutional accolades, and technical recognitions
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-os-amber/10 border border-os-amber/30 text-os-amber font-semibold">
            {ACHIEVEMENTS_DATA.length} RECOGNITIONS
          </span>
        </div>
      </div>

      {/* Prominent Smart India Hackathon 2024 Victory Display */}
      {winnerSIH && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/15 via-os-card to-os-card border-2 border-os-amber/50 p-6 sm:p-8 shadow-xl shadow-amber-500/10 space-y-4">
          <div className="absolute top-0 right-0 w-80 h-80 bg-os-amber/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-os-amber/20 border border-os-amber/40 text-os-amber text-xs font-mono font-semibold">
                <Star className="w-3.5 h-3.5 fill-os-amber" />
                <span>{winnerSIH.badge || 'National Premier Milestone'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-os-text tracking-tight">
                {winnerSIH.title} — {winnerSIH.event}
              </h2>

              <p className="text-xs sm:text-sm text-os-muted max-w-xl leading-relaxed">
                {winnerSIH.description} A flagship competitive milestone demonstrating real-world problem solving, execution speed, and production engineering.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-os-bg/90 border border-os-amber/40 text-right self-start md:self-auto shrink-0 space-y-1">
              <span className="text-[11px] font-mono text-os-muted uppercase tracking-wider block">
                Cash Prize Awarded
              </span>
              <span className="text-3xl font-bold font-mono text-os-amber block tracking-tight">
                {winnerSIH.prize}
              </span>
              <span className="text-[10px] font-mono text-os-dim block">
                Ministry of Education & AICTE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Competitive Track & Progression */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono text-os-muted uppercase tracking-wider flex items-center space-x-2">
          <Award className="w-3.5 h-3.5 text-os-accent" />
          <span>Competitive Podiums & Innovations</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {otherAchievements.map((item, index) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-os-card/70 border border-os-border hover:border-os-border-focus transition-all flex items-start space-x-3.5"
            >
              <div className="p-2.5 rounded-lg bg-os-surface border border-os-border text-os-accent shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="space-y-1 min-w-0">
                <span className="text-[10px] font-mono text-os-dim block uppercase">
                  Milestone 0{index + 2}
                </span>
                <h4 className="text-sm font-semibold font-mono text-os-text truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-os-muted">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
