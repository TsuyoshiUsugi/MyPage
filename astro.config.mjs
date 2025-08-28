import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tsuyoshiusugi.github.io',
  base: '/MyPage',
  output: 'static',
  build: {
    assets: 'assets'
  }
});