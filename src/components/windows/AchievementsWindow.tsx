import React from 'react';
import { Trophy, Award, Medal, Star } from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '../../data/achievements';

export const AchievementsWindow: React.FC = () => {
  const winnerSIH = ACHIEVEMENTS_DATA.find((a) => a.id === 'sih-2024');
  const otherAchievements = ACHIEVEMENTS_DATA.filter((a) => a.id !== 'sih-2024');

  return (
    <div className="p-5 max-w-4xl mx-auto space-y-6 select-none text-win-text-light dark:text-win-text-dark">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-black/10 dark:border-white/10">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-win-text-light dark:text-win-text-dark">
              Honors, Awards & Competitive Milestones
            </h1>
            <p className="text-xs text-win-muted-light dark:text-win-muted-dark">
              National hackathons, engineering recognitions, and competitive podiums
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded bg-black/5 dark:bg-white/10 text-xs font-medium self-start sm:self-auto">
          {ACHIEVEMENTS_DATA.length} Recognitions
        </span>
      </div>

      {/* Prominent Smart India Hackathon 2024 Card */}
      {winnerSIH && (
        <div className="rounded-xl border-2 border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-5 sm:p-6 space-y-4 shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2.5 flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold border border-amber-500/30">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{winnerSIH.badge || 'National Premier Hackathon'}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-win-text-light dark:text-win-text-dark tracking-tight">
                {winnerSIH.title} — {winnerSIH.event}
              </h2>

              <p className="text-xs sm:text-sm text-win-muted-light dark:text-win-muted-dark leading-relaxed max-w-xl">
                {winnerSIH.description} Demonstrated high-velocity engineering, robust architectural design, and production problem solving on a national stage.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/90 dark:bg-[#202020]/95 border border-amber-500/35 text-left md:text-right shrink-0 w-full md:w-auto md:max-w-[280px] space-y-1.5 shadow-md">
              <div className="flex items-center justify-between md:justify-end gap-2 border-b border-black/5 dark:border-white/10 pb-1">
                <span className="text-[10px] text-win-muted-light dark:text-win-muted-dark uppercase tracking-wider font-bold">
                  Cash Prize Awarded
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  WINNER
                </span>
              </div>
              <div className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400 tracking-tight leading-snug break-words">
                One Hundred Thousand Indian Rupees
              </div>
              <div className="text-xs font-semibold text-win-muted-light dark:text-win-muted-dark flex items-center md:justify-end gap-1.5">
                <span className="text-amber-600 dark:text-amber-400 font-bold">₹100,000</span>
                <span>•</span>
                <span>National Prize</span>
              </div>
              <span className="text-[10px] text-win-muted-light dark:text-win-muted-dark block pt-1 border-t border-black/5 dark:border-white/10">
                Ministry of Education & AICTE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Other Awards & Recognitions */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-win-muted-light dark:text-win-muted-dark flex items-center gap-1.5">
          <Medal className="w-3.5 h-3.5 text-win-accent" />
          <span>Competitive Podiums & Technical Milestones</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {otherAchievements.map((item, index) => (
            <div
              key={item.id}
              className="p-4 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#242424] hover:border-win-accent transition-all flex items-start gap-3 shadow-sm"
            >
              <div className="w-8 h-8 rounded bg-win-accent/10 text-win-accent flex items-center justify-center shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div className="space-y-1 min-w-0">
                <span className="text-[10.5px] text-win-muted-light dark:text-win-muted-dark block">
                  Recognition #{index + 2}
                </span>
                <h4 className="text-xs font-semibold text-win-text-light dark:text-win-text-dark">
                  {item.title}
                </h4>
                <p className="text-xs text-win-muted-light dark:text-win-muted-dark leading-relaxed">
                  {item.event}
                </p>
                {item.prize && (
                  <span className="inline-block mt-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    Prize: {item.prize}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
