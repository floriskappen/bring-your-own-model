# ROADMAP — BYOM v1.0.0

What it takes to ship the **full** v1 of BYOM — not an MVP. v1 is "done" when the constitution is a
clean, released, submodule-able artifact; the website is live and honest; the badge and registry are
real, usable interfaces; and at least one consuming app has proven the integration pattern end to end.

This roadmap is the bridge between the drafted content (currently staged in `temp_files/`) and a
released repo. Items are grouped into phases that roughly need to happen in order, but several can run
in parallel once the structure exists.

## Definition of done for v1

- An agent can land in the repo, read `AGENTS.md`, read `constitution/`, ignore `website/`, and
  produce a correct `BYOM-INTEGRATION.md` — without further explanation.
- The constitution is released at tag `v1.0.0` and consumable as a pinned git submodule.
- The website is deployed, lightweight, CSP-locked, and tells the honest safety story.
- The badge exists as a real artifact with copy-paste embed snippets and an honest claim boundary.
- The registry has a defined entry schema and at least the two seed apps listed.
- At least one of Bedrijfskompas / AI-laser has a real `BYOM-INTEGRATION.md` that the integration
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
│   └── 05-integration-guide.md
└── website/                    ← movement-facing static site
    └── ...
```

Tasks:

- [ ] Create `constitution/` and move the six drafted docs (`00`–`05`) from `temp_files/` into it.
- [ ] Move `AGENTS.md`, `CHANGELOG.md`, `VERSION` from `temp_files/` to the repo root.
- [ ] Decide the fate of the root `CONSTITUTION.md`. Recommended: once `constitution/` exists, replace
      `CONSTITUTION.md` with a thin index that links into the folder (or delete it and point the README
      at the folder). Avoid two canonical copies that can drift.
- [ ] Re-point `README.md` constitution links from `CONSTITUTION.md` to the `constitution/` files.
- [ ] Move `temp_files/COPY.md` to `website/` as the site's source copy (e.g. `website/COPY.md`).
- [ ] Delete `temp_files/` once everything is relocated.
- [ ] Cross-reference pass: every `01-…`/`02-…` reference inside the docs resolves; no dangling links.
- [ ] Confirm the agent-vs-website separation is obvious from the root (README + AGENTS both say it).

## Phase 1 — Constitution content finalization

The drafts are strong; this is a tightening pass, not a rewrite.

- [ ] Consistency pass across all six docs: one voice (plain, unhyped), consistent terminology
      (frontier/worker, "model category", "invariant N", "BYOM-INTEGRATION.md").
- [ ] Verify the six security invariants are stated identically wherever they appear (constitution,
      website safety copy, badge claims).
- [ ] Confirm the honest threat-model language is consistent in `02`, `04`, and the website's safety
      section — no doc overclaims relative to another.

## Phase 2 — Badge artifact

The badge is an external interface other apps embed. It needs to be a real, downloadable thing, not a
description.

- [ ] Design the glyph: a **socket / plug / connect** mark. Explicitly not a robot, not a key-as-chore.
- [ ] Produce SVG badge assets: light and dark variants, plus a small and a standard size.
- [ ] Define the badge link/markup contract: where it links (the constitution site / a stable URL),
      required `alt` text, and the canonical embed snippets (Markdown + HTML).
- [ ] Write the honest claim text that travels with the badge ("follows the pattern and invariants — not
      proof of safety"), matching `04-badge-and-registry.md`.
- [ ] Host the badge assets at a stable path so embeds don't break across releases.
- [ ] Add a favicon / OG image derived from the same glyph for the website.

## Phase 3 — Registry

Treat the registry entry schema as an external interface other apps depend on. Designed to be worth
it at N=1.

- [ ] Define the registry **entry schema**: required vs optional fields (e.g. name, URL, short
      description, which features are model-powered, model categories used, link to the app's
      `BYOM-INTEGRATION.md`, pinned constitution version, repo/source link).
- [ ] Choose a data format that drives the site (e.g. a `registry.json` / `registry.yaml` the website
      renders), so adding an app is a data edit, not a template edit.
- [ ] Seed the two entries: **Bedrijfskompas** and **AI-laser**.
- [ ] Define the submission process (PR-based: add an entry, CI validates it against the schema).
- [ ] Optional: a schema validator in CI so malformed entries can't merge.

## Phase 4 — Website build

Lightweight static site, built from `website/COPY.md`. Copy is **movement-neutral, third person**
(already decided in `COPY.md`). The site must eat its own dogfood: strict CSP, minimal third-party JS.

- [ ] Pick the static stack (recommend the simplest thing that ships: plain HTML/CSS or a minimal
      static generator — no heavy framework, in keeping with "minimal third-party JS").
- [ ] Build the pages/sections from `COPY.md`: hero, what it is, why it exists, the bigger idea,
      how it works, **safety (honest)**, the registry, footer.
- [ ] Registry page renders from the Phase 3 data file.
- [ ] Dedicated **security page** explaining the architecture and the honest threat model in full
      (more than the hero blurb).
- [ ] Badge page: shows the badge variants and the copy-paste embed snippets.
- [ ] Apply a strict CSP to the site itself and keep dependencies near zero — the site should model
      the invariants it preaches.
- [ ] Accessibility + responsive pass; favicon/OG from Phase 2.

## Phase 5 — Integration guide validation (the proof)

The integration pattern is the whole reusability bet. v1 isn't done until it's been run for real once.

- [ ] Author a real `BYOM-INTEGRATION.md` in **Bedrijfskompas** (or AI-laser) by following
      `05-integration-guide.md` literally — list model-powered features, categories, wizard wiring,
      invariant mapping, budget surfacing, pinned version.
- [ ] Feed every friction point back into `05-integration-guide.md` until the guide produces a correct
      doc without improvisation.
- [ ] Optional: ship a `BYOM-INTEGRATION.template.md` in the constitution to make authoring mechanical.
- [ ] Confirm the consuming app actually meets all six invariants — an explicit, auditable check per
      invariant (e.g. "key never sent to a first-party endpoint", "CSP present").

## Phase 6 — Versioning, license & release

- [ ] Add a `LICENSE` (OSS — the repo currently has none). Pick a code license for any site code and
      consider a content license (e.g. CC-BY) for the constitution prose; state the choice in README.
- [ ] Confirm `VERSION` = `v1.0.0` and `CHANGELOG.md` reflects the v1.0.0 scope.
- [ ] Document the submodule consumption flow in the README/integration guide: how a repo adds the
      submodule, pins the tag, and performs a deliberate version bump.
- [ ] Tag the release `v1.0.0` once Phases 0–5 are green. Submodule consumers pin this tag.
- [ ] Decide branch/tag hygiene so a pinned tag is immutable and `main` can move ahead.

---

## Cross-cutting / open decisions

- **Website voice:** decided — movement-neutral third person (`COPY.md`). No action.
- **Root `CONSTITUTION.md` vs `constitution/`:** resolve in Phase 0 (recommend thin index or removal).
- **Hosting:** pick a free static host (GitHub Pages / Cloudflare Pages / Netlify) and wire a build/deploy
  step; ensure the deploy preserves the strict CSP.
- **Domain:** decide whether v1 gets a custom domain or ships on the host's subdomain.
- **Badge hosting stability:** the badge URL is a long-lived external contract — choose a path that
  won't churn across releases.

## Explicitly out of scope for v1 (future)

- Direct-to-provider support (OpenAI/Anthropic APIs directly) — v1 is OpenRouter-only.
- A MetaMask-style privileged-chrome browser extension for real phishing resistance.
- A thin shared client library (npm / pub) — allowed by the constitution, but not a v1 deliverable.
- Any monetization or dev-side B2B layer.
