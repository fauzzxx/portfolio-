import React from 'react';
import { Briefcase, GraduationCap, Building2, MapPin } from 'lucide-react';
import { EXPERIENCES_DATA, EDUCATION_DATA } from '../../data/experience';

export const ExperienceWindow: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-os-border gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-os-card border border-os-border text-os-accent">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-mono text-os-text">
              Professional Engineering & Academic History
            </h1>
            <p className="text-xs text-os-muted">
              Backend architecture roles, systems consulting, and verified university credentials
            </p>
          </div>
        </div>
      </div>

      {/* Professional Roles Timeline */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono text-os-muted uppercase tracking-wider flex items-center space-x-2">
          <Building2 className="w-3.5 h-3.5 text-os-accent" />
          <span>Professional Roles</span>
        </h2>

        <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-os-border">
          {EXPERIENCES_DATA.map((exp) => (
            <div key={exp.id} className="relative space-y-2">
              {/* Dot */}
              <span className="absolute -left-6 top-1.5 w-2.5 h-2.5 rounded-full bg-os-accent border-2 border-os-bg" />

              <div className="p-4 rounded-xl bg-os-card/80 border border-os-border hover:border-os-border-focus transition-all space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold font-mono text-os-text">
                      {exp.role}
                    </h3>
                    <span className="text-xs text-os-accent font-mono">{exp.company}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-os-surface/60 border border-os-border/50 text-xs font-mono text-os-dim italic">
                  {exp.placeholderNotice || 'Detailed experience information coming soon.'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Story Section */}
      <div className="space-y-3 pt-2">
        <h2 className="text-xs font-mono text-os-muted uppercase tracking-wider flex items-center space-x-2">
          <GraduationCap className="w-4 h-4 text-os-emerald" />
          <span>Academic Foundation</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EDUCATION_DATA.map((edu) => (
            <div
              key={edu.id}
              className="p-5 rounded-xl bg-os-card/70 border border-os-border hover:border-os-emerald/40 transition-all space-y-3"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-os-emerald uppercase tracking-wider block">
                  Degree & Verification
                </span>
                <h3 className="text-base font-bold font-mono text-os-text">
                  {edu.institution}
                </h3>
                <p className="text-xs text-os-muted">{edu.degree}</p>
              </div>

              <div className="pt-2 border-t border-os-border/50 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                {edu.grade && (
                  <span className="px-2.5 py-1 rounded bg-os-emerald/15 border border-os-emerald/30 text-os-emerald font-semibold">
                    {edu.grade}
                  </span>
                )}
                {edu.graduatedYear && (
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-os-muted">
                    {edu.graduatedYear}
                  </span>
                )}
                {edu.location && (
                  <span className="flex items-center space-x-1 text-os-dim text-[11px]">
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
