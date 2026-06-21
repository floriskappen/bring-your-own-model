import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://BYOM-SITE',
  output: 'static',
  build: {
    inlineStylesheets: 'never',
  },
  vite: {
    css: {
      // No CSS preprocessor needed — the design system ships plain CSS variables.
      // All styles are authored as global CSS, imported in the layout.
      // Astro extracts them to linked .css files (inlineStylesheets: 'never')
      // so the strict CSP can set style-src 'self' without 'unsafe-inline'.
    },
  },
});
