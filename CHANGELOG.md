# Changelog

## v1.0.0

First release of the BYOM constitution.

- Philosophy and movement framing.
- Provider model: OpenRouter-only for v1; request model *categories* (frontier / worker), not specific models.
- Security invariants (mandatory): in-memory by default with opt-in persistence, key never sent to developer's servers, strict CSP, minimal third-party JS, no logging of key or key-linked prompts, pre-flight token estimation with enforceable user-set budget limits.
- Wizard UX contract.
- Badge and registry, with honest limits on what the badge can claim.
- Integration guide and the `BYOM-INTEGRATION.md` pattern for consuming repos.
- Cost transparency (`06`): live cost from real usage, per-request attribution, local spend history, no lost work.
