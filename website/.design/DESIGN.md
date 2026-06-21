# Design system pin

- **System:** ontwerp design system
- **Pinned version:** 0.1.0
- **Pinned commit:** 82efa76 (release-branch SHA the submodule points at)
- **Submodule path:** website/vendor/ontwerp
- **Last synced:** 2026-06-21

## Adopted

- **slate theme** (full colour override): surface #E8EBF0, ink #1B2028, accent #4D6483 — all derived roles (text-quiet, text-faint, border-*, surface-ink, surface-warm, claim-hover, on-ink, primitives, alpha) filled in from the slate palette. bloom/pollen mapped per zoo skin pattern (bloom-a ← surface-claim, bloom-b/c ← accent-soft, pollen ← accent-soft).
- paper surface + ink/accent colour roles
- lowercase voice across all headings and body text
- Archivo (sans) + JetBrains Mono (mono) + Caveat (handwritten marks) self-hosted woff2
- stepped motion clock (8fps), instant interactions (no smooth transitions)
- **fireflies text effect** on the masthead title — build-time port of the zoo's `fireflyParticles()` + `weatherText()`, using the same LCG for deterministic particle positions. Each glyph glows with `text-shadow: 0 0 0.5em var(--wx-pollen)` on a stepped 3s cycle, staggered per-glyph. 14 firefly motes wander and blink on two desynchronized clocks. No client-side JS (CSP-safe).
- opaque buttons with Ben-Day dot halftone, thick bottom border, instant press drop
- field-as-gutter pattern for any form fields
- pill marks for status indicators (boxed uppercase with dot)
- paper cards with claim background
- phyllotaxis dividers (sunflower seed head)
- paper tooth grain overlay (multiply blend, fractal noise)
- warm bloom (radial gradients, slow drift — using slate-mapped colours)
- reduced-motion: freeze all ambient fields, hide firefly particles, freeze glyph glow
- focus-visible: 2px solid accent outline, no blue rings
- selection: accent background, paper text

## Deviations (by exception only)

### Adapted

- **slate theme** replaces the cream baseline — the full token layer is overridden (7 zoo skin roles + all derived roles filled in). bloom/pollen remapped to slate accent-soft per the zoo's skin override pattern.
- **fireflies text effect** ported from the zoo's weather section to the masthead title — particles generated at build time (no JS), matching the CSP's `script-src 'none'`.
- zoo weather particles (wind/rain/snow/mist/etc.) disabled — only fireflies used; the BYOM site is static content with no weather theme switching.
- theme bar (skin switcher) omitted — the site ships one skin (slate); no user-selectable themes.
- Ben-Day dot screen on buttons kept; the halftone is rendered via radial-gradient (same as zoo).
- CSP uses `style-src 'self' 'unsafe-inline'` to allow build-time-generated inline styles (firefly particle positions). `script-src 'none'` remains — the strongest possible script policy. Inline styles on a static site with no user input are not an XSS vector.

### Omitted

- pigment coda (multiply blots) — no decorative graphic layering use case on a text-driven site.
- weather.css and weather-particles.mjs — no weather themes.
- theme-bar.mjs and themes.css — no skin switching.
- states.mjs and states.css — no async operations on a static site (reserved for if interactive features are added).

### Extended

- `.registry-list` — app cards rendered from registry.yaml; follows `component.card` recipe (paper card with claim background).
- `.badge-grid` — badge variant display; follows `material.surface.paper-grain` recipe for the panel.
- `.embed-snippet` — code blocks for copy-paste embeds; monospace (JetBrains Mono), paper-deep background, hairline border.

## Propagation log

- 2026-06-21 initial adoption: v0.1.0 — wired tokens.css, fonts, base/type/components/atmosphere/material styles into Astro layout. Slate theme override applied; fireflies effect ported to masthead title.
