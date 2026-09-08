import React from 'react';
import {
  FolderGit2,
  Cpu,
  Layers,
  Trophy,
  Briefcase,
  FileText,
  User,
  Terminal,
  PlaySquare,
  FileCode2,
  Mail,
  Sliders,
  Sparkles,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface AppIconProps extends LucideProps {
  name: string;
}

export const AppIcon: React.FC<AppIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'FolderGit2':
      return <FolderGit2 {...props} />;
    case 'Cpu':
      return <Cpu {...props} />;
    case 'Layers':
      return <Layers {...props} />;
    case 'Trophy':
      return <Trophy {...props} />;
    case 'Briefcase':
      return <Briefcase {...props} />;
    case 'FileText':
      return <FileText {...props} />;
    case 'User':
      return <User {...props} />;
    case 'Terminal':
      return <Terminal {...props} />;
    case 'PlaySquare':
      return <PlaySquare {...props} />;
    case 'FileCode2':
      return <FileCode2 {...props} />;
    case 'Mail':
      return <Mail {...props} />;
    case 'Sliders':
      return <Sliders {...props} />;
    default:
      return <Sparkles {...props} />;
  }
};
