import type { ExperienceItem, EducationItem } from '../types/experience';

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: 'exp-marketnow',
    role: 'Senior Backend Developer',
    company: 'Market Now',
    period: 'Feb 2026 - Sep 2026',
    placeholderNotice: 'Backend engineering and API architecture for Generative Engine Optimization.',
  },
  {
    id: 'exp-freelance',
    role: 'Freelance Software Developer',
    company: 'Independent Contractor',
    placeholderNotice: 'Client engagements and project deliverables will be added.',
  },
  {
    id: 'exp-rubatai',
    role: 'Backend Developer Intern',
    company: 'Rubat AI',
    type: 'Internship',
    period: 'Oct 2026',
    placeholderNotice: 'Backend development internship focused on API services and system workflows.',
  },
  {
    id: 'exp-codetech',
    role: 'Data Analyst Intern',
    company: 'Codetech IT Solution',
    type: 'Internship',
    placeholderNotice: 'Internship details and analysis workflows will be added.',
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-osmania',
    institution: 'Osmania University',
    degree: 'B.Tech in Computer Science Engineering',
    grade: 'GPA: 8.32 / 10.0',
    location: 'Hyderabad, India',
  },
  {
    id: 'edu-iips',
    institution: 'International Indian Public School Riyadh, KSA',
    degree: 'Higher Secondary (Class XII)',
    grade: '88.8%',
    graduatedYear: 'Graduated 2022',
    location: 'Riyadh, Kingdom of Saudi Arabia',
  },
];
