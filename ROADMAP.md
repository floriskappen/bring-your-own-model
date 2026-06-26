# ROADMAP — BYOM v1.0.0

What it takes to ship the **full** v1 of BYOM — not an MVP. v1 is "done" when the constitution is a
clean, released, submodule-able artifact; the website is live and honest; the badge and registry are
real, usable interfaces; and at least one consuming app has proven the integration pattern end to end.

This roadmap is the bridge between the drafted content and a released repo. Items are grouped into
phases that roughly need to happen in order, but several can run in parallel once the structure exists.

> **Current release: `v0.1.0`** — a pre-v1 cut. Constitution content (Phases 0–4) is complete; this tag
> exists so a consuming app can submodule it and run Phase 5 (integration-guide validation) against a
> real app. Everything below remains the v1.0.0 target.

## Definition of done for v1

- An agent can land in the repo, read `AGENTS.md`, read `constitution/`, ignore `website/`, and
  produce a correct `BYOM-INTEGRATION.md` — without further explanation.
- The constitution is released at tag `v1.0.0` and consumable as a pinned git submodule.
- The website is deployed, lightweight, CSP-locked, and tells the honest safety story.
- The badge exists as a real artifact with copy-paste embed snippets and an honest claim boundary.
- The registry has a defined entry schema and at least the two seed apps listed.
- At least one of Bedrijfskompas / e-lezer has a real `BYOM-INTEGRATION.md` that the integration
  guide actually produced — the guide is validated against reality, not just written.

---

## Phase 0 — Structure & scaffolding

Turn the staged drafts into the real repo layout. The brief's target tree:

```
/
├── README.md                   ← pitch + agent signpost            (done, will re-point links)
├── AGENTS.md                   ← agent entry point                 (from temp_files)
├── ROADMAP.md                  ← this file
├── CHANGELOG.md                ← from temp_files
├── VERSION                     ← v1.0.0 (from temp_files)
├── LICENSE                     ← NEW (see Phase 6)
├── constitution/               ← THE RELEASE ARTIFACT
│   ├── 00-philosophy.md
│   ├── 01-provider-model.md
│   ├── 02-security-invariants.md
│   ├── 03-wizard-ux-contract.md
│   ├── 04-badge-and-registry.md
│   ├── 05-integration-guide.md
│   └── 06-cost-transparency.md
└── website/                    ← movement-facing static site
    └── ...
```

Tasks:

- [x] Create `constitution/` and move the six drafted docs (`00`–`05`) from `temp_files/` into it.
- [x] Move `AGENTS.md`, `CHANGELOG.md`, `VERSION` from `temp_files/` to the repo root.
- [x] Decide the fate of the root `CONSTITUTION.md`. Kept as a **thin index** — links only, no
      normative content, so there is one canonical copy in `constitution/` and nothing to drift.
- [x] Re-point `README.md` constitution links from `CONSTITUTION.md` to the `constitution/` files.
- [x] Move `temp_files/COPY.md` to `website/` as the site's source copy (e.g. `website/COPY.md`).
- [x] Delete `temp_files/` once everything is relocated.
- [x] Cross-reference pass: every `01-…`/`02-…` reference inside the docs resolves; no dangling links.
- [x] Confirm the agent-vs-website separation is obvious from the root (README + AGENTS both say it).

## Phase 1 — Constitution content finalization

The drafts are strong; this is a tightening pass, not a rewrite.

- [x] Consistency pass across all seven docs: one voice (plain, unhyped), consistent terminology
      (frontier/worker, "model category", "invariant N", "BYOM-INTEGRATION.md").
- [x] Verify the six security invariants are stated identically wherever they appear (constitution,
      website safety copy, badge claims).
- [x] Confirm the honest threat-model language is consistent in `02`, `04`, and the website's safety
      section — no doc overclaims relative to another.

## Phase 2 — Badge artifact

The badge is an external interface other apps embed. It needs to be a real, downloadable thing, not a
description.

- [x] Design the glyph: a **socket / plug / connect** mark. Explicitly not a robot, not a key-as-chore.
- [x] Produce SVG badge assets: light and dark variants, plus a small and a standard size.
- [x] Define the badge link/markup contract: where it links (the constitution site / a stable URL),
      required `alt` text, and the canonical embed snippets (Markdown + HTML).
