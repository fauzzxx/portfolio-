import React from 'react';
import {
  Folder,
  Cpu,
  Layers,
  Trophy,
  Briefcase,
  FileText,
  User,
  Terminal,
  PlaySquare,
  FileCode,
  Mail,
  Settings,
  Sparkles,
  History,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface AppIconProps extends LucideProps {
  name: string;
}

export const AppIcon: React.FC<AppIconProps> = ({ name, className = '', ...props }) => {
  switch (name) {
    case 'FolderGit2':
    case 'Folder':
      return <Folder className={`text-[#ffb900] ${className}`} {...props} />;
    case 'Cpu':
      return <Cpu className={`text-[#00a4ef] ${className}`} {...props} />;
    case 'Layers':
      return <Layers className={`text-[#0078d4] ${className}`} {...props} />;
    case 'Trophy':
      return <Trophy className={`text-[#f7b500] ${className}`} {...props} />;
    case 'Briefcase':
      return <Briefcase className={`text-[#107c41] ${className}`} {...props} />;
    case 'FileText':
      return <FileText className={`text-[#2b579a] ${className}`} {...props} />;
    case 'User':
      return <User className={`text-[#0078d4] ${className}`} {...props} />;
    case 'Terminal':
      return <Terminal className={`text-[#cccccc] ${className}`} {...props} />;
    case 'PlaySquare':
      return <PlaySquare className={`text-[#ea3e2b] ${className}`} {...props} />;
    case 'FileCode2':
    case 'FileCode':
      return <FileCode className={`text-[#0078d4] ${className}`} {...props} />;
    case 'Mail':
      return <Mail className={`text-[#0078d4] ${className}`} {...props} />;
    case 'Sliders':
    case 'Settings':
      return <Settings className={`text-[#a6a6a6] ${className}`} {...props} />;
    case 'History':
      return <History className={`text-[#0078d4] ${className}`} {...props} />;
    default:
      return <Sparkles className={`text-[#0078d4] ${className}`} {...props} />;
  }
};
