import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full bg-[#e8e8e8] dark:bg-[#141414] select-none text-win-text-light dark:text-win-text-dark">
      {/* Document Viewer Toolbar */}
      <div className="h-10 px-4 border-b border-black/10 dark:border-white/10 bg-[#f3f3f3] dark:bg-[#202020] flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-win-accent" />
          <span className="text-xs font-medium text-win-text-light dark:text-win-text-dark">
            Fauzaan_Resume.pdf — Document Viewer
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            title="Print Document"
            className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark transition-colors"
          >
            <Printer className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDownloadNotice(true)}
            className="flex items-center space-x-1.5 px-3 py-1 rounded bg-win-accent hover:bg-win-accent-hover text-white text-xs font-medium transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Notice bar if clicked */}
      {downloadNotice && (
        <div className="px-4 py-2 bg-win-accent/10 border-b border-win-accent/20 flex items-center justify-between text-xs text-win-text-light dark:text-win-text-dark">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-win-accent shrink-0" />
            <span>Official verified resume is presented in high fidelity below. PDF document export will be linked.</span>
          </div>
          <button
            onClick={() => setDownloadNotice(false)}
            className="text-win-muted-light dark:text-win-muted-dark hover:text-win-text-light dark:hover:text-win-text-dark ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Document Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center win-scrollbar">
        {/* Paper Sheet */}
        <div className="w-full max-w-3xl bg-white dark:bg-[#1f1f1f] text-win-text-light dark:text-win-text-dark shadow-2xl rounded-sm border border-black/10 dark:border-white/10 p-6 sm:p-10 space-y-6 select-text">
          {/* Header */}
          <div className="border-b border-black/10 dark:border-white/10 pb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-win-text-light dark:text-win-text-dark">
                SYED KAREEM FAUZAAN
              </h1>
              <p className="text-sm font-medium text-win-accent mt-0.5">
                AI Systems Engineer & Full-Stack Developer
              </p>
            </div>

            <div className="text-xs text-win-muted-light dark:text-win-muted-dark sm:text-right space-y-0.5">
              <p>Hyderabad, Telangana, India</p>
              <p>Osmania University • B.E. Computer Science and Engineering (CSE)</p>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-win-muted-light dark:text-win-muted-dark flex items-center gap-1.5 border-b border-black/5 dark:border-white/5 pb-1">
              <User className="w-3.5 h-3.5 text-win-accent" />
              <span>Career Objective</span>
            </h2>
            <p className="text-xs sm:text-sm text-win-text-light dark:text-win-text-dark leading-relaxed">
              Passionate about Computer Vision, Artificial Intelligence, and Machine Learning, with a strong interest in building intelligent systems and exploring the potential of emerging technologies such as Agentic AI tools. Enthusiastic about applying AI-driven solutions to solve real-world problems and continuously expanding knowledge in advanced deep learning techniques.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-win-muted-light dark:text-win-muted-dark flex items-center gap-1.5 border-b border-black/5 dark:border-white/5 pb-1">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Education</span>
            </h2>
            <div className="space-y-2 text-xs">
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-semibold text-win-text-light dark:text-win-text-dark">
                      {edu.institution}
                    </h3>
                    <p className="text-win-muted-light dark:text-win-muted-dark">
                      {edu.degree}
                    </p>
                  </div>
                  <div className="sm:text-right text-[11px] text-win-muted-light dark:text-win-muted-dark">
                    <span className="font-medium text-emerald-600 dark:text-emerald-400 mr-2">
                      {edu.grade}
                    </span>
                    <span>{edu.graduatedYear}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Achievements */}
          <div className="space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-win-muted-light dark:text-win-muted-dark flex items-center gap-1.5 border-b border-black/5 dark:border-white/5 pb-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Key Honors & Awards</span>
            </h2>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded border border-amber-500/20 bg-amber-500/5 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className="font-semibold text-amber-700 dark:text-amber-300">
                    Smart India Hackathon 2024 — WINNER
                  </span>
                  <span className="font-bold text-amber-700 dark:text-amber-300 text-xs">
                    One Hundred Thousand Indian Rupees (₹100,000) Cash Prize
                  </span>
                </div>
                <p className="text-win-muted-light dark:text-win-muted-dark text-[11.5px] leading-relaxed">
                  National Champion across competing university and professional teams, recognized by the Ministry of Education & AICTE.
                </p>
              </div>

              {ACHIEVEMENTS_DATA.filter((a) => a.id !== 'sih-2024').map((a) => (
                <div key={a.id} className="flex items-start justify-between gap-2 pt-1">
                  <div>
                    <span className="font-medium text-win-text-light dark:text-win-text-dark">
                      {a.title}
                    </span>
                    <span className="text-win-muted-light dark:text-win-muted-dark text-[11px] ml-1.5">
                      — {a.event}
                    </span>
                  </div>
                  {a.prize && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium text-[11px] shrink-0">
                      {a.prize}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-win-muted-light dark:text-win-muted-dark flex items-center gap-1.5 border-b border-black/5 dark:border-white/5 pb-1">
              <Briefcase className="w-3.5 h-3.5 text-win-accent" />
              <span>Professional Experience</span>
            </h2>
            <div className="space-y-2 text-xs">
              {EXPERIENCES_DATA.map((exp) => (
                <div key={exp.id} className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-win-text-light dark:text-win-text-dark">
                      {exp.role}
                    </h3>
                    <span className="text-win-muted-light dark:text-win-muted-dark text-[11px]">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-win-accent">{exp.company}</div>
                  <p className="text-[11.5px] text-win-muted-light dark:text-win-muted-dark leading-relaxed">
                    {exp.placeholderNotice || 'Backend architecture, intelligent APIs, and client systems consulting.'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-win-muted-light dark:text-win-muted-dark flex items-center gap-1.5 border-b border-black/5 dark:border-white/5 pb-1">
              <Layers className="w-3.5 h-3.5 text-win-accent" />
              <span>Technical Proficiencies</span>
            </h2>
            <div className="space-y-1.5 text-xs">
              {SKILLS_DATA.map((cat) => (
                <div key={cat.id} className="flex items-baseline gap-2">
                  <span className="font-semibold text-win-text-light dark:text-win-text-dark shrink-0 text-[11.5px]">
                    {cat.title}:
                  </span>
                  <span className="text-win-muted-light dark:text-win-muted-dark text-[11.5px]">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
