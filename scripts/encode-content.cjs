// Optional local web encode without installing another media dependency.
// Usage: node scripts/encode-content.cjs <playwright-core path> <chromium path>
const { chromium } = require(process.argv[2]);
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ executablePath: process.argv[3], headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
  try {
    const page = await browser.newPage();
    const recordedChunks = [];
    await page.exposeFunction('saveRecordedChunk', (index, bytes) => { recordedChunks[index] = Buffer.from(bytes); });
    await page.goto('http://127.0.0.1:5173/content');
    const result = await page.evaluate(async () => {
      const video = document.createElement('video');
      video.src = '/videos/Sailung-Kalinchok/jugaad-final.mp4';
      video.playsInline = true;
      document.body.replaceChildren(video);
      await new Promise((resolve, reject) => { video.onloadeddata = resolve; video.onerror = () => reject(video.error.message); });
      const canvas = document.createElement('canvas'); canvas.width = 540; canvas.height = 960;
      const context = canvas.getContext('2d');
      await video.play();
      const source = video.captureStream();
      const stream = canvas.captureStream(30);
      const audio = source.getAudioTracks();
      if (!audio.length) throw new Error('No original audio track captured');
      audio.forEach(track => stream.addTrack(track));
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9,opus', videoBitsPerSecond: 1600000, audioBitsPerSecond: 96000 });
      const writes = [];
      let index = 0;
      recorder.ondataavailable = event => {
        const chunkIndex = index++;
        writes.push(event.data.arrayBuffer().then(buffer => window.saveRecordedChunk(chunkIndex, Array.from(new Uint8Array(buffer)))));
      };
      const completed = new Promise(resolve => { recorder.onstop = resolve; });
      const draw = () => { context.drawImage(video, 0, 0, 540, 960); if (!video.ended) video.requestVideoFrameCallback(draw); };
      video.requestVideoFrameCallback(draw);
      recorder.start(1000);
      await new Promise(resolve => { video.onended = resolve; });
      recorder.stop(); await completed;
      await Promise.all(writes);
      return { audioTracks: audio.length, chunks: index };
    });
    const output = Buffer.concat(recordedChunks);
    fs.writeFileSync('public/content/jugaad-web.webm', output);
    console.log({ bytes: output.length, ...result });
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
