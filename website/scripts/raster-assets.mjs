// Rasterize the brand SVGs that need a bitmap form.
//
// Why this exists: several social platforms (and some chat unfurlers) do not
// render SVG Open Graph images, and not every browser ships an SVG favicon
// path. The SVGs under public/assets are the editable source; this step emits
// the PNG forms the platforms actually consume. It runs as `prebuild` so a
// plain `npm run build` always ships fresh, in-sync bitmaps.
//
// The design-system font (Archivo, woff2) is inlined as a base64 @font-face so
// the rasterizer renders the real wordmark instead of a system fallback — the
// output PNG is fully self-contained.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const assets = join(here, '..', 'public', 'assets');
const fonts = join(here, '..', 'public', 'fonts');

const fontFace = (family, file, weight) => {
  const b64 = readFileSync(join(fonts, file)).toString('base64');
  return `@font-face{font-family:'${family}';font-weight:${weight};font-style:normal;src:url(data:font/woff2;base64,${b64}) format('woff2');}`;
};

// Inline the families the OG image references so the raster is self-contained.
const embeddedFonts =
  fontFace('Archivo', 'archivo-latin.woff2', '500 700') +
  fontFace('JetBrains Mono', 'jetbrains-mono-latin.woff2', '500');

const withFonts = (svg) =>
  svg.replace(/(<svg[^>]*>)/, `$1<style>${embeddedFonts}</style>`);

const targets = [
  // Open Graph card — the #1 reason this script exists.
  { src: 'og-image.svg', out: 'og-image.png', width: 1200, height: 630, fonts: true },
  // Favicon raster fallback + apple-touch icon (glyph only, no text).
  { src: 'favicon.svg', out: 'favicon-32.png', width: 32, height: 32, fonts: false },
  { src: 'favicon.svg', out: 'apple-touch-icon.png', width: 180, height: 180, fonts: false },
];

for (const t of targets) {
  const raw = readFileSync(join(assets, t.src), 'utf-8');
  const svg = t.fonts ? withFonts(raw) : raw;
  await sharp(Buffer.from(svg), { density: 384 })
    .resize(t.width, t.height, { fit: 'contain', background: { r: 232, g: 235, b: 240, alpha: t.fonts ? 1 : 0 } })
    .png()
    .toFile(join(assets, t.out));
  console.log(`raster: ${t.src} → ${t.out} (${t.width}×${t.height})`);
}
