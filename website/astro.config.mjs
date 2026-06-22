import { defineConfig } from 'astro/config';
import { SITE } from './src/site.mjs';

export default defineConfig({
  site: SITE,
  output: 'static',
  build: {
    // Keep stylesheets external (linked, not inlined into <head>) so the bulk
    // of the site's CSS is covered by the strict style-src 'self'. The CSP
    // still needs 'unsafe-inline' for one reason only: the masthead firefly
    // effect emits build-time inline `style` attributes (per-particle CSS
    // custom properties). That allowance is documented in .design/DESIGN.md
    // and in the CSP comment in src/layouts/Base.astro.
    inlineStylesheets: 'never',
  },
});
