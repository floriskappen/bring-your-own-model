# Changelog

## v0.1.0

First pre-v1 cut of the BYOM constitution. Released so a consuming app can pin it as a git submodule
and validate the integration guide (ROADMAP Phase 5) against a real app. Not v1: the integration
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

## v1.0.0 (target, unreleased)

First release of the BYOM constitution.

- Philosophy and movement framing.
- Provider model: OpenRouter-only for v1; request model *categories* (frontier / worker), not specific models.
- Security invariants (mandatory): in-memory by default with opt-in persistence, key never sent to developer's servers, strict CSP, minimal third-party JS, no logging of key or key-linked prompts, pre-flight token estimation with enforceable user-set budget limits.
- Wizard UX contract.
- Badge and registry, with honest limits on what the badge can claim.
- Integration guide and the `BYOM-INTEGRATION.md` pattern for consuming repos.
- Cost transparency (`06`): live cost from real usage, per-request attribution, local spend history, no lost work.
