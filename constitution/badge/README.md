# BYOM badge — artifact & embed contract

This is the **source of truth** for the BYOM badge artifact. The constitution defines the badge's
*meaning and claim boundary* at the idea level in
[`04-badge-and-registry.md`](../04-badge-and-registry.md). This file
defines the *concrete artifact*: the files, the link target, the required `alt` text, the canonical
embed snippets, and the honest claim text that travels with the badge. The website's badge page
(Phase 4) renders from this file.

## The glyph

**Two overlapping squares**: the app (ink) and the model you bring (accent), with the overlap painted
a deepened tone — colour darkening where two pigments stack, the design system's ink-and-pigment
material. It says "bring your own model" as two things combining — deliberately not a robot (reads as
"agent," the wrong meaning) and not a key-as-chore (too literal and joyless), per the constitution's
icon direction. Two-tone slate, square-cornered, legible down to 16px. Every badge, the favicon, the
bare mark, and the OG image are generated from this one mark by `website/scripts/gen-brand.mjs`, so
the variants cannot drift apart.

## File inventory

The source assets live in the repo under `website/public/assets/`; Astro copies `public/` to the
site root, so they are **served** at `/assets/…`. Badge assets live under the **stable served path**
`/assets/badge/` — this path is a long-lived external contract and must not churn across releases
(see "Stability" below).

| File (repo path under `website/public/assets/`) | Purpose | Size | Origin |
| --- | --- | --- | --- |
| `badge/byom-badge-light.svg` | Standard badge, light | 168 × 44 | **generated** |
| `badge/byom-badge-dark.svg` | Standard badge, dark | 168 × 44 | **generated** |
| `badge/byom-badge-light-small.svg` | Small badge, light | 96 × 26 | **generated** |
| `badge/byom-badge-dark-small.svg` | Small badge, dark | 96 × 26 | **generated** |
| `badge/byom-mark.svg` | Bare mark, light (minimal variant) | 24 × 24 | **generated** |
| `badge/byom-mark-dark.svg` | Bare mark, dark (minimal variant) | 24 × 24 | **generated** |
| `badge/byom-mark-currentColor.svg` | Bare mark, `currentColor` (themeable inline) | 24 × 24 | **generated** |
| `favicon.svg` | Favicon / monogram | 32 × 32 | **generated** |
| `og-image.svg` | Open Graph image (source) | 1200 × 630 | **generated** |
| `og-image.png` | Open Graph image (delivered) | 1200 × 630 | **generated** |
| `favicon-32.png` | PNG favicon fallback | 32 × 32 | **generated** |
| `apple-touch-icon.png` | iOS home-screen icon | 180 × 180 | **generated** |

The brand **SVGs** are produced from the single canonical mark by `website/scripts/gen-brand.mjs`;
the **PNGs** are then rasterized from `favicon.svg` and `og-image.svg` by
`website/scripts/raster-assets.mjs`. Both run automatically, in that order, as the `prebuild` step of
`npm run build` (or on demand via `npm run brand` / `npm run raster`). All outputs are committed so
the repo is self-contained, and regenerated on every build so the variants never drift from the mark.

The bare mark (`byom-mark.svg`) is the **minimal variant** — the glyph with no frame or wordmark, for
showing the pattern lightly inside a UI where space is tight. It stays legible down to ~12px.

## Theming the inline mark

**The badge stays canonical — do not recolour it.** The badge is a recognition mark: its value is
that it looks the same across every app, so a returning user recognises the pattern (the same reason
"verified" marks and the OSI logo are fixed). Recolouring the badge to an app's palette turns a shared
signal into decoration. The badge is also shipped to be embedded via `<img src>` for strict-CSP
safety, and an `<img>`-loaded SVG is an isolated document that cannot read the host page's
`currentColor` or CSS variables — so it does not inherit a theme even if you try.

The **bare mark used inline in an app's own chrome** is a different case — there it is a lightweight
"BYOM-powered" affordance, not the trust claim, and matching the host theme is reasonable. To theme
it, the app must **inline** the SVG into its DOM (not load it via `<img>`). Two supported ways:

- **`currentColor` (monochrome).** Use `byom-mark-currentColor.svg`; it inherits the surrounding text
  colour. The app square is drawn at half opacity so the two-square read survives in one colour. One
  file works in both light and dark UIs.
- **Two CSS variables (full two-tone).** Inline `byom-mark.svg` and map its fills to your own tokens:

  ```svg
  <rect x="2"  y="8" width="12" height="12" fill="var(--byom-app, #1B2028)"/>
  <rect x="10" y="4" width="12" height="12" fill="var(--byom-model, #4D6483)"/>
  <rect x="10" y="8" width="4"  height="8"  fill="var(--byom-app, #1B2028)"/>
  ```

  The app overrides `--byom-app` (its ink) and `--byom-model` (its accent); the defaults are BYOM's
  slate. This keeps the deepened-overlap depth of the canonical mark.

