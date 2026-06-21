# BYOM Constitution

The normative constitution lives in [`constitution/`](./constitution/), one file per topic. This file
is a **thin index** — it holds no normative content of its own, only links, so there is one canonical
copy (the folder) and nothing here to drift out of sync with it.

1. [Philosophy](./constitution/00-philosophy.md) — what BYOM is and why
2. [Provider model](./constitution/01-provider-model.md) — v1: OpenRouter; request a *category* (frontier / worker), not a specific model
3. [Security invariants](./constitution/02-security-invariants.md) — **mandatory**
4. [Wizard UX contract](./constitution/03-wizard-ux-contract.md)
5. [Badge and registry](./constitution/04-badge-and-registry.md)
6. [Integration guide](./constitution/05-integration-guide.md) — how a consuming repo authors its own `BYOM-INTEGRATION.md`

Implementing agents should start at [`AGENTS.md`](./AGENTS.md). The [`website/`](./website/) directory
is movement-facing and is not part of the release artifact an implementing agent reads.
