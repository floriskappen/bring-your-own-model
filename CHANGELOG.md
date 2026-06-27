# Changelog

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
