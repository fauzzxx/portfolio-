import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export async function runVideoAnalysis() {
  console.log('====================================================');
  console.log('  FAUZAAN OS — STEP 1: VIDEO EVIDENCE ANALYSIS');
  console.log('====================================================');

  const pyScript = path.join(__dirname, 'analyze-videos.py');
  
  return new Promise((resolve, reject) => {
    // Quote arguments safely for Windows PowerShell / cmd
    const args = ['run', '--with', 'opencv-python-headless', 'python', `"${pyScript}"`];
    const child = spawn('uv', args, {
      cwd: rootDir,
      stdio: 'inherit',
      shell: true,
    });

    child.on('error', (err) => {
      console.warn('[WARN] uv not found or failed to spawn. Trying fallback python...');
      fallbackPython(resolve, reject);
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log('[SUCCESS] Video analysis finished successfully.');
        resolve();
      } else {
        console.warn(`[WARN] uv exited with code ${code}. Trying standard python...`);
        fallbackPython(resolve, reject);
      }
    });
  });
}

function fallbackPython(resolve, reject) {
  const pyScript = path.join(__dirname, 'analyze-videos.py');
  const fallbackChild = spawn('python', [`"${pyScript}"`], {
    cwd: rootDir,
    stdio: 'inherit',
    shell: true,
  });

  fallbackChild.on('close', (code) => {
    if (code === 0) {
      console.log('[SUCCESS] Video analysis finished via python.');
      resolve();
    } else {
      console.warn('[WARN] Could not analyze videos with OpenCV. Proceeding with metadata fallback.');
      const outputDir = path.join(rootDir, '.generated', 'video-analysis');
      fs.mkdirSync(outputDir, { recursive: true });
      fs.writeFileSync(
        path.join(outputDir, 'summary.json'),
        JSON.stringify({ totalVideos: 0, analyzedCount: 0, videos: {} }, null, 2)
      );
      resolve();
    }
  });

  fallbackChild.on('error', () => {
    console.warn('[WARN] Python not found. Continuing without video frame evidence.');
    const outputDir = path.join(rootDir, '.generated', 'video-analysis');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(
      path.join(outputDir, 'summary.json'),
      JSON.stringify({ totalVideos: 0, analyzedCount: 0, videos: {} }, null, 2)
    );
    resolve();
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runVideoAnalysis().catch((err) => {
    console.error('[ERROR] Video analysis failed:', err);
    process.exit(1);
  });
}
