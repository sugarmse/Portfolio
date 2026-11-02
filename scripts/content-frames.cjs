// Extract authentic stills from the existing film using a locally available browser.
// Usage: node scripts/content-frames.cjs <playwright-core path> <chromium path>
const { chromium } = require(process.argv[2]);
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ executablePath: process.argv[3], headless: true });
  try {
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:5173');
    await page.evaluate(async () => {
      const video = document.createElement('video');
      video.id = 'source-film'; video.muted = true;
      video.src = '/videos/Sailung-Kalinchok/jugaad-final.mp4';
      document.body.replaceChildren(video);
      await new Promise((resolve, reject) => {
        video.onloadeddata = resolve;
        video.onerror = () => reject(new Error(video.error.message));
      });
    });
    fs.mkdirSync('public/content', { recursive: true });
    for (const time of [2, 19, 32]) {
      const data = await page.evaluate(async time => {
        const video = document.getElementById('source-film');
        await new Promise(resolve => { video.onseeked = resolve; video.currentTime = time; });
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth; canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/webp', .96).split(',')[1];
      }, time);
      fs.writeFileSync(`public/content/frame-${time}.webp`, Buffer.from(data, 'base64'));
    }
  } finally { await browser.close(); }
})();
