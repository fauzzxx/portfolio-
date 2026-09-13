import React from 'react';
import { Briefcase, GraduationCap, Building2, MapPin, Calendar } from 'lucide-react';
import { EXPERIENCES_DATA, EDUCATION_DATA } from '../../data/experience';

export const ExperienceWindow: React.FC = () => {
  return (
    <div className="p-5 max-w-4xl mx-auto space-y-6 select-none text-win-text-light dark:text-win-text-dark">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-win-accent/10 text-win-accent flex items-center justify-center shrink-0 border border-black/10 dark:border-white/10">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-win-text-light dark:text-win-text-dark">
              Professional Experience & Academic Credentials
            </h1>
            <p className="text-xs text-win-muted-light dark:text-win-muted-dark">
              Engineering track record, architectural consulting, and verified university foundation
            </p>
          </div>
        </div>
      </div>

      {/* Professional Roles */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-win-muted-light dark:text-win-muted-dark flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-win-accent" />
          <span>Work History</span>
        </h2>

        <div className="space-y-3">
          {EXPERIENCES_DATA.map((exp) => (
            <div
              key={exp.id}
              className="p-4 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#242424] space-y-2 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-win-text-light dark:text-win-text-dark">
                      {exp.role}
                    </h3>
                    {exp.type && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-win-accent/10 text-win-accent font-medium border border-win-accent/20">
                        {exp.type}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-medium text-win-accent">
                    {exp.company}
                  </div>
                </div>
                {exp.period && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[11px] text-win-muted-light dark:text-win-muted-dark shrink-0">
                    <Calendar className="w-3 h-3 text-win-accent" />
                    <span className="font-medium text-win-text-light dark:text-win-text-dark">{exp.period}</span>
                  </div>
                )}
              </div>

              <div className="p-2.5 rounded bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 text-xs text-win-muted-light dark:text-win-muted-dark">
                {exp.placeholderNotice || 'Full experience record cataloged in resume document.'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Foundation Section */}
      <div className="space-y-3 pt-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-win-muted-light dark:text-win-muted-dark flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Education & Credentials</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EDUCATION_DATA.map((edu) => (
            <div
              key={edu.id}
              className="p-4 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#242424] space-y-3 shadow-sm"
            >
              <div>
                <span className="text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide block">
                  Degree & Verification
                </span>
                <h3 className="text-sm font-semibold text-win-text-light dark:text-win-text-dark mt-0.5">
                  {edu.institution}
                </h3>
                <p className="text-xs text-win-muted-light dark:text-win-muted-dark mt-0.5">
                  {edu.degree}
                </p>
              </div>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
                {edu.grade && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium">
                    {edu.grade}
                  </span>
                )}
                {edu.graduatedYear && (
                  <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-win-muted-light dark:text-win-muted-dark">
                    {edu.graduatedYear}
                  </span>
                )}
                {edu.location && (
                  <span className="flex items-center gap-1 text-[11px] text-win-muted-light dark:text-win-muted-dark">
                    <MapPin className="w-3 h-3" />
                    <span>{edu.location}</span>
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
