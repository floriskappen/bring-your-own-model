// Generate the BYOM brand SVGs from one canonical mark.
//
// Why this exists: the favicon, the badges (standard/small, light/dark), the
// bare mark, and the OG image all share one logo — two overlapping squares,
// the app (ink) and your model (accent), deepening where they meet (ontwerp's
// ink + pigment "multiply" material). Hand-maintaining nine SVGs let them drift
// apart. This script is the single source of truth: edit the mark or a lockup
// here, and every variant stays in lockstep.
//
// It runs as the first `prebuild` step (before raster-assets.mjs, which
// rasterizes favicon.svg and og-image.svg). The emitted SVGs are committed so
// the repo stays self-contained, and regenerated on every build so they never
// drift from this definition. The badge geometry (168×44, 96×26) and the
// served `/assets/badge/` filenames are a long-lived external contract — see
// constitution/badge/README.md — and must not change.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const A = join(here, '..', 'public', 'assets');

// Slate theme primitives (mirror of the site's token layer; badges are
// self-contained so they carry the literal values rather than CSS variables).
const INK = '#1B2028', PAPER = '#E8EBF0', ACC = '#4D6483', ACCS = '#6E83A0',
      QUIET = '#6B7488', FAINT = '#9AA3B5';
const SANS = `Archivo, 'Helvetica Neue', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`;

// The mark, in a 24×24 box: the app square (back) and your-model square
// (front), with the overlap painted a deepened tone — colour darkening where
// two pigments stack.
const mark = (back, front, over) =>
  `<rect x="2" y="8" width="12" height="12" fill="${back}"/>` +
  `<rect x="10" y="4" width="12" height="12" fill="${front}"/>` +
  `<rect x="10" y="8" width="4" height="8" fill="${over}"/>`;
const onLight = mark(INK, ACC, INK);     // on paper: app=ink, model=accent, overlap deepens to ink
const onDark  = mark(PAPER, ACCS, ACC);  // on ink:  app=paper, model=accent-soft, overlap deepens to accent

// Themeable monochrome mark: both squares in currentColor, the app square
// dropped to half opacity so the two-square read survives in a single colour.
// For an app that inlines the mark into its own UI and wants it to follow the
// host theme — see "Theming the inline mark" in constitution/badge/README.md.
const markMono =
  `<rect x="2" y="8" width="12" height="12" fill="currentColor" opacity="0.5"/>` +
  `<rect x="10" y="4" width="12" height="12" fill="currentColor"/>`;
const g = (x, y, s, inner) => `<g transform="translate(${x},${y}) scale(${s})">${inner}</g>`;

const files = {};

// Favicon / monogram — the mark on a rounded ink tile (OS-icon context).
files['favicon.svg'] =
`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" role="img" aria-label="byom">
  <title>byom</title>
  <rect x="0.5" y="0.5" width="31" height="31" rx="7" fill="${INK}"/>
  ${g(5, 5, 0.92, onDark)}
</svg>
`;

// Standard badge 168×44 — mark + wordmark + tagline, hairline border, square corners.
const badge = (dark) => {
  const bg = dark ? INK : PAPER, ink = dark ? PAPER : INK, sub = dark ? FAINT : QUIET,
        bd = dark ? PAPER : INK, bo = dark ? '0.18' : '0.22', m = dark ? onDark : onLight;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="168" height="44" viewBox="0 0 168 44" role="img" aria-label="byom badge — bring your own model">
  <title>byom badge (${dark ? 'dark' : 'light'})</title>
  <rect x="0.5" y="0.5" width="167" height="43" fill="${bg}" stroke="${bd}" stroke-opacity="${bo}"/>
  ${g(14, 10, 1, m)}
  <text x="52" y="24" font-family="${SANS}" font-size="18" font-weight="800" letter-spacing="-0.6" fill="${ink}" text-rendering="geometricPrecision">byom</text>
  <text x="53" y="36" font-family="${SANS}" font-size="9.5" font-weight="500" fill="${sub}" text-rendering="geometricPrecision">bring your own model</text>
</svg>
`;
};
files['badge/byom-badge-light.svg'] = badge(false);
files['badge/byom-badge-dark.svg'] = badge(true);

// Small badge 96×26 — mark + wordmark on one line.
const small = (dark) => {
  const bg = dark ? INK : PAPER, ink = dark ? PAPER : INK,
        bd = dark ? PAPER : INK, bo = dark ? '0.18' : '0.22', m = dark ? onDark : onLight;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="26" viewBox="0 0 96 26" role="img" aria-label="byom badge — bring your own model">
  <title>byom badge small (${dark ? 'dark' : 'light'})</title>
  <rect x="0.5" y="0.5" width="95" height="25" fill="${bg}" stroke="${bd}" stroke-opacity="${bo}"/>
  ${g(8, 5, 0.67, m)}
  <text x="33" y="18" font-family="${SANS}" font-size="14" font-weight="800" letter-spacing="-0.5" fill="${ink}" text-rendering="geometricPrecision">byom</text>
</svg>
`;
};
files['badge/byom-badge-light-small.svg'] = small(false);
files['badge/byom-badge-dark-small.svg'] = small(true);

