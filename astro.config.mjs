// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages: https://naskaz2003-art.github.io/ana-kaz-design-v1/
// If you connect your own domain later, set `site` to it and remove `base`.
export default defineConfig({
  site: 'https://naskaz2003-art.github.io',
  base: '/ana-kaz-design-v1',
  output: 'static',
  trailingSlash: 'ignore',
});
