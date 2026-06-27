# Changelog

## v1.2.0

Badge mark redesign and a themeable inline mark. No normative invariant or contract change — the
badge's served paths, dimensions, link target, and `alt` text are unchanged, so existing embeds keep
working and pick up the new look on the next site deploy. The rest is additive: a bare minimal mark
and a `currentColor` variant for inline use.

### Badge

- **New glyph.** The plug→socket glyph is replaced by the BYOM mark: two overlapping squares — the app
  (ink) and the model you bring (accent), deepening where they overlap (the design system's
  ink-and-pigment "multiply" material, expressed as a logo). Square corners, two-tone slate. Updated
  the icon direction in `04-badge-and-registry.md` and "The glyph" in `badge/README.md` to match
  (both previously described a plug into a two-slot socket).
- **Minimal + themeable marks.** Added `byom-mark.svg` / `byom-mark-dark.svg` — the bare mark with no
  frame or wordmark, legible down to ~12px for tight UI spots — and `byom-mark-currentColor.svg`,
  which inherits the host's text colour when inlined. New "Theming the inline mark" section in
  `badge/README.md`: the badge stays canonical (it is a recognition mark), while the inline mark may
  follow the host theme via `currentColor` or two CSS variables. Inventory table updated.

### Website (movement-facing, not part of the release artifact)

- All brand SVGs (favicon, badges, marks, OG image) now generate from one canonical mark via
  `website/scripts/gen-brand.mjs`, wired into `prebuild` ahead of the rasterizer, so the variants
  cannot drift apart again. Badges dropped the app-store-style underline bar for a hairline border and
  square corners; the footer mark (previously a stray `●—◗` text glyph) now uses the real mark.

## v1.1.0

Integration-doc placement convention. No normative invariant or contract change — a placement
clarification so the consuming app's `BYOM-INTEGRATION.md` is less of a root-eyesore. The registry's
`integration_doc_url` field was already location-agnostic; discovery rides on `AGENTS.md` pointing at
the doc either way.

### Constitution

- **Integration-doc placement.** `BYOM-INTEGRATION.md` is now conventionally authored at
  `docs/BYOM-INTEGRATION.md` in the consuming repo; the repo root remains an acceptable alternative.
  Updated `05-integration-guide.md` (prose and conformance checklist), `AGENTS.md`, and `README.md`.

### Registry

- Field descriptions in `registry.schema.json` and `registry/README.md` updated to match. No required
  fields or validation rules changed; the registry entry `schema_version` stays `v1.0.0`.

## v0.1.0

First pre-v1 cut of the BYOM constitution. Released so a consuming app can pin it as a git submodule
and validate the integration guide (Phase 5) against a real app. Not v1: the integration
guide has not yet been proven end-to-end.

- Constitution: all seven chapters drafted and given a consistency pass.
  - Philosophy and movement framing.
  - Provider model: OpenRouter-only for v1; request model *categories* (frontier / worker), not specific models.
  - Security invariants (mandatory): in-memory by default with opt-in persistence, key never sent to developer's servers, strict CSP, minimal third-party JS, no logging of key or key-linked prompts, pre-flight token estimation with enforceable user-set budget limits.
  - Wizard UX contract.
  - Badge and registry, with honest limits on what the badge can claim; registry ships empty with a schema and CI validator.
  - Integration guide and the `BYOM-INTEGRATION.md` pattern for consuming repos.
  - Cost transparency (`06`): live cost from real usage, per-request attribution, local spend history, no lost work.
- Movement-facing website built (not part of the release artifact).
- Licensed under GPL-3.0-or-later.

### Not in v0.1.0 (tracked for v1.0.0)

- Integration guide not yet validated against a real consuming app (Phase 5).
- `v1.0.0` tag not cut.

## v1.0.0

First release of the BYOM constitution. The integration guide has been validated end-to-end against a
real consuming app (Bedrijfskompas) — every logged friction point is resolved in the constitution.

### Constitution

- All seven chapters (philosophy, provider model, security invariants, wizard UX contract, badge &
  registry, integration guide, cost transparency) with a consistency pass.
- **Acceptance layer:** every security invariant and every cost-transparency principle now carries an
  observable, stack-agnostic `**Acceptance:**` scenario — the missing bridge between the idea-level
  constitution and app-level implementation. The wizard and the provider-spend-limit carry testable
  floors too.
- **Integration-guide template + worked example:** `constitution/BYOM-INTEGRATION.template.md`
  (11-section skeleton) and `constitution/BYOM-INTEGRATION.example.md` ship in the constitution;
  authoring a `BYOM-INTEGRATION.md` is now mechanical. A propagation-log section (11) is prescribed.
- **Estimation & pricing guidance:** a blessed character-ratio token heuristic (guard-only) and a
  null-pricing fallback pattern (conservative, guard-only, never displayed) resolve the inv-6-vs-inv-4
  tension and the unknown-pricing case.
- **Cost-surface reference pattern:** a non-normative appendix to `06` describes the live-cost
  presentation lifecycle (decoupled from the feature, persistent-until-dismissed, burst-grouped,
  collapsible pill ⇄ panel).
- **Persistent-connection-surface clarification:** "persistent" = always-reachable in-session; a
  same-page surface is compliant; `sessionStorage` bridging is a deviation to record.
- **Terminology:** BYOM (model-centric) is canonical; a consuming app's pre-existing key-centric name
  (e.g. "BYOK") may be kept as an alias.

### Badge & registry

- The badge contract and registry schema/README moved from `website/` to `constitution/badge/` and
  `constitution/registry/` — resolving the `AGENTS.md` "ignore `website/`" contradiction (an
  implementing agent can now discover the embed/registry contracts).
- The constitution site domain is decided: `byom.flkp.nl` (badge link target + canonical/OG URLs).
- Registry ships empty with a schema and CI validator; entries are added as apps publish.

### Other

- Movement-facing website built (not part of the release artifact).
- Licensed under GPL-3.0-or-later.