Each badge SVG is self-contained (no external references, no scripts, no external fonts) so it is
safe under a strict CSP and embeds anywhere.

## Link target

The badge links to the **BYOM site root** — the constitution site that explains the pattern, the
invariants, and the registry. The path is the site root (`/`); it is stable.

> **Domain.** The constitution site is `https://byom.flkp.nl/`. The embed snippets below use it as
> the link target and the asset origin. The served path (`/assets/badge/…`) and filenames are a
> long-lived external contract and do not change across releases; the domain is likewise stable.

## Required `alt` text

Every embed **must** carry accessible alt text. The canonical alt string:

> BYOM badge — Bring Your Own Model: follows the pattern and security invariants, not proof of safety.

This matches the claim boundary in `04-badge-and-registry.md`: the badge says an app *follows the
pattern and the invariants*; it does **not** guarantee safety.

## Canonical embed snippets

### Markdown

Standard (light):

```markdown
[![BYOM badge](https://byom.flkp.nl/assets/badge/byom-badge-light.svg)](https://byom.flkp.nl/)
```

Standard (dark):

```markdown
[![BYOM badge](https://byom.flkp.nl/assets/badge/byom-badge-dark.svg)](https://byom.flkp.nl/)
```

Small (light):

```markdown
[![BYOM badge](https://byom.flkp.nl/assets/badge/byom-badge-light-small.svg)](https://byom.flkp.nl/)
```

Small (dark):

```markdown
[![BYOM badge](https://byom.flkp.nl/assets/badge/byom-badge-dark-small.svg)](https://byom.flkp.nl/)
```

> Markdown alt text cannot contain parentheses inside `![...]` without breaking the link syntax. Use
> the short alt `BYOM badge` in Markdown embeds; restate the full honest claim (below) in the
> surrounding page text so the "not proof of safety" boundary travels with the badge wherever it
> appears.

### HTML

Standard (light):

```html
<a href="https://byom.flkp.nl/" rel="noopener">
  <img src="https://byom.flkp.nl/assets/badge/byom-badge-light.svg"
       alt="BYOM badge — Bring Your Own Model: follows the pattern and security invariants, not proof of safety."
       width="168" height="44" loading="lazy" decoding="async">
</a>
```

Standard (dark):

```html
<a href="https://byom.flkp.nl/" rel="noopener">
  <img src="https://byom.flkp.nl/assets/badge/byom-badge-dark.svg"
       alt="BYOM badge — Bring Your Own Model: follows the pattern and security invariants, not proof of safety."
       width="168" height="44" loading="lazy" decoding="async">
</a>
```

Small (light):

```html
<a href="https://byom.flkp.nl/" rel="noopener">
  <img src="https://byom.flkp.nl/assets/badge/byom-badge-light-small.svg"
       alt="BYOM badge — Bring Your Own Model: follows the pattern and security invariants, not proof of safety."
       width="96" height="26" loading="lazy" decoding="async">
</a>
```

Small (dark):

```html
<a href="https://byom.flkp.nl/" rel="noopener">
  <img src="https://byom.flkp.nl/assets/badge/byom-badge-dark-small.svg"
       alt="BYOM badge — Bring Your Own Model: follows the pattern and security invariants, not proof of safety."
       width="96" height="26" loading="lazy" decoding="async">
</a>
```

## Honest claim text that travels with the badge

Restate this near the badge wherever it is shown (footer, about page, badge page), matching
`04-badge-and-registry.md` and `02-security-invariants.md`:

> **This app follows the BYOM pattern and security invariants. The badge is not proof of safety —
> in-page UI can always be cloned by a malicious site. Browser-local keys are a privacy and control
> win, not a cryptographic guarantee against a determined attacker.**

## Stability

The served path `/assets/badge/<filename>` is a **long-lived external contract**. Other apps embed
these URLs. The filenames and the `/assets/badge/` path must not change across releases. To evolve
the badge, add new files (e.g. a new size or a `v2` suffix) rather than repurposing existing paths.
The link target (site root `/`) is likewise stable.

## Favicon and OG image

- `favicon.svg` is the monogram (the mark on a rounded square). It is referenced from the site's
  `<link rel="icon">`, with `favicon-32.png` as a PNG fallback and `apple-touch-icon.png` (180 × 180)
  for iOS — both rasterized from the SVG by the build (see "File inventory").
- `og-image.svg` is the Open Graph **source** (1200 × 630), generated alongside the badges from the
  canonical mark by `gen-brand.mjs` (edit the layout there, not the SVG). Because several social
  platforms and chat unfurlers do not render SVG OG images, the build rasterizes it to `og-image.png`,
  and `<meta property="og:image">` references the PNG. The raster step inlines the design-system font
  so the wordmark renders correctly without a system-font fallback.
