import os
import sys
import json
import glob
from pathlib import Path

def analyze_all_videos():
    try:
        import cv2
    except ImportError:
        print("[ERROR] OpenCV (cv2) is not installed. Please run via: uv run --with opencv-python-headless python ...", file=sys.stderr)
        sys.exit(1)

    base_dir = Path(__file__).resolve().parent.parent.parent
    video_dir = base_dir / "public" / "media" / "video"
    output_dir = base_dir / ".generated" / "video-analysis"
    frames_dir = output_dir / "frames"

    output_dir.mkdir(parents=True, exist_ok=True)
    frames_dir.mkdir(parents=True, exist_ok=True)

    video_extensions = {".mp4", ".mov", ".avi", ".webm", ".mkv"}
    video_files = [f for f in video_dir.iterdir() if f.suffix.lower() in video_extensions]

    print(f"[VIDEO ANALYZER] Found {len(video_files)} video files in {video_dir}")

    results = {}

    for vf in sorted(video_files):
        video_name = vf.name
        print(f"  -> Inspecting {video_name}...")
        try:
            cap = cv2.VideoCapture(str(vf))
            if not cap.isOpened():
                print(f"     [WARN] Could not open video: {video_name}")
                results[video_name] = {
                    "filename": video_name,
                    "status": "UNKNOWN",
                    "error": "Failed to open video"
                }
                continue

            fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
            frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
            height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
            duration = frame_count / fps if fps > 0 else 0.0

            video_frames_dir = frames_dir / vf.stem
            video_frames_dir.mkdir(parents=True, exist_ok=True)

            # Sample 5 representative frame positions across the video (10%, 30%, 50%, 70%, 90%)
            sample_percentages = [0.10, 0.30, 0.50, 0.70, 0.90]
            extracted_frames = []

            for pct in sample_percentages:
                target_frame = int(frame_count * pct)
                cap.set(cv2.CAP_PROP_POS_FRAMES, target_frame)
                ret, frame = cap.read()
                if ret and frame is not None:
                    # Resize to max width 640 for lightweight storage
                    h, w = frame.shape[:2]
                    target_w = 640
                    target_h = int(h * (target_w / w)) if w > 0 else 360
                    resized = cv2.resize(frame, (target_w, target_h), interpolation=cv2.INTER_AREA)

                    timestamp_sec = round(target_frame / fps, 1)
                    frame_filename = f"frame_{int(timestamp_sec)}s.jpg"
                    frame_path = video_frames_dir / frame_filename
                    cv2.imwrite(str(frame_path), resized, [cv2.IMWRITE_JPEG_QUALITY, 80])

                    extracted_frames.append({
                        "timestamp": timestamp_sec,
                        "percentage": int(pct * 100),
                        "frameFile": str(frame_path.relative_to(base_dir)).replace("\\", "/")
                    })

            cap.release()

            # Structured scene estimation based on video duration
            scenes = []
            if duration > 0:
                scene_count = min(4, max(2, int(duration // 20)))
                interval = duration / scene_count
                for i in range(scene_count):
                    s_start = round(i * interval, 1)
                    s_end = round(min(duration, (i + 1) * interval), 1)
                    scenes.append({
                        "sceneIndex": i + 1,
                        "start": s_start,
                        "end": s_end,
                        "duration": round(s_end - s_start, 1)
                    })

            results[video_name] = {
                "filename": video_name,
                "status": "ANALYZED",
                "duration": round(duration, 2),
                "resolution": f"{width}x{height}",
                "fps": round(fps, 1),
                "frameCount": frame_count,
                "extractedFrames": extracted_frames,
                "scenes": scenes
            }
            print(f"     [OK] {round(duration, 1)}s, {width}x{height}, {len(extracted_frames)} frames sampled")

        except Exception as e:
            print(f"     [WARN] Error analyzing {video_name}: {e}")
            results[video_name] = {
                "filename": video_name,
                "status": "UNKNOWN",
                "error": str(e)
            }

    summary_file = output_dir / "summary.json"
    with open(summary_file, "w", encoding="utf-8") as f:
        json.dump({
            "totalVideos": len(video_files),
            "analyzedCount": sum(1 for v in results.values() if v.get("status") == "ANALYZED"),
            "videos": results
        }, f, indent=2)

    print(f"\n[VIDEO ANALYZER] Analysis complete! Output written to {summary_file}")

if __name__ == "__main__":
    analyze_all_videos()
