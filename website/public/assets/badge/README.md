# BYOM badge — artifact & embed contract

This is the **source of truth** for the BYOM badge artifact. The constitution defines the badge's
*meaning and claim boundary* at the idea level in
[`../../constitution/04-badge-and-registry.md`](../../constitution/04-badge-and-registry.md). This file
defines the *concrete artifact*: the files, the link target, the required `alt` text, the canonical
embed snippets, and the honest claim text that travels with the badge. The website's badge page
(Phase 4) renders from this file.

## The glyph

A **plug-into-socket** interlock: a socket body, a narrow neck, and a plug body, joined into one
silhouette. It reads as "bring and connect your own" — deliberately not a robot (reads as "agent,"
the wrong meaning) and not a key-as-chore (too literal and joyless), per the constitution's icon
direction. Monochrome, legible at 16px.

## File inventory

All assets live under `website/assets/`. Badge assets live under the **stable path**
`website/assets/badge/` — this path is a long-lived external contract and must not churn across
releases (see "Stability" below).

| File | Purpose | Size |
| --- | --- | --- |
| `badge/byom-badge-light.svg` | Standard badge, light | 168 × 44 |
| `badge/byom-badge-dark.svg` | Standard badge, dark | 168 × 44 |
| `badge/byom-badge-light-small.svg` | Small badge, light | 96 × 26 |
| `badge/byom-badge-dark-small.svg` | Small badge, dark | 96 × 26 |
| `favicon.svg` | Favicon / monogram | 32 × 32 |
| `og-image.svg` | Open Graph image (source) | 1200 × 630 |

Each badge SVG is self-contained (no external references, no scripts, no external fonts) so it is
safe under a strict CSP and embeds anywhere.

## Link target

The badge links to the **BYOM site root** — the constitution site that explains the pattern, the
invariants, and the registry. The path is the site root (`/`); it is stable.

> **Host placeholder.** The site domain is not yet chosen (see ROADMAP "Cross-cutting / open
> decisions — Domain"). The embed snippets below use `https://BYOM-SITE/` as a placeholder. When the
> domain is decided, replace it everywhere in this file and in any rendered badge page — the paths
> and filenames do not change.

## Required `alt` text

Every embed **must** carry accessible alt text. The canonical alt string:

> BYOM badge — Bring Your Own Model: follows the pattern and security invariants, not proof of safety.

This matches the claim boundary in `04-badge-and-registry.md`: the badge says an app *follows the
pattern and the invariants*; it does **not** guarantee safety.

## Canonical embed snippets

### Markdown

Standard (light):

```markdown
[![BYOM badge](https://BYOM-SITE/assets/badge/byom-badge-light.svg)](https://BYOM-SITE/)
```

Standard (dark):

```markdown
[![BYOM badge](https://BYOM-SITE/assets/badge/byom-badge-dark.svg)](https://BYOM-SITE/)
```

Small (light):

```markdown
[![BYOM badge](https://BYOM-SITE/assets/badge/byom-badge-light-small.svg)](https://BYOM-SITE/)
```

Small (dark):

```markdown
[![BYOM badge](https://BYOM-SITE/assets/badge/byom-badge-dark-small.svg)](https://BYOM-SITE/)
```

> Markdown alt text cannot contain parentheses inside `![...]` without breaking the link syntax. Use
> the short alt `BYOM badge` in Markdown embeds; restate the full honest claim (below) in the
> surrounding page text so the "not proof of safety" boundary travels with the badge wherever it
> appears.

### HTML

Standard (light):

```html
<a href="https://BYOM-SITE/" rel="noopener">
  <img src="https://BYOM-SITE/assets/badge/byom-badge-light.svg"
       alt="BYOM badge — Bring Your Own Model: follows the pattern and security invariants, not proof of safety."
       width="168" height="44" loading="lazy" decoding="async">
</a>
```

Standard (dark):

```html
<a href="https://BYOM-SITE/" rel="noopener">
  <img src="https://BYOM-SITE/assets/badge/byom-badge-dark.svg"
       alt="BYOM badge — Bring Your Own Model: follows the pattern and security invariants, not proof of safety."
       width="168" height="44" loading="lazy" decoding="async">
</a>
```

Small (light):

```html
<a href="https://BYOM-SITE/" rel="noopener">
  <img src="https://BYOM-SITE/assets/badge/byom-badge-light-small.svg"
       alt="BYOM badge — Bring Your Own Model: follows the pattern and security invariants, not proof of safety."
       width="96" height="26" loading="lazy" decoding="async">
</a>
```

Small (dark):

```html
<a href="https://BYOM-SITE/" rel="noopener">
  <img src="https://BYOM-SITE/assets/badge/byom-badge-dark-small.svg"
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

`website/assets/badge/<filename>` is a **long-lived external contract**. Other apps embed these URLs.
The filenames and the `assets/badge/` path must not change across releases. To evolve the badge,
add new files (e.g. a new size or a `v2` suffix) rather than repurposing existing paths. The link
target (site root `/`) is likewise stable.

## Favicon and OG image

- `favicon.svg` is the monogram (the mark on a rounded square). Reference it from the site's
  `<link rel="icon">`. For broad browser support a rasterized `favicon.ico`/`favicon-32.png` may be
  added in Phase 4; the SVG is the source.
- `og-image.svg` is the Open Graph image **source** (1200 × 630). Several social platforms do not
  render SVG OG images — the Phase 4 build step should rasterize it to `og-image.png` and reference
  the PNG in `<meta property="og:image">`. The SVG remains the editable source for the glyph.
