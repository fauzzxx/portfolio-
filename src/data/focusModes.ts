import type { AppId } from '../types/os';

export interface FocusStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  highlightText: string;
  bullets: string[];
  targetAppId?: AppId;
  targetProjectId?: string;
  actionLabel?: string;
}

export interface FocusModeConfig {
  id: '2min' | '5min' | '10min';
  label: string;
  estimatedTime: string;
  tagline: string;
  description: string;
  steps: FocusStep[];
}

export const FOCUS_MODES: Record<'2min' | '5min', FocusModeConfig> = {
  '2min': {
    id: '2min',
    label: '2 Minutes',
    estimatedTime: '~2 Minutes',
    tagline: 'High-Impact Executive Briefing',
    description: 'Fast-track summary covering premier systems, national hackathon victory, verified engineering roles, and resume.',
    steps: [
      {
        id: '2m-1',
        stepNumber: 1,
        title: 'Core Engineering Identity',
        subtitle: 'Computer Science Engineer • AI & Computer Vision',
        highlightText:
          'Fauzaan builds production-grade software specializing in real-time computer vision, agentic pipelines, and local LLM architectures.',
        bullets: [
          'B.E. Computer Science and Engineering (CSE) from Osmania University (GPA 8.32 / 10.0)',
          'Class XII from IIPS Riyadh (88.8%)',
          'Full-stack execution: Flutter, Python, TypeScript, YOLO, PyTorch',
        ],
        targetAppId: 'about',
        actionLabel: 'View Profile',
      },
      {
        id: '2m-2',
        stepNumber: 2,
        title: 'National Hackathon Victory',
        subtitle: 'Smart India Hackathon 2024 Winner',
        highlightText:
          'Awarded One Hundred Thousand Indian Rupees (₹100,000) cash prize as the national winner among thousands of engineering teams across India.',
        bullets: [
          'Premier competition organized by Ministry of Education & AICTE',
          'Built Smart Classroom Assist: YOLOv11 + OCR + generative explainer video',
          'Demonstrated end-to-end automated attendance and interactive blackboard capture',
        ],
        targetAppId: 'achievements',
        actionLabel: 'View Achievements',
      },
      {
        id: '2m-3',
        stepNumber: 3,
        title: 'Flagship Systems',
        subtitle: 'AL-AQL, Weaver AI & Football Analyser',
        highlightText:
          'Deep technical execution across offline AI, cloud deployment, and sports computer vision.',
        bullets: [
          'AL-AQL: 100% offline multimodal assistant with 4-bit NF4 TinyLLaMA 1.1B, LoRA, and MCP',
          'Weaver AI: Automated website generator with Gemini intelligence and live Vercel deployments',
          'Football Analyser: Multi-object ByteTrack tracking, team clustering, and optical flow perspective transform',
        ],
        targetAppId: 'projects',
        actionLabel: 'Explore Projects',
      },
      {
        id: '2m-4',
        stepNumber: 4,
        title: 'Professional Experience',
        subtitle: 'Backend Engineering & Applied Systems',
        highlightText:
          'Proven ability to engineer high-throughput backend APIs and robust operational software.',
        bullets: [
          'Senior Backend Developer at Market Now (Feb 2026 - Sep 2026)',
          'Backend Developer Intern at Rubat AI (Oct 2026)',
          'Data Analyst Intern at Codetech IT Solution',
        ],
        targetAppId: 'experience',
        actionLabel: 'View Experience',
      },
      {
        id: '2m-5',
        stepNumber: 5,
        title: 'Resume & Direct Contact',
        subtitle: 'Credentials & Immediate Connection',
        highlightText:
          'Download official curriculum vitae or initiate a direct collaboration conversation.',
        bullets: [
          'Direct PDF Resume available in verified viewer',
          'Open for high-impact AI/Full-Stack roles and challenging engineering projects',
          'Fast response via Contact dialog',
        ],
        targetAppId: 'resume',
        actionLabel: 'Open Resume',
      },
    ],
  },
  '5min': {
    id: '5min',
    label: '5 Minutes',
    estimatedTime: '~5 Minutes',
    tagline: 'Technical Architecture Walkthrough',
    description: 'Comprehensive technical review examining core AI models, CV pipelines, skills matrix, and all major project builds.',
    steps: [
      {
        id: '5m-1',
        stepNumber: 1,
        title: 'Architectural Philosophy',
        subtitle: 'Engineering Beyond API Wrappers',
        highlightText:
          'Fauzaan designs resilient systems combining custom deep learning models, parameter-efficient fine-tuning, and robust client software.',
        bullets: [
          'Offline-first capability for privacy and zero-latency inference',
          'Computer vision pipelines deployed on real CCTV and video feeds',
          'Seamless mobile interfaces built with Flutter and Dart',
        ],
        targetAppId: 'about',
        actionLabel: 'About Fauzaan',
      },
      {
        id: '5m-2',
        stepNumber: 2,
        title: 'Offline AI Systems (AL-AQL)',
        subtitle: 'Quantization, LoRA & Model Context Protocol',
        highlightText:
          'Engineered a complete offline AI assistant in Flutter powered by quantized TinyLLaMA 1.1B (~590 MB) and local RAG.',
        bullets: [
          '4-bit NF4 quantization reduces model memory by ~85%',
          'LoRA fine-tuning updates ~0.13% parameters with custom RLHF loop',
          'Integrated Stable Diffusion, ControlNet, and MCP tool orchestration',
        ],
        targetAppId: 'projects',
        targetProjectId: 'al-aql',
        actionLabel: 'Inspect AL-AQL',
      },
      {
        id: '5m-3',
        stepNumber: 3,
        title: 'Computer Vision & Tracking Pipelines',
        subtitle: 'Football Analyser, Post Office & Classroom Analysers',
        highlightText:
          'Advanced multi-object detection and spatiotemporal tracking applied to sports analytics and operational queues.',
        bullets: [
          'Football Analyser: YOLOv8 + ByteTrack + K-Means color clustering for team assignment',
          'Optical Flow camera motion compensation + homography perspective transformation',
          'Post Office Analyser: Service time estimation, counter occupancy, and queue analytics',
        ],
        targetAppId: 'projects',
        targetProjectId: 'football-analyser',
        actionLabel: 'Inspect Football Analyser',
      },
      {
        id: '5m-4',
        stepNumber: 4,
        title: 'AI Lab & Autonomous Tools',
        subtitle: 'Weaver AI & Generative Workflows',
        highlightText:
          'Generative AI developer tools that transform natural-language requests into full deployed applications.',
        bullets: [
          'Weaver AI: Full-stack code generation with Gemini and automated Vercel deployment',
          'Smart Classroom Assist: Manimator AI explainer animation generation + OCR notes',
          'Blender Automation using Model Context Protocol (MCP)',
        ],
        targetAppId: 'ai-lab',
        actionLabel: 'Launch AI Lab',
      },
      {
        id: '5m-5',
        stepNumber: 5,
        title: 'Technical Skills Matrix',
        subtitle: 'Languages, Frameworks & Deep Learning',
        highlightText:
          'Systematic mastery across programming languages, neural network frameworks, databases, and developer operations.',
        bullets: [
          'Languages: Python, Dart, JavaScript, TypeScript, C++, SQL',
          'AI/ML: PyTorch, TensorFlow, YOLO (v8/v11), OpenCV, Hugging Face, MediaPipe, RAG, ChromaDB',
          'Platforms: Flutter, React, Next.js, Node.js, FastAPI, Git, Netlify, Vercel',
        ],
        targetAppId: 'skills',
        actionLabel: 'Explore Skills Matrix',
      },
      {
        id: '5m-6',
        stepNumber: 6,
        title: 'Accolades & Career Trajectory',
        subtitle: 'Validated Excellence & Professional History',
        highlightText:
          'Consistent record of competitive performance backed by professional backend development experience.',
        bullets: [
          'Smart India Hackathon 2024 Winner (National 1st Place, One Hundred Thousand Indian Rupees / ₹100,000 prize)',
          'NSAKCET HackEnvision 2.0 Best Innovative Idea & Innovator’s Fest 24 Offer',
          'Market Now Senior Backend Developer & Rubat AI Backend Developer Intern',
        ],
        targetAppId: 'timeline',
        actionLabel: 'View Career Timeline',
      },
    ],
  },
};
