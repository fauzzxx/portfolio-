import type { Project } from '../types/project';

export const PROJECTS_DATA: Project[] = [
  // ==========================================
  // WEB DEVELOPMENT (4 projects)
  // ==========================================
  {
    id: 'alpha-omega',
    title: 'Alpha Omega',
    category: 'web-development',
    categoryLabel: 'Web Development',
    tagline: 'Modern Fashion & Apparel E-Commerce Platform',
    shortDescription: 'Modern e-commerce platform for clothing, accessories, and fashion with optimized browsing and secure workflows.',
    description: 'Modern e-commerce platform for clothing, accessories, and fashion. Provides a seamless shopping experience with elegant UI, optimized browsing, secure checkout workflows, product catalog management, responsive design, and optimized performance.',
    capabilities: [
      'Seamless and intuitive shopping experience',
      'Elegant high-contrast UI design',
      'Optimized catalog browsing and item discovery',
      'Secure checkout workflows',
      'Dynamic product catalog management',
      'Responsive design and performance optimization',
    ],
    techStack: [], // Technology details coming soon
    screenshots: [],
    videos: ["/media/video/alpha_omega.mp4"],
    videoUrls: ["/media/video/alpha_omega.mp4"],
    videoUrl: "/media/video/alpha_omega.mp4",
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: true,
    tier: 1,
  },
  {
    id: 'siouge',
    title: 'SIOUGE',
    category: 'web-development',
    categoryLabel: 'Web Development',
    tagline: 'Luxury Perfume E-Commerce Experience',
    shortDescription: 'Luxury perfume e-commerce platform featuring elegant design, smooth interactions, and detailed fragrance showcases.',
    description: 'Luxury perfume e-commerce platform for premium fragrance collections. Features elegant design, smooth interactions, product showcases, detailed fragrance descriptions, category filtering, and responsive layouts.',
    capabilities: [
      'Elegant luxury perfume storefront design',
      'Smooth micro-interactions and transitions',
      'Product showcases with detailed fragrance notes',
      'Collection and fragrance category filtering',
      'Fluid responsive layouts across viewports',
    ],
    techStack: [], // Technology details coming soon
    screenshots: [],
    videos: ["/media/video/siouge.mp4"],
    videoUrls: ["/media/video/siouge.mp4"],
    videoUrl: "/media/video/siouge.mp4",
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: false,
    tier: 2,
  },
  {
    id: 'crestline-capital',
    title: 'Crestline Capital',
    category: 'web-development',
    categoryLabel: 'Web Development',
    tagline: 'Structured Bulk Buying Financial Platform',
    shortDescription: 'Financial platform designed to explain and facilitate structured bulk buying and wholesale property pricing.',
    description: 'Financial platform designed to unlock builder-level pricing through structured bulk buying strategies. Explains how investors and buyers can gain access to wholesale property pricing through structured group purchases and simplifies complex financial models.',
    capabilities: [
      'Structured bulk buying model explanation',
      'Wholesale property pricing workflows',
      'Interactive financial calculations and projections',
      'Enterprise investment interface',
    ],
    techStack: [], // Technology details coming soon
    screenshots: [],
    videos: ["/media/video/crestline_capital.mp4"],
    videoUrls: ["/media/video/crestline_capital.mp4"],
    videoUrl: "/media/video/crestline_capital.mp4",
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: false,
    tier: 2,
  },
  {
    id: 'ammus-pets-kennels',
    title: "Ammu's Pets & Kennels",
    category: 'web-development',
    categoryLabel: 'Web Development',
    tagline: 'Pet Marketplace & Kennel Services Platform',
    shortDescription: 'Online platform for exploring pets, breed details, kennel facilities, and connecting for direct inquiries.',
    description: 'Online platform for buying pets and accessing kennel services. Users can explore available pets, learn about breeds, and connect with the kennel for purchases and inquiries through a clear, responsive interface.',
    capabilities: [
      'Pet marketplace browsing and breed information',
      'Kennel boarding and care service details',
      'Direct purchase and inquiry communication',
      'Responsive and accessible interface',
    ],
    techStack: [], // Technology details coming soon
    screenshots: [],
    videos: ["/media/video/ammus_pets_and_kennels.mp4"],
    videoUrls: ["/media/video/ammus_pets_and_kennels.mp4"],
    videoUrl: "/media/video/ammus_pets_and_kennels.mp4",
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: false,
    tier: 2,
  },

  // ==========================================
  // AI AUTOMATION & INTELLIGENCE (5 projects)
  // ==========================================
  {
    id: 'post-office-analyzer',
    title: 'Post Office Analyser',
    category: 'ai-automation',
    categoryLabel: 'AI Automation & Intelligence',
    tagline: 'Computer Vision & Queue Flow Analytics',
    shortDescription: 'Vision-based analysis system using camera feeds to monitor customer flow, counter occupancy, and operational performance.',
    description: 'Vision-based analysis system for post offices that uses camera/video feeds to monitor customer flow and operational performance. The public demonstration focuses on counter busy/idle status, customers served, average service time, customer detection, queue analytics, counter occupancy, customer flow analysis, and CCTV/video analytics.',
    capabilities: [
      'Counter busy/idle status detection',
      'Customers served count and tracking',
      'Average service-time estimation',
      'Customer detection and queue analytics',
      'Counter occupancy monitoring',
      'Customer flow analysis',
      'CCTV and video feed analytics',
    ],
    techStack: [
      'Python',
      'YOLO',
      'OpenCV',
      'Computer Vision',
      'Queue Analytics',
      'Object Detection',
      'Customer Flow Analysis',
      'CCTV Video Analytics',
    ],
    screenshots: [],
    videos: ["/media/video/postoffice_analyser.mp4"],
    videoUrls: ["/media/video/postoffice_analyser.mp4"],
    videoUrl: "/media/video/postoffice_analyser.mp4",
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: true,
    tier: 1,
    dnaNodes: [
          {
                "label": "Problem",
                "value": "Long counter queues and unmeasured service times in postal branches"
          },
          {
                "label": "Vision",
                "value": "YOLO-based customer and counter occupancy detection"
          },
          {
                "label": "Pipeline",
                "value": "OpenCV spatial queue zones and tracking"
          },
          {
                "label": "Analytics",
                "value": "Average service time, customer flow, and idle/busy counter ratio"
          }
    ],
    buildTrace: [
          {
                "stage": "INPUT",
                "description": "Post office CCTV video feed."
          },
          {
                "stage": "MODEL",
                "description": "YOLO object detection tuned for customer and counter interaction."
          },
          {
                "stage": "PIPELINE",
                "description": "Spatial zone bounding and customer duration tracking in queue corridors."
          },
          {
                "stage": "PROCESSING",
                "description": "Counter occupancy state machine calculating busy vs idle intervals."
          },
          {
                "stage": "OUTPUT",
                "description": "Real-time dashboard reporting queue length, customers served, and average service time."
          }
    ],
    demonstrates: [
          "CCTV Video Analytics",
          "Queue Corridors & Flow Analysis",
          "Service Time Estimation",
          "Counter Occupancy Detection"
    ],
  },
  {
    id: 'cafe-analyzer',
    title: 'Cafe Analyser',
    category: 'ai-automation',
    categoryLabel: 'AI Automation & Intelligence',
    tagline: 'Computer Vision Analytics for Hospitality & Staff Operations',
    shortDescription: 'Computer-vision system analyzing staff activity, customer flow, table occupancy, and order fulfillment from camera footage.',
    description: 'Computer-vision analytics system for cafe operations that analyzes staff and customer activity from live camera footage. Capabilities include staff vs customer identification, object tracking, cup counting, service-time analysis, employee performance analytics, and live camera/video analytics.',
    capabilities: [
      'Staff vs customer identification',
      'Object tracking',
      'Cup counting',
      'Service-time analysis',
      'Employee performance analytics',
      'Live camera/video analytics',
      'Service-time estimation',
      'Object detection',
    ],
    techStack: [
      'Python',
      'YOLOv8',
      'OpenCV',
      'Object Tracking',
      'Computer Vision',
      'Video Analytics',
      'Staff Performance Analytics',
      'Service-Time Estimation',
      'Object Detection',
    ],
    screenshots: [],
    videos: [],
    videoUrls: [],
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: true,
    tier: 1,
  },
  {
    id: 'rag-document-analyzer',
    title: 'RAG Document Analyzer',
    category: 'ai-automation',
    categoryLabel: 'AI Automation & Intelligence',
    tagline: 'Retrieval-Augmented Generation Q&A Platform',
    shortDescription: 'RAG-based Q&A document analyzer retrieving relevant context from uploaded documents to answer questions in natural language.',
    description: 'RAG-based Q&A document analyzer that allows users to upload documents, ask questions in natural language, retrieve relevant sections, and generate answers based on the supplied knowledge.',
    capabilities: [
      'Document upload and parsing',
      'Natural-language question answering',
      'Semantic chunk retrieval from source documents',
      'Knowledge-grounded answer generation',
      'Vector indexing and low-latency search',
    ],
    techStack: ['RAG', 'LlamaIndex', 'ChromaDB'],
    screenshots: [],
    videos: ["/media/video/rag_document_analyzer.mp4"],
    videoUrls: ["/media/video/rag_document_analyzer.mp4"],
    videoUrl: "/media/video/rag_document_analyzer.mp4",
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: false,
    tier: 2,
  },
  {
    id: 'weaver-ai',
    title: 'Weaver AI',
    category: 'ai-automation',
    categoryLabel: 'AI Automation & Intelligence',
    tagline: 'Generative AI Web Application & AI Website Builder',
    shortDescription: 'Transforms natural-language ideas into structured, runnable web applications with multimodal input, versioning, automated Vercel deployment, and voice agents.',
    description: 'A generative AI web application and AI website builder that transforms natural-language ideas into structured, runnable web applications. The system can generate frontend code, generate backend code, generate application structures, use multimodal input such as reference screenshots/images, provide live previews, refine generated applications, support project versioning, rollback changes, automate deployment, deploy applications through Vercel, and provide a voice-agent layer through phone interactions.',
    capabilities: [
      'Generate frontend and backend code',
      'Generate complete application structures',
      'Multimodal input support (reference screenshots/images)',
      'Live application previews and interactive refinement',
      'Project versioning and rollback changes',
      'Automated deployment through Vercel API',
      'Voice-agent layer through phone interactions',
    ],
    techStack: [
      'Python',
      'FastAPI',
      'Google Gemini',
      'HTML',
      'CSS',
      'JavaScript',
      'SQLite',
      'Uvicorn',
      'Multimodal LLMs',
      'AI Code Generation',
      'Prompt Engineering',
      'Automated Code Generation',
      'Project Versioning',
      'AI-powered Deployment',
      'Python Virtual Environments',
      'Vercel API',
      'Twilio',
      'Deepgram',
      'Twilio Media Streams',
      'Deepgram Aura TTS',
      'ngrok',
    ],
    screenshots: [],
    videos: ["/media/video/weaver_1.mp4", "/media/video/weaver_2.mp4"],
    videoUrls: ["/media/video/weaver_1.mp4", "/media/video/weaver_2.mp4"],
    videoUrl: "/media/video/weaver_1.mp4",
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: true,
    tier: 1,
    dnaNodes: [
          {
                "label": "Problem",
                "value": "Manual and repetitive full-stack web development workflows"
          },
          {
                "label": "Engine",
                "value": "Google Gemini generative intelligence"
          },
          {
                "label": "Backend",
                "value": "FastAPI orchestration backend"
          },
          {
                "label": "Frontend",
                "value": "Next.js interactive builder application"
          },
          {
                "label": "Sandbox",
                "value": "Virtual file tree and component synthesis container"
          },
          {
                "label": "Deployment",
                "value": "Automated direct-to-cloud Vercel deployment pipeline"
          }
    ],
    buildTrace: [
          {
                "stage": "INPUT",
                "description": "Natural language application specification and layout prompts."
          },
          {
                "stage": "MODEL",
                "description": "Gemini generative models specialized for code synthesis and dependency resolution."
          },
          {
                "stage": "PIPELINE",
                "description": "FastAPI backend orchestrating multi-step component and styling file trees."
          },
          {
                "stage": "PROCESSING",
                "description": "Real-time sandbox syntax validation and live iframe preview rendering."
          },
          {
                "stage": "OUTPUT",
                "description": "Instant preview and single-click automated deployment to Vercel production."
          }
    ],
    demonstrates: [
          "Full-Stack AI Code Generation",
          "FastAPI Backend Microservice Architecture",
          "Next.js Dynamic Builder Interface",
          "Automated Cloud Deployment via Vercel API",
          "Real-Time Virtual Sandbox Execution"
    ],
    motivation: "Built to empower builders to go from natural-language concept to live, production-deployed web applications in minutes.",
  },
  {
    id: 'marketnow',
    title: 'MarketNOW',
    category: 'ai-automation',
    categoryLabel: 'AI Automation & Intelligence',
    tagline: 'AI-Powered SEO & Generative Engine Optimization Platform',
    shortDescription: 'AI-powered SEO and Generative Engine Optimization (GEO) platform improving visibility across search engines and AI assistants.',
    description: 'AI-powered SEO and Generative Engine Optimization platform designed to improve business visibility across traditional search engines and AI-powered search systems. Capabilities include technical SEO auditing, keyword research, rank tracking, backlink analysis, AI visibility tracking, AI citation tracking, local SEO, content optimization, lead intelligence, email campaigns, AI recommendations, and unified analytics/dashboard workflows.',
    capabilities: [
      'Technical SEO auditing and health monitoring',
      'Keyword research and rank tracking',
      'Backlink analysis and authority metrics',
      'AI visibility tracking across leading LLMs',
      'AI citation tracking (ChatGPT, Perplexity, Gemini, Claude)',
      'Local SEO and content optimization intelligence',
      'Lead intelligence and automated email campaigns',
      'AI recommendations and unified dashboard workflows',
    ],
    techStack: [], // Technology details coming soon
    screenshots: [],
    videos: ["/media/video/marketnow.mp4"],
    videoUrls: ["/media/video/marketnow.mp4"],
    videoUrl: "/media/video/marketnow.mp4",
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: true,
    tier: 1,
  },

  // ==========================================
  // APP DEVELOPMENT (9 projects)
  // ==========================================
  {
    id: 'routex-capital',
    title: 'RouteX Capital',
    category: 'app-development',
    categoryLabel: 'App Development',
    tagline: 'AI-Powered Cross-Border Financial Intelligence Platform',
    shortDescription: 'Cross-border financial intelligence platform evaluating cost-efficient routing corridors, tax evasion risk, and global financial news.',
    description: 'AI-powered cross-border financial intelligence platform designed to analyze and optimize international financial transactions. The system simulates financial institutions evaluating safer and more cost-efficient routes for international transactions. Capabilities include financial route analysis, international transaction analysis, tax-evasion risk prediction, global financial news aggregation, AI risk analysis, optimal route calculation, interactive financial route visualization, and a Flutter application interface.',
    capabilities: [
      'Financial route analysis and optimization',
      'International transaction analysis',
      'Tax-evasion risk prediction',
      'Global financial news aggregation',
      'AI risk analysis and corridor scoring',
      'Optimal route calculation',
      'Interactive financial route visualization',
      'Flutter application interface',
    ],
    techStack: [
      'Flutter',
      'Dart',
      'Gemini 2.5 Flash',
      'AI Risk Analysis',
      'Financial Route Optimization',
    ],
    screenshots: [],
    videos: ["/media/video/routex_capital.mp4"],
    videoUrls: ["/media/video/routex_capital.mp4"],
    videoUrl: "/media/video/routex_capital.mp4",
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: true,
    tier: 1,
    dnaNodes: [
          {
                "label": "Problem",
                "value": "Risk and hidden fee inefficiencies in cross-border financial transactions"
          },
          {
                "label": "Intelligence",
                "value": "Google Gemini 2.5 Flash risk assessment engine"
          },
          {
                "label": "Evaluation",
                "value": "Tax evasion risk score and corridor cost optimization"
          },
          {
                "label": "Interface",
                "value": "Interactive route visualizer in Flutter"
          }
    ],
    buildTrace: [
          {
                "stage": "INPUT",
                "description": "Transaction parameters: origin, destination, asset class, volume."
          },
          {
                "stage": "MODEL",
                "description": "Gemini 2.5 Flash evaluating financial corridor news and regulatory risk."
          },
          {
                "stage": "PIPELINE",
                "description": "Corridor scoring algorithm balancing fee overhead, regulatory tax risk, and speed."
          },
          {
                "stage": "PROCESSING",
                "description": "Dynamic route calculation across alternative international hubs."
          },
          {
                "stage": "OUTPUT",
                "description": "Interactive financial route visualization and risk rating report."
          }
    ],
    demonstrates: [
          "Financial Route Optimization",
          "Tax Evasion Risk Scoring",
          "Cross-Border Transaction Modeling",
          "Flutter Interactive Financial Dashboard"
    ],
  },
  {
    id: 'smart-classroom-assist',
    title: 'Smart Classroom Assist',
    category: 'app-development',
    categoryLabel: 'App Development',
    tagline: 'End-to-End Classroom AI Platform & Education Tools',
    shortDescription: 'Classroom AI platform combining YOLOv11 attendance tracking, gesture board capture, OCR-to-notes, and Manimator animated explanations.',
    description: 'End-to-end classroom AI platform combining computer vision, mobile application development, OCR, generative AI, and AI-powered educational tools. Capabilities include automated attendance, YOLOv11 classroom/student detection, classroom monitoring, gesture-based board capture, OCR-to-notes pipeline, AI question analysis, AI explanations, Manimator AI explainer-video generation, Manim animation generation, text-to-speech, and classroom assistance.',
    capabilities: [
      'Automated attendance',
      'YOLOv11 classroom/student detection',
      'Classroom monitoring',
      'Gesture-based board capture',
      'OCR-to-notes pipeline',
      'AI question analysis',
      'AI explanations',
      'Manimator AI explainer-video generation',
      'Manim animation generation',
      'Text-to-speech',
      'Classroom assistance',
    ],
    techStack: [
      'Flutter',
      'Dart',
      'Python',
      'YOLOv11',
      'OpenCV',
      'MediaPipe',
      'EasyOCR',
      'Tesseract OCR',
      'Google Gemini',
      'REST APIs',
      'Netlify',
    ],
    liveUrl: 'https://smart-classroom-assist.netlify.app/',
    liveDemoUrl: 'https://smart-classroom-assist.netlify.app/',
    screenshots: [],
    videos: ["/media/video/smart_classroom_assist.mp4"],
    videoUrls: ["/media/video/smart_classroom_assist.mp4"],
    videoUrl: "/media/video/smart_classroom_assist.mp4",
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: true,
    tier: 1,
    dnaNodes: [
          {
                "label": "Problem",
                "value": "Manual classroom attendance taking, note summarization, and concept explanation"
          },
          {
                "label": "Vision",
                "value": "YOLOv11 student detection and attendance verification"
          },
          {
                "label": "Gesture",
                "value": "MediaPipe hand gesture board capture"
          },
          {
                "label": "Extraction",
                "value": "EasyOCR & Tesseract blackboard-to-notes transcription"
          },
          {
                "label": "Generation",
                "value": "Google Gemini explanation analysis + Manimator animation generation"
          },
          {
                "label": "Interface",
                "value": "Flutter cross-platform application"
          }
    ],
    buildTrace: [
          {
                "stage": "INPUT",
                "description": "Classroom camera feed, blackboard photo, or student question."
          },
          {
                "stage": "MODEL",
                "description": "YOLOv11 for student detection and Gemini for educational intelligence."
          },
          {
                "stage": "PIPELINE",
                "description": "OCR extraction of chalkboard handwriting and gesture detection."
          },
          {
                "stage": "PROCESSING",
                "description": "Automated attendance logging, notes synthesis, and Manim code generation."
          },
          {
                "stage": "OUTPUT",
                "description": "Exported structured notes, attendance records, and animated explainer videos."
          }
    ],
    demonstrates: [
          "YOLOv11 Computer Vision Detection",
          "Automated Classroom Attendance Tracking",
          "Gesture Recognition via MediaPipe",
          "OCR Handwriting-to-Notes Pipeline",
          "Manim & Manimator Mathematical Explainer Animation",
          "Full-Stack Flutter App Deployment"
    ],
    motivation: "Created for Smart India Hackathon 2024 to automate administrative classroom friction and deliver interactive visual learning tools for students.",
  },
  {
    id: 'al-aql',
    title: 'AL-AQL',
    category: 'app-development',
    categoryLabel: 'App Development',
    tagline: 'Fully Offline Multimodal AI Personal Assistant',
    shortDescription: 'Fully offline multimodal AI personal assistant built with Flutter, quantized TinyLLaMA 1.1B (4-bit NF4), LoRA, RAG, Stable Diffusion, and MCP.',
    description: 'Fully offline multimodal AI personal assistant built as a Flutter application. The system combines a local language model, retrieval-augmented generation, parameter-efficient fine-tuning, reinforcement learning feedback, offline image generation, controlled image generation, and an MCP-based automation agent. TinyLLaMA 1.1B is quantized to 4-bit NF4, reducing the model size from approximately 4.1 GB to approximately 590 MB, and LoRA fine-tuning updates approximately 0.13% of the parameters.',
    capabilities: [
      'Fully offline AI assistance',
      'Local text generation',
      'Multimodal AI',
      'RAG document retrieval',
      'Document question answering',
      'LoRA fine-tuning (~0.13% parameter updates)',
      'Custom RLHF feedback loop',
      'Stable Diffusion image generation',
      'ControlNet-controlled image generation',
      'WhatsApp automation through MCP',
      'LangChain-based automation',
      'TinyLLaMA 1.1B quantized from 4.1 GB to ~590 MB',
    ],
    techStack: [
      'Flutter',
      'Dart',
      'Python',
      'TinyLLaMA 1.1B',
      '4-bit NF4',
      'LoRA',
      'RAG',
      'LlamaIndex',
      'ChromaDB',
      'Hugging Face',
      'Sentence Transformers',
      'llama.cpp',
      'Custom RLHF',
      'Stable Diffusion',
      'ControlNet',
      'Streamlit',
      'SQLite',
      'MCP',
      'LangChain',
    ],
    screenshots: [],
    videos: ["/media/video/al_aql_1.mp4", "/media/video/al_aql_2.mp4"],
    videoUrls: ["/media/video/al_aql_1.mp4", "/media/video/al_aql_2.mp4"],
    videoUrl: "/media/video/al_aql_1.mp4",
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: true,
    tier: 1,
    dnaNodes: [
          {
                "label": "Problem",
                "value": "Offline AI assistance & zero-cloud execution"
          },
          {
                "label": "Core",
                "value": "TinyLLaMA 1.1B"
          },
          {
                "label": "Quantization",
                "value": "4-bit NF4 (~4.1 GB to ~590 MB)"
          },
          {
                "label": "Fine-tuning",
                "value": "LoRA (~0.13% parameters updated)"
          },
          {
                "label": "Retrieval",
                "value": "RAG + LlamaIndex + ChromaDB"
          },
          {
                "label": "Feedback",
                "value": "Custom RLHF feedback loop"
          },
          {
                "label": "Image Gen",
                "value": "Stable Diffusion + ControlNet"
          },
          {
                "label": "Automation",
                "value": "MCP + LangChain tool orchestration"
          },
          {
                "label": "Client",
                "value": "Flutter cross-platform mobile interface"
          }
    ],
    buildTrace: [
          {
                "stage": "INPUT",
                "description": "Local document uploads, user prompt queries, and multimodal image requests."
          },
          {
                "stage": "MODEL",
                "description": "Quantized TinyLLaMA 1.1B loaded via llama.cpp with LoRA parameter-efficient weights."
          },
          {
                "stage": "PIPELINE",
                "description": "ChromaDB vector retrieval with LlamaIndex embedding pipeline for context grounding."
          },
          {
                "stage": "PROCESSING",
                "description": "Local inference execution with RLHF feedback verification and MCP tool calls."
          },
          {
                "stage": "OUTPUT",
                "description": "Streaming text responses, synthesized images, and device automation in Flutter UI."
          }
    ],
    demonstrates: [
          "Offline AI & Zero-Cloud Inference",
          "Local LLM 4-bit NF4 Quantization",
          "Retrieval-Augmented Generation (RAG)",
          "Parameter-Efficient Fine-Tuning (LoRA)",
          "Custom Reinforcement Learning Feedback (RLHF)",
          "Stable Diffusion & ControlNet Image Generation",
          "Model Context Protocol (MCP) & LangChain Automation",
          "Cross-Platform Flutter Client Engineering"
    ],
    motivation: "Engineered to deliver high-capability multimodal AI without cloud dependency, preserving complete data privacy and operating seamlessly on local hardware.",
  },
  {
    id: 'offline-ai-chatbot',
    title: 'Offline AI Chatbot',
    category: 'app-development',
    categoryLabel: 'App Development',
    tagline: 'Offline Document Intelligence & Local Q&A',
    shortDescription: 'Offline ChatGPT-like chatbot with document intelligence for private on-device document querying.',
    description: 'Offline ChatGPT-like chatbot with document intelligence. Users can upload documents, ask natural-language questions, retrieve relevant document sections, and generate responses based on local knowledge.',
    capabilities: [
      'Upload documents locally',
      'Ask natural-language questions',
      'Retrieve relevant document sections',
      'Generate responses based on local knowledge',
      '100% private and on-device execution',
    ],
    techStack: ['Python', 'LangChain', 'ChromaDB', 'LlamaIndex', 'Local LLM', 'RAG'],
    screenshots: [],
    videos: ["/media/video/rag_document_analyzer.mp4"],
    videoUrls: ["/media/video/rag_document_analyzer.mp4"],
    videoUrl: "/media/video/rag_document_analyzer.mp4",
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: false,
    tier: 2,
  },
  {
    id: 'mahdaviat',
    title: 'Mahdaviat',
    category: 'app-development',
    categoryLabel: 'App Development',
    tagline: 'Islamic Knowledge, Spiritual Guidance & Community Platform',
    shortDescription: 'Digital platform uniting accurate Namaz timings, Masjid locators, lectures, classical texts, eLibrary, and community announcements.',
    description: 'Mahdaviat is designed to help users stay connected with authentic Islamic knowledge, spiritual guidance, and community updates through a simple and peaceful digital platform. Capabilities include accurate Namaz timings, nearby Masjid and Dairah information, Bayans and Islamic lectures, Hadith, Quran, Naqliyat, Seerat, Islamic reminders, daily inspiration, eLibrary, community announcements, events, and useful services and information.',
    capabilities: [
      'Accurate Namaz timings',
      'Nearby Masjid and Dairah information',
      'Bayans and Islamic lectures',
      'Hadith, Quran, Naqliyat, and Seerat resources',
      'Islamic reminders and daily inspiration',
      'eLibrary with classical literature',
      'Community announcements and events',
      'Useful community services and information',
    ],
    techStack: [], // Technology details coming soon
    screenshots: [],
    videos: ["/media/video/mahdaviat.mp4"],
    videoUrls: ["/media/video/mahdaviat.mp4"],
    videoUrl: "/media/video/mahdaviat.mp4",
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: false,
    tier: 2,
  },
  {
    id: 'patrolpro',
    title: 'PatrolPro',
    category: 'app-development',
    categoryLabel: 'App Development',
    tagline: 'Smart-City Infrastructure & Safety Monitoring System',
    shortDescription: "Smart-city monitoring system detecting potholes, waste, human-animal conflict, and women's safety with automated authority alerts.",
    description: "AI-powered smart-city infrastructure and safety monitoring system. The system uses computer vision to detect and monitor potholes, garbage/waste, human-animal conflicts, and women's safety scenarios. It provides an end-to-end monitoring workflow with authority alerts and a Flutter application.",
    capabilities: [
      'Object detection',
      'Smart-city monitoring',
      'Pothole detection',
      'Waste detection',
      'Human-animal conflict detection',
      "Women's safety monitoring",
      'Automated authority alerts',
      'Camera/image-based monitoring',
      'Flutter mobile application workflow',
    ],
    techStack: [
      'Python',
      'YOLO',
      'OpenCV',
      'Flask',
      'Flutter',
      'Dart',
      'Twilio',
      'Netlify',
      'Random Forest',
    ],
    liveUrl: 'https://patrolpro-wastemanagement.netlify.app/',
    liveDemoUrl: 'https://patrolpro-wastemanagement.netlify.app/',
    screenshots: [],
    videos: [],
    videoUrls: [],
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: true,
    tier: 1,
    dnaNodes: [
          {
                "label": "Problem",
                "value": "Civic waste accumulation and inefficient municipal patrol response"
          },
          {
                "label": "Detection",
                "value": "YOLO garbage and civic violation detection"
          },
          {
                "label": "Risk",
                "value": "Random Forest hazard severity predictor"
          },
          {
                "label": "Notification",
                "value": "Twilio automated SMS alerting"
          },
          {
                "label": "Platform",
                "value": "Flutter mobile inspection tool"
          }
    ],
    buildTrace: [
          {
                "stage": "INPUT",
                "description": "Mobile camera feed from field inspection vehicle or inspector."
          },
          {
                "stage": "MODEL",
                "description": "YOLO model detecting waste accumulation and road hazards."
          },
          {
                "stage": "PIPELINE",
                "description": "GPS geofencing combined with Random Forest severity scoring."
          },
          {
                "stage": "PROCESSING",
                "description": "Automated alert generation and incident ticket creation."
          },
          {
                "stage": "OUTPUT",
                "description": "Twilio dispatch notification and live Netlify management dashboard."
          }
    ],
    demonstrates: [
          "Computer Vision Civic Monitoring",
          "Random Forest Machine Learning Risk Scoring",
          "Automated Alert Dispatch via Twilio",
          "Cross-Platform Field Tool in Flutter"
    ],
  },
  {
    id: 'classroom-analyser',
    title: 'Classroom Analyser',
    category: 'app-development',
    categoryLabel: 'App Development',
    tagline: 'CCTV Classroom Activity Analysis System',
    shortDescription: 'CCTV-based classroom activity analysis system detecting student activities such as working, phone use, and sleeping via custom YOLO.',
    description: 'Computer-vision classroom activity analysis system designed to analyze CCTV/classroom footage and identify student activities. The system detects activities including working, mobile-phone use, and sleeping. It provides classroom activity analytics through computer vision and custom-trained object detection.',
    capabilities: [
      'CCTV and classroom footage analysis',
      'Working activity detection',
      'Mobile-phone use detection',
      'Sleeping detection',
      'Custom-trained YOLO object detection',
      'Classroom behavior and attentiveness reporting',
    ],
    techStack: [
      'Python 3.11',
      'YOLO',
      'OpenCV',
      'PyTorch',
      'Custom YOLO',
      'YAML dataset configuration',
      'YOLO inference',
      'Computer Vision',
      'Deep Learning',
      'Activity Recognition',
      'CCTV Video Analytics',
    ],
    screenshots: [],
    videos: ["/media/video/classroom_analyser.mp4"],
    videoUrls: ["/media/video/classroom_analyser.mp4"],
    videoUrl: "/media/video/classroom_analyser.mp4",
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: false,
    tier: 2,
    dnaNodes: [
          {
                "label": "Problem",
                "value": "Measuring student attentiveness and classroom dynamics without manual monitoring"
          },
          {
                "label": "Model",
                "value": "Custom-trained YOLO activity classification"
          },
          {
                "label": "Categories",
                "value": "Working, mobile-phone use, sleeping detection"
          },
          {
                "label": "Pipeline",
                "value": "OpenCV frame sampling and bounding box evaluation"
          }
    ],
    buildTrace: [
          {
                "stage": "INPUT",
                "description": "High-angle classroom camera footage."
          },
          {
                "stage": "MODEL",
                "description": "Custom-trained YOLO model trained on student posture datasets."
          },
          {
                "stage": "PIPELINE",
                "description": "Continuous frame processing with bounding box confidence thresholding."
          },
          {
                "stage": "PROCESSING",
                "description": "Temporal smoothing of detected activity states."
          },
          {
                "stage": "OUTPUT",
                "description": "Classroom engagement timeline, attentiveness ratio, and distraction flags."
          }
    ],
    demonstrates: [
          "Custom YOLO Deep Learning Model Training",
          "Activity Recognition (Working, Phone Use, Sleeping)",
          "Video Stream Inference with PyTorch & OpenCV"
    ],
  },
  {
    id: 'football-analyser',
    title: 'Football Analyser',
    category: 'app-development',
    categoryLabel: 'App Development',
    tagline: 'AI-Powered Football Match Analytics & Multi-Object Tracking',
    shortDescription: 'Football match analytics system tracking players, referees, and ball with ByteTrack, jersey clustering, speed estimation, and pitch perspective transform.',
    description: 'AI-powered football match analytics system that tracks players, referees, and the ball while assigning players to teams and calculating match statistics. Capabilities include player detection, ball detection, referee detection, multi-object tracking, team assignment, jersey-color clustering, ball possession analysis, player speed estimation, player distance estimation, camera-motion compensation, perspective transformation, and sports analytics.',
    capabilities: [
      'Player detection',
      'Ball detection',
      'Referee detection',
      'Multi-object tracking',
      'Team assignment',
      'Jersey-color clustering',
      'Ball possession analysis',
      'Player speed estimation',
      'Player distance estimation',
      'Camera-motion compensation',
      'Perspective transformation',
      'Sports analytics',
    ],
    techStack: [
      'Python',
      'YOLO',
      'ByteTrack',
      'OpenCV',
      'K-Means Clustering',
      'Optical Flow',
      'Perspective Transformation',
      'Computer Vision',
      'Object Detection',
      'Multi-Object Tracking',
      'Sports Analytics',
      'Matplotlib',
    ],
    screenshots: [],
    videos: ["/media/video/football_analyser.mp4"],
    videoUrls: ["/media/video/football_analyser.mp4"],
    videoUrl: "/media/video/football_analyser.mp4",
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: true,
    tier: 1,
    dnaNodes: [
          {
                "label": "Problem",
                "value": "Automating match analytics and player spatial tracking from broadcast video"
          },
          {
                "label": "Detection",
                "value": "YOLO object detection for players, ball, and referee"
          },
          {
                "label": "Tracking",
                "value": "ByteTrack multi-object temporal identity preservation"
          },
          {
                "label": "Clustering",
                "value": "K-Means pixel clustering on player jerseys for team classification"
          },
          {
                "label": "Homography",
                "value": "Optical Flow camera motion compensation + Perspective Transformation"
          },
          {
                "label": "Analytics",
                "value": "Player speed, ball possession, and spatial heatmaps"
          }
    ],
    buildTrace: [
          {
                "stage": "INPUT",
                "description": "Raw broadcast football match video footage."
          },
          {
                "stage": "MODEL",
                "description": "Custom-trained YOLO detection network for soccer pitch entities."
          },
          {
                "stage": "PIPELINE",
                "description": "ByteTrack tracker associating bounding boxes across frames with optical flow compensation."
          },
          {
                "stage": "PROCESSING",
                "description": "K-Means jersey color clustering and homography mapping to 2D pitch coordinates."
          },
          {
                "stage": "OUTPUT",
                "description": "Overlay annotations, ball possession metrics, and player speed/distance statistics."
          }
    ],
    demonstrates: [
          "YOLO Deep Learning Object Detection",
          "ByteTrack Multi-Object Tracking",
          "K-Means Jersey Color Clustering",
          "Optical Flow Camera Motion Compensation",
          "Perspective Transformation & Homography",
          "Automated Sports Analytics Calculation"
    ],
    motivation: "Built to bring professional computer-vision tracking and tactical sports analytics to standard broadcast video streams.",
  },
  {
    id: 'money-mapper',
    title: 'Money Mapper',
    category: 'app-development',
    categoryLabel: 'App Development',
    tagline: 'Personal Finance Mapping Tool',
    shortDescription: 'Personal finance mapping tool designed to visualize and track cashflow and expenditures.',
    description: 'A personal finance mapping tool designed to visualize and track where money goes. Helps users categorize expenditures, map cashflow pathways, and gain clear visibility into personal spending habits.',
    capabilities: [
      'Personal finance tracking and mapping',
      'Cashflow visualization',
      'Expense categorization',
      'Clear financial overview dashboards',
    ],
    techStack: [
      'Finance',
      'Data Visualization',
      'Tools',
    ],
    liveUrl: 'https://money-mapper-datanyx.netlify.app/',
    liveDemoUrl: 'https://money-mapper-datanyx.netlify.app/',
    screenshots: [],
    videos: [],
    videoUrls: [],
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: false,
    tier: 2,
  },

  // ==========================================
  // EXPERIMENTS (4 projects)
  // ==========================================
  {
    id: 'ai-drawing-challenge',
    title: 'AI Drawing Challenge',
    category: 'experiments',
    categoryLabel: 'Experiments',
    tagline: 'Interactive Real-Time Sketch Recognition',
    shortDescription: 'Interactive experiment challenging users to draw sketches evaluated in real-time by a neural classifier.',
    description: 'An interactive browser experiment where a neural network guesses doodles and sketches in real time, exploring prompt latency, user engagement, and stroke classification.',
    capabilities: [
      'Real-time vector stroke classification',
      'Fast inference and immediate feedback loops',
      'Interactive browser doodle canvas',
    ],
    techStack: [
      'Machine Learning',
      'Computer Vision',
    ],
    screenshots: [],
    videos: [],
    videoUrls: [],
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: false,
    tier: 3,
  },
  {
    id: 'blender-automation-mcp',
    title: 'Blender Automation using MCP',
    category: 'experiments',
    categoryLabel: 'Experiments',
    tagline: 'Agentic 3D Scene Generation via Model Context Protocol',
    shortDescription: 'Bridging LLM agentic tool calls to the Blender Python API for automated 3D modeling and lighting via Model Context Protocol.',
    description: 'Experiment linking language models to Blender through an MCP server, allowing procedural generation of materials, lighting, and geometric primitives via text prompts.',
    capabilities: [
      'Model Context Protocol integration with 3D DCC software',
      'Prompt-driven procedural scene creation and camera control',
      'Automated 3D rendering pipeline',
    ],
    techStack: [
      'MCP',
      'Python',
      'Blender',
    ],
    screenshots: [],
    videos: [],
    videoUrls: [],
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: false,
    tier: 3,
  },
  {
    id: 'whack-a-mole',
    title: 'Whack-a-Mole',
    category: 'experiments',
    categoryLabel: 'Experiments',
    tagline: 'Interactive Timing & Reactive Mechanics Experiment',
    shortDescription: 'Classic arcade mechanics recreated to experiment with responsive input polling and physics.',
    description: 'A playful interactive arcade experiment examining timing, event-loop responsiveness, input polling, and state-driven animations.',
    capabilities: [
      'Reactive micro-animations',
      'Dynamic scoring and difficulty ramps',
      'Event loop timing calibration',
    ],
    techStack: [
      'JavaScript',
    ],
    screenshots: [],
    videos: [],
    videoUrls: [],
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: false,
    tier: 3,
  },
  {
    id: 'blinker-word',
    title: 'Blinker Word',
    category: 'experiments',
    categoryLabel: 'Experiments',
    tagline: 'Rapid Serial Visual Presentation Experiment',
    shortDescription: 'Speed-reading and visual recognition prototype testing ocular pacing and cognitive retention.',
    description: 'An experiment in rapid serial visual presentation (RSVP), optimizing text flash speed, ocular pacing, and focal alignment for accelerated reading speed.',
    capabilities: [
      'Adjustable WPM presentation rates',
      'Visual fixation point alignment',
      'Paced perceptual reading trials',
    ],
    techStack: [
      'Frontend',
    ],
    screenshots: [],
    videos: [],
    videoUrls: [],
    challenges: [],
    outcomes: [],
    lessons: [],
    featured: false,
    tier: 3,
  },
];
