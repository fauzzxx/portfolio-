import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export async function validateScript() {
  console.log('====================================================');
  console.log('  FAUZAAN OS — STEP 3: SCRIPT VALIDATION');
  console.log('====================================================');

  const jsonPath = path.join(rootDir, 'generated/presentation/presentation.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`[VALIDATION FAILED] Script JSON file does not exist: ${jsonPath}`);
    process.exit(1);
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  } catch (e) {
    console.error(`[VALIDATION FAILED] Cannot parse JSON: ${e.message}`);
    process.exit(1);
  }

  const errors = [];
  const warnings = [];

  // 1. Check segments existence
  if (!data.segments || !Array.isArray(data.segments) || data.segments.length === 0) {
    errors.push('No presentation segments found in presentation.json');
  }

  // 2. Check forbidden names and incorrect degree titles (must strictly be B.E. Computer Science and Engineering)
  const forbiddenPatterns = [
    /\baffan\b/i,
    /\basif\b/i,
    /\bB\.?\s*Tech\b/i,
    /\bBTech\b/i,
    /\bBachelor\s+of\s+Technology\b/i,
  ];
  const fullText = JSON.stringify(data);
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(fullText)) {
      errors.push(`FORBIDDEN TERM DETECTED matching regex: ${pattern} (Osmania University degree must be B.E. Computer Science and Engineering)`);
    }
  }

  // 3. Word count & duration check
  let totalWords = 0;
  data.segments.forEach((seg, idx) => {
    if (!seg.script || seg.script.trim().length === 0) {
      errors.push(`Segment ${idx + 1} (${seg.title}) has empty script`);
    } else {
      const words = seg.script.trim().split(/\s+/).length;
      totalWords += words;
    }
  });

  console.log(`[VALIDATE] Total script words: ${totalWords}`);
  if (totalWords < 450) {
    warnings.push(`Total words (${totalWords}) is low for a 4-5 minute presentation. Target is ~650-850 words.`);
  } else if (totalWords > 950) {
    warnings.push(`Total words (${totalWords}) exceeds the target for a 4-5 minute presentation.`);
  }

  // 4. Load projects data to verify project IDs
  const projectsFilePath = path.join(rootDir, 'src/data/projects.ts');
  const projectsContent = fs.readFileSync(projectsFilePath, 'utf8');
  const validProjectIds = new Set(
    [...projectsContent.matchAll(/id:\s*'([^']+)'/g)].map((m) => m[1])
  );

  data.segments.forEach((seg) => {
    if (seg.projectIds && Array.isArray(seg.projectIds)) {
      seg.projectIds.forEach((pid) => {
        if (!validProjectIds.has(pid)) {
          errors.push(`Invalid project reference: "${pid}" in segment "${seg.title}" does not exist in projects.ts`);
        }
      });
    }
  });

  // 5. Verify video files existence
  const publicDir = path.join(rootDir, 'public');
  data.segments.forEach((seg) => {
    if (seg.videoRefs && Array.isArray(seg.videoRefs)) {
      seg.videoRefs.forEach((vref) => {
        // vref e.g. "/media/video/al_aql_1.mp4"
        const cleanPath = vref.startsWith('/') ? vref.slice(1) : vref;
        const fullVideoPath = path.join(publicDir, cleanPath);
        if (!fs.existsSync(fullVideoPath)) {
          errors.push(`Invalid video reference: "${vref}" in segment "${seg.title}" file not found at ${fullVideoPath}`);
        }
      });
    }
  });

  // 6. Check for fake URLs
  const urlRegex = /https?:\/\/[^\s"']+/g;
  const foundUrls = fullText.match(urlRegex) || [];
  for (const u of foundUrls) {
    if (u.includes('localhost') || u.includes('example.com') || u.includes('placeholder')) {
      errors.push(`Suspicious/fake URL detected in presentation metadata: ${u}`);
    }
  }

  // Reporting
  if (warnings.length > 0) {
    console.log('\n[VALIDATION WARNINGS]:');
    warnings.forEach((w) => console.warn(`  - ${w}`));
  }

  if (errors.length > 0) {
    console.error('\n[VALIDATION FAILED] The following errors must be resolved:');
    errors.forEach((err) => console.error(`  [X] ${err}`));
    process.exit(1);
  }

  console.log('\n[VALIDATION SUCCESS] All checks passed:');
  console.log(`  - No forbidden identities found`);
  console.log(`  - All referenced project IDs are verified against projects.ts`);
  console.log(`  - All referenced video files exist in public/media/video/`);
  console.log(`  - Word count: ${totalWords} words (~${Math.round(totalWords / 150 * 60)}s spoken duration)`);
  console.log(`  - Segments count: ${data.segments.length}`);
  return true;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  validateScript().catch((err) => {
    console.error('[ERROR] Validation script failed:', err);
    process.exit(1);
  });
}
