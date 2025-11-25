import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import mermaid from 'astro-mermaid';
import remarkBreaks from 'remark-breaks';

export default defineConfig({
  site: 'https://morumoru.jp',
  base: '/',
  output: 'static',
  integrations: [mdx(), mermaid()],
  markdown: {
    remarkPlugins: [remarkBreaks],
    extendDefaultPlugins: true,
  },
  build: {
    assets: 'assets'
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      }
    }
  }
});