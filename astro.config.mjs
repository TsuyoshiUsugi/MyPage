import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import mermaid from 'astro-mermaid';

export default defineConfig({
  site: 'https://morumoru.jp',
  base: '/',
  output: 'static',
  integrations: [mdx(), mermaid()],
  markdown: {
    // MDファイルでもコンポーネントが使えるように
    extendDefaultPlugins: true,
  },
  build: {
    assets: 'assets'
  }
});