export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  type?: string;
  period?: string;
  responsibilities?: string[];
  placeholderNotice?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  grade?: string;
  graduatedYear?: string;
  location?: string;
}
