import React, { useState } from 'react';
import {
  FileText,
  Download,
  GraduationCap,
  Briefcase,
  Trophy,
  Layers,
  User,
  Info,
} from 'lucide-react';
import { EDUCATION_DATA, EXPERIENCES_DATA } from '../../data/experience';
import { ACHIEVEMENTS_DATA } from '../../data/achievements';
import { SKILLS_DATA } from '../../data/skills';

export const ResumeWindow: React.FC = () => {
  const [downloadNotice, setDownloadNotice] = useState(false);

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 select-none">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-os-border gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-os-card border border-os-border text-os-accent">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-mono text-os-text">
              Official Curriculum Vitae
            </h1>
            <p className="text-xs text-os-muted">
              Standardized professional resume and verified technical credentials
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setDownloadNotice(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-os-card border border-os-border hover:border-os-accent/40 text-xs font-mono text-os-text transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-os-accent" />
            <span>DOWNLOAD RESUME</span>
          </button>
        </div>
      </div>

      {/* Notice if download clicked */}
      {downloadNotice && (
        <div className="p-3.5 rounded-xl bg-os-accent/10 border border-os-accent/30 flex items-center justify-between text-xs font-mono text-os-text">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-os-accent" />
            <span>Official PDF upload pending. All verified details are presented below.</span>
          </div>
          <button
            onClick={() => setDownloadNotice(false)}
            className="text-os-dim hover:text-os-text"
          >
            [dismiss]
          </button>
        </div>
      )}

      {/* High-Resolution Document Canvas */}
      <div className="rounded-2xl bg-os-card/90 border border-os-border p-6 sm:p-10 space-y-8 select-text shadow-2xl font-sans">
        {/* Document Header */}
        <div className="border-b border-os-border pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-os-text tracking-tight">
              FAUZAAN
            </h2>
            <p className="text-xs sm:text-sm font-mono text-os-accent">
              AI Systems Engineer & Full-Stack Developer
            </p>
          </div>

          <div className="space-y-1 text-right sm:text-right font-mono text-xs text-os-muted">
            <p>Computer Vision • Agentic AI • Real-Time Systems</p>
            <p className="text-[11px] text-os-dim">Osmania University • B.Tech CSE</p>
          </div>
        </div>

        {/* Objective */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-os-accent font-bold flex items-center space-x-1.5">
            <User className="w-3.5 h-3.5" />
            <span>Career Objective</span>
          </h3>
          <p className="text-xs sm:text-sm text-os-text/90 leading-relaxed font-light">
            Passionate about Computer Vision, Artificial Intelligence, and Machine Learning, with a strong interest in building intelligent systems and exploring the potential of emerging technologies such as Agentic AI tools. Enthusiastic about applying AI-driven solutions to solve real-world problems and continuously expanding knowledge in advanced deep learning techniques.
          </p>
        </div>

        {/* Education */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-os-accent font-bold flex items-center space-x-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Education</span>
          </h3>
          <div className="space-y-3 font-mono text-xs">
            {EDUCATION_DATA.map((edu) => (
              <div
                key={edu.id}
                className="p-3.5 rounded-lg bg-os-surface/70 border border-os-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <h4 className="font-bold text-os-text">{edu.institution}</h4>
                  <p className="text-os-muted text-[11px]">{edu.degree}</p>
                </div>
                <div className="text-right">
                  <span className="text-os-emerald font-semibold">{edu.grade}</span>
                  {edu.graduatedYear && (
                    <span className="text-os-dim text-[11px] block">{edu.graduatedYear}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Experience */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-os-accent font-bold flex items-center space-x-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Experience</span>
          </h3>
          <div className="space-y-2.5 font-mono text-xs">
            {EXPERIENCES_DATA.map((exp) => (
              <div
                key={exp.id}
                className="p-3.5 rounded-lg bg-os-surface/70 border border-os-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
              >
                <div>
                  <h4 className="font-bold text-os-text">{exp.role}</h4>
                  <p className="text-os-accent text-[11px]">{exp.company}</p>
                </div>
                <span className="text-[11px] text-os-dim italic">
                  Details to be populated
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-os-amber font-bold flex items-center space-x-1.5">
            <Trophy className="w-3.5 h-3.5 text-os-amber" />
            <span>Key Achievements & Honors</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <span className="text-os-amber font-bold block">Smart India Hackathon 2024 — WINNER</span>
              <span className="text-os-text text-[11px]">₹1,00,000 National Cash Prize</span>
            </div>
            {ACHIEVEMENTS_DATA.filter((a) => a.id !== 'sih-2024').map((a) => (
              <div
                key={a.id}
                className="p-3 rounded-lg bg-os-surface/70 border border-os-border/70"
              >
                <span className="text-os-text font-bold block">{a.title}</span>
                <span className="text-os-dim text-[11px]">{a.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Competencies Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-os-accent font-bold flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Technical Skills Overview</span>
          </h3>
          <div className="flex flex-wrap gap-1.5 text-xs font-mono">
            {SKILLS_DATA.flatMap((g) => g.skills).map((skill) => (
              <span
                key={skill.name}
                className="px-2 py-0.5 rounded bg-os-surface border border-os-border text-os-muted text-[11px]"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
