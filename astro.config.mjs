import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://morumoru.jp',
  base: '/',
  output: 'static',
  integrations: [mdx()],
  markdown: {
    // MDファイルでもコンポーネントが使えるように
    extendDefaultPlugins: true,
  },
  build: {
    assets: 'assets'
  }
});