// Bare mark — the ultra-minimal variant for lightweight inline UI use (no
// frame, no wordmark). Legible down to ~12px.
const bare = (dark) =>
`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-label="byom">
  <title>byom mark</title>
  ${dark ? onDark : onLight}
</svg>
`;
files['badge/byom-mark.svg'] = bare(false);
files['badge/byom-mark-dark.svg'] = bare(true);

// Themeable inline mark — one file for both light and dark, since it inherits
// the host's text colour. Only inherits when the SVG is inlined into the host
// DOM (an <img>-loaded SVG is isolated and cannot see currentColor).
files['badge/byom-mark-currentColor.svg'] =
`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-label="byom">
  <title>byom mark</title>
  ${markMono}
</svg>
`;

// Open Graph source 1200×630 — editorial layout (paper, bloom, wordmark, seed),
// with the mark in the top-left. raster-assets.mjs emits the delivered PNG.
files['og-image.svg'] =
`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="bring your own model — free software for the llm era">
  <title>bring your own model</title>
  <defs>
    <radialGradient id="bloom" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#6E83A0" stop-opacity="0.42"/>
      <stop offset="68%" stop-color="#6E83A0" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bloom2" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#C7D0DE" stop-opacity="0.7"/>
      <stop offset="70%" stop-color="#C7D0DE" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#E8EBF0"/>
  <rect x="760" y="-120" width="640" height="640" fill="url(#bloom)"/>
  <rect x="-160" y="220" width="620" height="620" fill="url(#bloom2)"/>

  <!-- the byom mark — app (ink) + your model (accent), deepening where they meet -->
  ${g(96, 92, 5.4, onLight)}
  <text x="250" y="195" font-family="${SANS}" font-size="40" font-weight="700" letter-spacing="6" fill="#4D6483" text-rendering="geometricPrecision">byom</text>

  <text x="96" y="370" font-family="${SANS}" font-size="96" font-weight="700" letter-spacing="-3" fill="#1B2028" text-rendering="geometricPrecision">bring your own model</text>

  <text x="98" y="452" font-family="${SANS}" font-size="33" font-weight="500" fill="#424A57" text-rendering="geometricPrecision">free software for the llm era. the app is free —</text>
  <text x="98" y="500" font-family="${SANS}" font-size="33" font-weight="500" fill="#424A57" text-rendering="geometricPrecision">you bring your own model for the parts that need it.</text>

  <text x="98" y="576" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="20" font-weight="500" letter-spacing="2" fill="#6B7488" text-rendering="geometricPrecision">FOLLOWS THE PATTERN + SECURITY INVARIANTS — NOT PROOF OF SAFETY</text>

  <!-- phyllotaxis seed mark, bottom-right -->
  <g transform="translate(1020,470) scale(3.2)" fill="#6B7488" opacity="0.55">
    <circle cx="21" cy="21" r="2.5"/><circle cx="14" cy="16" r="2"/><circle cx="28" cy="16" r="2"/>
    <circle cx="16" cy="28" r="2"/><circle cx="26" cy="28" r="2"/><circle cx="21" cy="12" r="1.5"/>
    <circle cx="21" cy="30" r="1.5"/><circle cx="12" cy="22" r="1.5"/><circle cx="30" cy="22" r="1.5"/>
  </g>

  <rect x="0" y="620" width="1200" height="10" fill="#4D6483"/>
</svg>
`;

for (const [rel, content] of Object.entries(files)) writeFileSync(join(A, rel), content);
console.log(`brand: wrote ${Object.keys(files).length} SVGs from the canonical mark`);
