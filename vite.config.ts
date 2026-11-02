import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { pageMetadata } from './src/content/pageMetadata'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'content-story-html',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const index = bundle['index.html'];
      if (!index || index.type !== 'asset') return;
      const { title, description, image } = pageMetadata;
      let html = String(index.source).replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
      for (const [key, value] of [
        ['description', description], ['og:title', title], ['og:description', description],
        ['og:image', image],
        ['og:image:type', 'image/webp'], ['twitter:title', title], ['twitter:description', description],
        ['twitter:image', image], ['theme-color', '#10120f'],
      ]) html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*("\\s*/?>)`), `$1${value}$2`);
      html = html.replace('</head>', '<link rel="canonical" href="https://shakyasarthak.com.np/content" /><meta property="og:url" content="https://shakyasarthak.com.np/content" /></head>');
      this.emitFile({ type: 'asset', fileName: 'content/index.html', source: html });
    },
  }],
})
