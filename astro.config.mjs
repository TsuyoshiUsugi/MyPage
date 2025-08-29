import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://morumoru.jp',
  base: '/',
  output: 'static',
  build: {
    assets: 'assets'
  }
});