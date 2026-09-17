import type { AppId } from '../types/os';

export interface TimelineEntry {
  id: string;
  year?: string;
  period?: string;
  title: string;
  organization: string;
  location?: string;
  category: 'education' | 'achievement' | 'experience';
  badge?: string;
  description: string;
  gradeOrPrize?: string;
  targetAppId?: AppId;
  targetProjectId?: string;
  isMilestone?: boolean;
}

export const TIMELINE_DATA: TimelineEntry[] = [
  {
    id: 'tl-rubat',
    period: 'Oct 2026',
    title: 'Backend Developer Intern',
    organization: 'Rubat AI',
    category: 'experience',
    badge: 'Internship',
    description: 'Backend development focused on API services, server architecture, and system workflows.',
    targetAppId: 'experience',
    isMilestone: true,
  },
  {
    id: 'tl-marketnow',
    period: 'Feb 2026 - Sep 2026',
    title: 'Senior Backend Developer',
    organization: 'Market Now',
    category: 'experience',
    badge: 'Engineering Role',
    description: 'Backend engineering, high-throughput API architecture, and pipelines for Generative Engine Optimization.',
    targetAppId: 'experience',
    isMilestone: true,
  },
  {
    id: 'tl-sih-2024',
    year: '2024',
    period: '2024',
    title: 'Smart India Hackathon 2024 Winner',
    organization: 'Ministry of Education & AICTE, Govt of India',
    category: 'achievement',
    badge: 'National Winner',
    gradeOrPrize: 'One Hundred Thousand Indian Rupees (₹100,000) Cash Prize',
    description: 'Winner of India’s premier national hackathon for innovative classroom computer-vision automation.',
    targetAppId: 'achievements',
    targetProjectId: 'smart-classroom-assist',
    isMilestone: true,
  },
  {
    id: 'tl-hackenvision',
    year: '2024',
    title: 'Best Innovative Idea',
    organization: "NSAKCET's HackEnvision 2.0",
    category: 'achievement',
    badge: 'Award',
    description: 'Recognized for top creative and architectural system design in hackathon competition.',
    targetAppId: 'achievements',
  },
  {
    id: 'tl-innovators-fest',
    year: '2024',
    title: 'Job Offer Recipient',
    organization: "Innovator's Fest 24",
    category: 'achievement',
    badge: 'Honors',
    description: 'Awarded formal job offer in recognition of engineering capability and live demonstration.',
    targetAppId: 'achievements',
  },
  {
    id: 'tl-osmania',
    title: 'B.E. Computer Science and Engineering (CSE)',
    organization: 'Osmania University',
    location: 'Hyderabad, India',
    category: 'education',
    badge: 'University Degree',
    gradeOrPrize: 'GPA: 8.32 / 10.0',
    description: 'Rigorous computer science curriculum emphasizing algorithms, distributed systems, mathematics, and machine learning.',
    targetAppId: 'resume',
    isMilestone: true,
  },
  {
    id: 'tl-innovatia',
    title: 'Best Project of II Year',
    organization: 'Innovatia Panoply',
    category: 'achievement',
    badge: 'Academic Distinction',
    description: 'Awarded best engineering project across the second-year engineering cohort.',
    targetAppId: 'achievements',
  },
  {
    id: 'tl-csi-mjcet',
    title: '3rd Place',
    organization: 'CSI-MJCET Project Expo',
    category: 'achievement',
    badge: 'Expo Finalist',
    description: 'State-level project exposition recognition for working software prototype.',
    targetAppId: 'achievements',
  },
  {
    id: 'tl-hackrev',
    title: '3rd Place',
    organization: 'HackRev',
    category: 'achievement',
    badge: 'Hackathon Finalist',
    description: 'Podium finish in competitive rapid software prototyping hackathon.',
    targetAppId: 'achievements',
  },
  {
    id: 'tl-hackcelerate',
    title: 'Finalist',
    organization: 'HackCelerate',
    category: 'achievement',
    badge: 'Finalist',
    description: 'Selected as top finalist among competitive regional engineering teams.',
    targetAppId: 'achievements',
  },
  {
    id: 'tl-iips',
    year: '2022',
    period: 'Graduated 2022',
    title: 'Higher Secondary (Class XII)',
    organization: 'International Indian Public School',
    location: 'Riyadh, Kingdom of Saudi Arabia',
    category: 'education',
    badge: 'Schooling',
    gradeOrPrize: '88.8%',
    description: 'Completed higher secondary education with distinction in Science and Mathematics.',
    targetAppId: 'resume',
    isMilestone: true,
  },
];
