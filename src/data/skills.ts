import type { SkillCategoryGroup } from '../types/skill';

export const SKILLS_DATA: SkillCategoryGroup[] = [
  {
    id: 'core-ai',
    title: 'Core AI Areas',
    description: 'Foundational specializations in machine perception and intelligent systems',
    skills: [
      {
        name: 'Computer Vision',
        connectedProjects: [
          'post-office-analyzer',
          'cafe-analyzer',
          'smart-classroom-assist',
          'classroom-analyser',
          'football-analyser',
          'patrolpro',
          'ai-drawing-challenge',
        ],
      },
      {
        name: 'Object Detection & Tracking',
        connectedProjects: [
          'post-office-analyzer',
          'cafe-analyzer',
          'smart-classroom-assist',
          'classroom-analyser',
          'football-analyser',
          'patrolpro',
        ],
      },
      {
        name: 'Real-time AI Systems',
        connectedProjects: [
          'post-office-analyzer',
          'cafe-analyzer',
          'smart-classroom-assist',
          'football-analyser',
        ],
      },
      { name: 'NLP' },
      {
        name: 'Multimodal AI',
        connectedProjects: ['al-aql', 'weaver-ai', 'smart-classroom-assist'],
      },
      {
        name: 'On-device Inference',
        connectedProjects: ['al-aql', 'offline-ai-chatbot'],
      },
    ],
  },
  {
    id: 'ml-dl',
    title: 'ML / DL Frameworks',
    description: 'Deep neural network training and edge inference libraries',
    skills: [
      {
        name: 'YOLO',
        connectedProjects: [
          'post-office-analyzer',
          'cafe-analyzer',
          'smart-classroom-assist',
          'classroom-analyser',
          'football-analyser',
          'patrolpro',
        ],
      },
      {
        name: 'OpenCV',
        connectedProjects: [
          'post-office-analyzer',
          'cafe-analyzer',
          'smart-classroom-assist',
          'classroom-analyser',
          'football-analyser',
          'patrolpro',
        ],
      },
      {
        name: 'PyTorch',
        connectedProjects: ['classroom-analyser'],
      },
      { name: 'TensorFlow' },
      {
        name: 'MediaPipe',
        connectedProjects: ['smart-classroom-assist'],
      },
      {
        name: 'ByteTrack',
        connectedProjects: ['football-analyser'],
      },
      { name: 'Scikit-learn' },
      {
        name: 'Random Forest',
        connectedProjects: ['patrolpro'],
      },
      {
        name: 'Hugging Face',
        connectedProjects: ['al-aql'],
      },
    ],
  },
  {
    id: 'gen-ai',
    title: 'Generative AI & LLMs',
    description: 'Foundation model integration, fine-tuning, and alignment',
    skills: [
      {
        name: 'Gemini API',
        connectedProjects: ['weaver-ai', 'smart-classroom-assist', 'routex-capital'],
      },
      {
        name: 'TinyLLaMA',
        connectedProjects: ['al-aql'],
      },
      {
        name: 'LoRA',
        connectedProjects: ['al-aql'],
      },
      {
        name: 'RLHF',
        connectedProjects: ['al-aql'],
      },
      {
        name: 'Stable Diffusion',
        connectedProjects: ['al-aql'],
      },
      {
        name: 'ControlNet',
        connectedProjects: ['al-aql'],
      },
      { name: 'ElevenLabs' },
      { name: 'SFT' },
      { name: 'TRL Trainer' },
    ],
  },
  {
    id: 'retrieval-agents',
    title: 'Retrieval & Agents',
    description: 'Semantic vector indexing and autonomous tool orchestration',
    skills: [
      {
        name: 'RAG',
        connectedProjects: ['rag-document-analyzer', 'al-aql', 'offline-ai-chatbot'],
      },
      {
        name: 'LlamaIndex',
        connectedProjects: ['rag-document-analyzer', 'al-aql'],
      },
      {
        name: 'ChromaDB',
        connectedProjects: ['rag-document-analyzer', 'al-aql'],
      },
      {
        name: 'MCP (Model Context Protocol)',
        connectedProjects: ['al-aql', 'blender-automation-mcp'],
      },
      {
        name: 'LangChain',
        connectedProjects: ['al-aql'],
      },
      { name: 'Groq API' },
    ],
  },
  {
    id: 'languages',
    title: 'Languages',
    description: 'Core programming and scripting languages',
    skills: [
      {
        name: 'Python',
        connectedProjects: [
          'weaver-ai',
          'post-office-analyzer',
          'cafe-analyzer',
          'smart-classroom-assist',
          'classroom-analyser',
          'football-analyser',
          'patrolpro',
          'al-aql',
          'blender-automation-mcp',
        ],
      },
      {
        name: 'Dart',
        connectedProjects: [
          'routex-capital',
          'smart-classroom-assist',
          'al-aql',
          'patrolpro',
        ],
      },
      {
        name: 'JavaScript',
        connectedProjects: ['weaver-ai', 'whack-a-mole'],
      },
      {
        name: 'SQL',
        connectedProjects: ['weaver-ai', 'al-aql'],
      },
    ],
  },
  {
    id: 'backend-apis',
    title: 'Backend & APIs',
    description: 'Distributed servers, real-time protocols, and databases',
    skills: [
      {
        name: 'FastAPI',
        connectedProjects: ['weaver-ai'],
      },
      {
        name: 'Flask',
        connectedProjects: ['patrolpro'],
      },
      {
        name: 'REST APIs',
        connectedProjects: ['weaver-ai', 'smart-classroom-assist'],
      },
      { name: 'WebSockets' },
      {
        name: 'Twilio',
        connectedProjects: ['weaver-ai', 'patrolpro'],
      },
      { name: 'Supabase' },
      {
        name: 'SQLite',
        connectedProjects: ['weaver-ai', 'al-aql'],
      },
      {
        name: 'ngrok',
        connectedProjects: ['weaver-ai'],
      },
      {
        name: 'Deepgram',
        connectedProjects: ['weaver-ai'],
      },
    ],
  },
  {
    id: 'frontend-mobile',
    title: 'Frontend & Mobile',
    description: 'Client interfaces and automation utilities',
    skills: [
      {
        name: 'Flutter',
        connectedProjects: [
          'al-aql',
          'smart-classroom-assist',
          'routex-capital',
          'patrolpro',
        ],
      },
      {
        name: 'Netlify',
        connectedProjects: [
          'smart-classroom-assist',
          'patrolpro',
          'money-mapper',
        ],
      },
      {
        name: 'Streamlit',
        connectedProjects: ['al-aql'],
      },
      { name: 'Gradio' },
      { name: 'PyAutoGUI' },
    ],
  },
  {
    id: 'tools-platforms',
    title: 'Tools & Platforms',
    description: 'Development pipelines, containerization, and data annotation',
    skills: [
      { name: 'Roboflow' },
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Docker' },
      { name: 'Google Colab' },
      { name: 'VS Code' },
    ],
  },
];
