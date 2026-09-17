import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

// Load environment from .env.local if present
function loadEnv() {
  const envLocalPath = path.join(rootDir, '.env.local');
  if (fs.existsSync(envLocalPath)) {
    try {
      process.loadEnvFile(envLocalPath);
    } catch {}
  }
  const envPath = path.join(rootDir, '.env');
  if (fs.existsSync(envPath)) {
    try {
      process.loadEnvFile(envPath);
    } catch {}
  }
}

loadEnv();

export async function generatePresentationScript() {
  console.log('====================================================');
  console.log('  FAUZAAN OS — STEP 2: GEMINI SCRIPT GENERATION');
  console.log('====================================================');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('[ERROR] GEMINI_API_KEY is missing from .env.local');
    console.error('Please add GEMINI_API_KEY to .env.local and retry.');
    process.exit(1);
  }

  const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  console.log(`[GEMINI] Using model: ${modelName}`);

  // 1. Gather Grounded Project Data
  console.log('[GEMINI] Loading portfolio data sources...');
  const projectsContent = fs.readFileSync(path.join(rootDir, 'src/data/projects.ts'), 'utf8');
  const skillsContent = fs.readFileSync(path.join(rootDir, 'src/data/skills.ts'), 'utf8');
  const experienceContent = fs.readFileSync(path.join(rootDir, 'src/data/experience.ts'), 'utf8');
  const achievementsContent = fs.readFileSync(path.join(rootDir, 'src/data/achievements.ts'), 'utf8');

  // Load video analysis summary if available
  let videoSummary = null;
  const summaryPath = path.join(rootDir, '.generated/video-analysis/summary.json');
  if (fs.existsSync(summaryPath)) {
    try {
      videoSummary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
      console.log(`[GEMINI] Loaded video evidence for ${videoSummary.analyzedCount || 0} videos.`);
    } catch (e) {
      console.warn('[WARN] Could not parse video analysis summary:', e.message);
    }
  }

  // Build the strict prompt
  const systemInstruction = `You are writing a portfolio presentation for Fauzaan (Syed Kareem Fauzaan), a Computer Science Engineer specializing in AI, Computer Vision, Machine Learning, and Software Engineering.

CRITICAL IDENTITY & PRIVACY RULES:
- The narrator is Fauzaan. Speak in first-person ("I built...", "I engineered...", "In this project, I...").
- NEVER mention or include: "Affan", "Asif", "Affan Asif", "Affan-Asif", or any external authors/collaborators.
- Sound like Fauzaan explaining his own work to an interviewer or senior engineering leader: technical, natural, confident, thoughtful, articulate.
- Avoid sounding like an advertisement, résumé read aloud, generic AI marketing copy, or buzzword list. Avoid empty clichés ("revolutionary", "game-changing", "cutting-edge").

CRITICAL FACTUALITY RULES:
- Highest authority: Confirmed project data.
- If a project's techStack is empty (e.g., "Technology details coming soon" like Alpha Omega, SIOUGE, Crestline Capital, Ammu's Pets & Kennels): DO NOT INVENT A TECH STACK. Describe only its observable purpose and capabilities.
- When technologies ARE confirmed (e.g., AL-AQL, Weaver AI, Smart Classroom Assist, Football Analyser, Post Office Analyser), ALWAYS explain WHY the technology was chosen and what it does.
  Example style: "The application layer is built with Flutter, while Python handles the computer-vision processing. YOLO performs object detection in the camera feed, while OpenCV handles the underlying spatial queue tracking."
- Never invent unverified performance claims or metrics.

PRESENTATION LENGTH & WORD COUNT:
- Target length: 4 to 5 minutes total (aim for approximately 700 to 800 spoken words across all segments).
- Pacing: ~150 spoken words per minute.

STORY PROGRESSION:
"I started by building robust software products." -> "Then I began making them intelligent." -> "I moved deeper into computer vision, retrieval, offline LLMs, generative pipelines, and edge automation." -> "Those experiments matured into enterprise platforms and winning hackathon solutions." -> "Here is where I am now."

REQUIRED SECTIONS (8 segments):
1. Segment 1: Opening (approx 20s, ~40-50 words)
   - Welcome the visitor to FAUZAAN OS. Introduce core focus: AI, Computer Vision, and Software Engineering.
2. Segment 2: Who Fauzaan Is (approx 25s, ~60-70 words)
   - Computer Science Engineer (Osmania University, GPA 8.32). Engineering philosophy: taking machine perception and local intelligence from research models into functional, reliable products.
3. Segment 3: Web Development Foundation (approx 25s, ~65-75 words)
   - Foundational platforms: Alpha Omega (e-commerce), SIOUGE (luxury perfume showcase), Crestline Capital (structured wholesale property pricing), and Ammu's Pets & Kennels. Emphasize responsive interfaces, state management, and user workflows. (Do NOT invent unconfirmed tech stacks).
4. Segment 4: AI & Computer Vision (approx 50s, ~120-140 words)
   - Vision-driven systems:
     * Post Office Analyser: YOLO object detection + OpenCV spatial corridors for queue analytics, counter occupancy, and customer service time estimation.
     * Football Analyser: YOLO object detection + ByteTrack multi-object tracking + K-Means color clustering for team assignment + Optical Flow and homography for real-time speed, distance, and pitch possession.
     * Cafe Analyser & Classroom Analyser: Computer vision for activity and interaction monitoring.
5. Segment 5: Major AI Products (approx 75s, ~180-210 words)
   - Core showcase systems:
     * AL-AQL: 100% offline multimodal assistant. Flutter frontend + Python/llama.cpp backend. TinyLLaMA 1.1B quantized to 4-bit NF4 (shrinking 4.1GB down to ~590MB for zero-cloud local execution). LoRA parameter-efficient fine-tuning (~0.13% parameters), RAG with LlamaIndex + ChromaDB, Stable Diffusion + ControlNet for offline image generation, and Model Context Protocol (MCP) integrations.
     * Weaver AI: Generative application engine using FastAPI and Gemini to synthesize full-stack web applications from natural language prompts with real-time live preview and code iteration.
     * Smart Classroom Assist: SIH 2024 Winner (One Hundred Thousand Indian Rupees / ₹100,000 national prize). Flutter + Python + YOLOv11 + MediaPipe + OpenCV + Gemini for automated student attendance, lecture board capture, and interactive animations.
     * RouteX Capital & MarketNOW: Financial transaction route analytics and Generative Engine Optimization (GEO) architecture.
6. Segment 6: Application Development & Experiments Montage (approx 45s, ~110-130 words)
   - Systems: Mahdaviat (community digital platform), Offline AI Chatbot, PatrolPro (smart city pothole & animal conflict detection), Money Mapper.
   - Experiments montage: AI Drawing Challenge, Blender Automation using MCP, Whack-a-Mole, Blinker Word.
7. Segment 7: Achievements & Experience (approx 25s, ~60-70 words)
   - Winner of Smart India Hackathon 2024 (premier national hackathon by Ministry of Education & AICTE, One Hundred Thousand Indian Rupees / ₹100,000 cash prize). Senior Backend Developer experience at Market Now, plus B.E. Computer Science and Engineering (CSE) from Osmania University.
8. Segment 8: Closing (approx 25s, ~60-70 words)
   - Professional closing: Thank the interviewer/visitor. Invite them to interactively explore FAUZAAN OS, inspect source traces in the AI Lab, review the resume, or get in touch.

MULTI-VIDEO ASSIGNMENT:
- For AL-AQL: Assign videoRefs: ["/media/video/al_aql_1.mp4", "/media/video/al_aql_2.mp4"]
- For Weaver AI: Assign videoRefs: ["/media/video/weaver_1.mp4", "/media/video/weaver_2.mp4"]
- For other projects with videos, assign the exact video path (e.g. "/media/video/football_analyser.mp4", "/media/video/smart_classroom_assist.mp4", "/media/video/postoffice_analyser.mp4", "/media/video/alpha_omega.mp4", etc.).`;

  const userPrompt = `Here is the portfolio repository context:

--- PROJECTS DATA EXTRACT ---
${projectsContent.substring(0, 18000)}

--- SKILLS DATA EXTRACT ---
${skillsContent.substring(0, 4000)}

--- ACHIEVEMENTS DATA EXTRACT ---
${achievementsContent}

--- EXPERIENCE DATA EXTRACT ---
${experienceContent}

--- VIDEO ANALYSIS EVIDENCE ---
${videoSummary ? JSON.stringify(videoSummary, null, 2) : 'Video files exist in public/media/video/'}

Please generate the complete, grounded, production-ready portfolio presentation script adhering strictly to the JSON schema.
Total word count across all 8 segments MUST be between 650 and 850 words.`;

  // JSON Schema for structured generation
  const responseSchema = {
    type: "OBJECT",
    properties: {
      title: { type: "STRING" },
      totalEstimatedDuration: { type: "INTEGER" },
      totalWordCount: { type: "INTEGER" },
      segments: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            id: { type: "STRING" },
            sectionNumber: { type: "INTEGER" },
            title: { type: "STRING" },
            estimatedDuration: { type: "INTEGER" },
            startTime: { type: "INTEGER" },
            endTime: { type: "INTEGER" },
            script: { type: "STRING" },
            captionSentences: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  text: { type: "STRING" },
                  approxStart: { type: "INTEGER" },
                  approxEnd: { type: "INTEGER" }
                },
                required: ["text", "approxStart", "approxEnd"]
              }
            },
            projectIds: {
              type: "ARRAY",
              items: { type: "STRING" }
            },
            videoRefs: {
              type: "ARRAY",
              items: { type: "STRING" }
            },
            activeVideo: { type: "STRING" },
            keyTakeaways: {
              type: "ARRAY",
              items: { type: "STRING" }
            }
          },
          required: [
            "id",
            "sectionNumber",
            "title",
            "estimatedDuration",
            "startTime",
            "endTime",
            "script",
            "captionSentences",
            "projectIds",
            "videoRefs",
            "keyTakeaways"
          ]
        }
      }
    },
    required: ["title", "totalEstimatedDuration", "totalWordCount", "segments"]
  };

  const candidateModels = [
    process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    'gemini-3.8-flash',
    'gemini-2.5-pro'
  ];

  let rawText = null;
  let activeModelUsed = null;

  for (const model of candidateModels) {
    let attempts = 0;
    const maxAttempts = 3;
    let modelSuccess = false;

    while (attempts < maxAttempts && !modelSuccess) {
      attempts++;
      console.log(`[GEMINI] Attempting model ${model} (attempt ${attempts}/${maxAttempts})...`);
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
            systemInstruction: { parts: [{ text: systemInstruction }] },
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: responseSchema,
              temperature: 0.3,
            }
          })
        });

        if (response.ok) {
          const result = await response.json();
          rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            modelSuccess = true;
            activeModelUsed = model;
            break;
          }
        } else {
          const errorText = await response.text();
          console.warn(`[WARN] Gemini API returned HTTP ${response.status}: ${errorText.substring(0, 200)}`);
          if (response.status === 503 || response.status === 429) {
            const waitMs = attempts * 3000;
            console.log(`[RETRY] Transient ${response.status} spike. Backing off for ${waitMs / 1000}s...`);
            await new Promise((r) => setTimeout(r, waitMs));
          } else {
            // Other error, break attempt
            break;
          }
        }
      } catch (err) {
        console.warn(`[WARN] Network error calling ${model}: ${err.message}`);
        await new Promise((r) => setTimeout(r, 2000));
      }
    }

    if (modelSuccess && rawText) {
      console.log(`[GEMINI] Successfully received response from ${activeModelUsed}!`);
      break;
    }
  }

  if (!rawText) {
    const cachedJsonPath = path.join(rootDir, 'generated/presentation/presentation.json');
    if (fs.existsSync(cachedJsonPath)) {
      console.warn('[NOTICE] API temporary unavailability; falling back to existing verified presentation.json.');
      return JSON.parse(fs.readFileSync(cachedJsonPath, 'utf8'));
    }
    console.error('[ERROR] Gemini could not generate narrative after retrying models.');
    process.exit(1);
  }

  let presentationData;
  try {
    presentationData = JSON.parse(rawText);
  } catch (e) {
    console.error('[ERROR] Failed to parse Gemini JSON output:', e.message);
    console.error('Raw output:', rawText);
    process.exit(1);
  }

  // Calculate actual total words
  let computedWords = 0;
  presentationData.segments.forEach((seg) => {
    const words = seg.script.trim().split(/\s+/).length;
    computedWords += words;
  });
  presentationData.totalWordCount = computedWords;

  console.log(`[GEMINI] Generated ${presentationData.segments.length} segments.`);
  console.log(`[GEMINI] Total script word count: ${computedWords} words.`);
  console.log(`[GEMINI] Total estimated duration: ${presentationData.totalEstimatedDuration} seconds (~${Math.round(presentationData.totalEstimatedDuration / 60)} min).`);

  // Ensure output directories
  const generatedPresentationDir = path.join(rootDir, 'generated/presentation');
  fs.mkdirSync(generatedPresentationDir, { recursive: true });

  const publicMediaDir = path.join(rootDir, 'public/media');
  fs.mkdirSync(publicMediaDir, { recursive: true });

  const srcDataDir = path.join(rootDir, 'src/data');

  // 1. Save Markdown Script
  let markdownScript = `# ${presentationData.title}\n\n`;
  markdownScript += `**Estimated Duration:** ~${Math.round(presentationData.totalEstimatedDuration / 60)} minutes (${presentationData.totalEstimatedDuration}s)\n`;
  markdownScript += `**Total Spoken Words:** ${computedWords} words\n\n---\n\n`;

  presentationData.segments.forEach((seg, idx) => {
    markdownScript += `## Section ${seg.sectionNumber}: ${seg.title}\n`;
    markdownScript += `**Duration:** ${seg.estimatedDuration}s (${seg.startTime}s - ${seg.endTime}s)\n`;
    if (seg.projectIds?.length) {
      markdownScript += `**Featured Projects:** ${seg.projectIds.join(', ')}\n`;
    }
    if (seg.videoRefs?.length) {
      markdownScript += `**Associated Videos:** ${seg.videoRefs.join(', ')}\n`;
    }
    markdownScript += `\n### Script:\n"${seg.script}"\n\n`;
    if (seg.keyTakeaways?.length) {
      markdownScript += `**Key Points:**\n`;
      seg.keyTakeaways.forEach((pt) => (markdownScript += `- ${pt}\n`));
    }
    markdownScript += `\n---\n\n`;
  });

  const mdPath = path.join(generatedPresentationDir, 'presentation-script.md');
  fs.writeFileSync(mdPath, markdownScript, 'utf8');
  console.log(`[FILE] Saved script to ${mdPath}`);

  // 2. Save JSON outputs
  const jsonPath = path.join(generatedPresentationDir, 'presentation.json');
  fs.writeFileSync(jsonPath, JSON.stringify(presentationData, null, 2), 'utf8');
  console.log(`[FILE] Saved structured JSON to ${jsonPath}`);

  // Also sync to public/media/presentation.json and src/data/presentation.json
  fs.writeFileSync(path.join(publicMediaDir, 'presentation.json'), JSON.stringify(presentationData, null, 2), 'utf8');
  fs.writeFileSync(path.join(srcDataDir, 'presentation.json'), JSON.stringify(presentationData, null, 2), 'utf8');
  console.log('[FILE] Synced presentation.json to public/media and src/data/');

  return presentationData;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generatePresentationScript().catch((err) => {
    console.error('[ERROR] Script generation failed:', err);
    process.exit(1);
  });
}
