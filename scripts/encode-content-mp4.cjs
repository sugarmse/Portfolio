// Optional media preparation; no application dependency is required.
// Usage: node scripts/encode-content-mp4.cjs <absolute-ffmpeg-path>
const { spawnSync } = require('node:child_process');

if (!process.argv[2]) throw new Error('Pass the path to a full FFmpeg build with H.264/AAC support.');
const result = spawnSync(process.argv[2], [
  '-hide_banner', '-y', '-i', 'public/videos/Sailung-Kalinchok/jugaad-final.mp4',
  '-map', '0:v:0', '-map', '0:a:0', '-vf', 'scale=720:-2',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '24', '-pix_fmt', 'yuv420p',
  '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart',
  'public/content/jugaad-travel.mp4',
], { stdio: 'inherit' });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
