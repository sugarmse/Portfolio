import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'content-story-html',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const index = bundle['index.html'];
      if (!index || index.type !== 'asset') return;
      const title = 'The Long Way Home — Sarthak Shakya';
      const description = 'A motorcycle, a camera, and the long way through Nepal. An interactive travel story by Sarthak Shakya.';
      let html = String(index.source).replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
      for (const [key, value] of [
        ['description', description], ['og:title', title], ['og:description', description],
        ['og:image', 'https://shakyasarthak.com.np/content/photos/dsc02413.webp'],
        ['og:image:type', 'image/webp'], ['twitter:title', title], ['twitter:description', description],
        ['twitter:image', 'https://shakyasarthak.com.np/content/photos/dsc02413.webp'], ['theme-color', '#10120f'],
      ]) html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*("\\s*/?>)`), `$1${value}$2`);
      html = html.replace('</head>', '<link rel="canonical" href="https://shakyasarthak.com.np/content" /><meta property="og:url" content="https://shakyasarthak.com.np/content" /></head>');
      this.emitFile({ type: 'asset', fileName: 'content/index.html', source: html });
    },
  }],
})
