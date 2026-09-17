import type { AchievementItem } from '../types/achievement';

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'sih-2024',
    title: 'WINNER',
    event: 'Smart India Hackathon 2024',
    prize: 'One Hundred Thousand Indian Rupees (₹100,000) Cash Prize',
    year: '2024',
    badge: 'National Premier Hackathon',
    featured: true,
    prominent: true,
    description: 'Premier national hackathon organized by the Ministry of Education & AICTE, Government of India.',
  },
  {
    id: 'hackenvision',
    title: 'Best Innovative Idea',
    event: "NSAKCET's HackEnvision 2.0",
    featured: true,
  },
  {
    id: 'innovators-fest',
    title: 'Job Offer Recipient',
    event: "Innovator's Fest 24",
    featured: true,
  },
  {
    id: 'innovatia-panoply',
    title: 'Best Project of II Year',
    event: 'Innovatia Panoply',
    featured: false,
  },
  {
    id: 'csi-mjcet',
    title: '3rd Place',
    event: 'CSI-MJCET Project Expo',
    featured: false,
  },
  {
    id: 'hackrev',
    title: '3rd Place',
    event: 'HackRev',
    featured: false,
  },
  {
    id: 'hackcelerate',
    title: 'Finalist',
    event: 'HackCelerate',
    featured: false,
  },
];