- [x] Write the honest claim text that travels with the badge ("follows the pattern and invariants — not
      proof of safety"), matching `04-badge-and-registry.md`.
- [x] Host the badge assets at a stable path so embeds don't break across releases.
- [x] Add a favicon / OG image derived from the same glyph for the website.

## Phase 3 — Registry

Treat the registry entry schema as an external interface other apps depend on. Designed to be worth
it at N=1.

- [x] Define the registry **entry schema**: required vs optional fields (e.g. name, URL, short
      description, which features are model-powered, model categories used, link to the app's
      `BYOM-INTEGRATION.md`, pinned constitution version, repo/source link).
- [x] Choose a data format that drives the site (e.g. a `registry.json` / `registry.yaml` the website
      renders), so adding an app is a data edit, not a template edit.
- [ ] Add entries as apps publish (**Bedrijfskompas**, **e-lezer**) — the registry ships empty
      until then; adding an app is a data edit.
- [x] Define the submission process (PR-based: add an entry, CI validates it against the schema).
- [x] Optional: a schema validator in CI so malformed entries can't merge.

## Phase 4 — Website build

Lightweight static site, built from `website/COPY.md`. Copy is **movement-neutral, third person**
(already decided in `COPY.md`). The site must eat its own dogfood: strict CSP, minimal third-party JS.

- [x] Pick the static stack (recommend the simplest thing that ships: plain HTML/CSS or a minimal
      static generator — no heavy framework, in keeping with "minimal third-party JS").
- [x] Build the pages/sections from `COPY.md`: hero, what it is, why it exists, the bigger idea,
      how it works, **safety (honest)**, the registry, footer.
- [x] Registry page renders from the Phase 3 data file.
- [x] Dedicated **security page** explaining the architecture and the honest threat model in full
      (more than the hero blurb).
- [x] Badge page: shows the badge variants and the copy-paste embed snippets.
- [x] Apply a strict CSP to the site itself and keep dependencies near zero — the site should model
      the invariants it preaches.
- [x] Accessibility + responsive pass; favicon/OG from Phase 2.

## Phase 5 — Integration guide validation (the proof)

The integration pattern is the whole reusability bet. v1 isn't done until it's been run for real once.

- [ ] Author a real `BYOM-INTEGRATION.md` in **Bedrijfskompas** (or e-lezer) by following
      `05-integration-guide.md` literally — list model-powered features, categories, wizard wiring,
      invariant mapping, budget surfacing, pinned version.
- [ ] Feed every friction point back into `05-integration-guide.md` until the guide produces a correct
      doc without improvisation.
- [x] Ship a `BYOM-INTEGRATION.template.md` (+ worked example) in the constitution to make authoring mechanical (promoted from Optional to required).
- [ ] Confirm the consuming app actually meets all six invariants — an explicit, auditable check per
      invariant (e.g. "key never sent to a first-party endpoint", "CSP present").

## Phase 6 — Versioning, license & release

- [x] Add a `LICENSE` — GPL-3.0-or-later, applied to the whole repo (code, site, and constitution
      prose). Stated in README.
- [ ] Confirm `VERSION` = `v1.0.0` and `CHANGELOG.md` reflects the v1.0.0 scope.
- [ ] Document the submodule consumption flow in the README/integration guide: how a repo adds the
      submodule, pins the tag, and performs a deliberate version bump.
- [ ] Tag the release `v1.0.0` once Phases 0–5 are green. Submodule consumers pin this tag.
- [ ] Decide branch/tag hygiene so a pinned tag is immutable and `main` can move ahead.

---

## Cross-cutting / open decisions

- **Website voice:** decided — movement-neutral third person (`COPY.md`). No action.
- **Root `CONSTITUTION.md` vs `constitution/`:** resolved in Phase 0 — `CONSTITUTION.md` kept as a
  thin index linking into `constitution/`, no normative content.
- **Hosting:** pick a free static host (GitHub Pages / Cloudflare Pages / Netlify) and wire a build/deploy
  step; ensure the deploy preserves the strict CSP.
- **Domain:** decided — `byom.flkp.nl`. The badge link target and canonical/OG URLs derive from it (see `constitution/badge/README.md`).
- **Badge hosting stability:** resolved — the served path `/assets/badge/` is stable across releases, and the badge contract moved to `constitution/badge/README.md` (out of `website/`, so implementing agents can read it).

## Explicitly out of scope for v1 (future)

- Direct-to-provider support (OpenAI/Anthropic APIs directly) — v1 is OpenRouter-only.
- A MetaMask-style privileged-chrome browser extension for real phishing resistance.
- A thin shared client library (npm / pub) — allowed by the constitution, but not a v1 deliverable.
- Any monetization or dev-side B2B layer.
