# BYOM-INTEGRATION

How this app implements the BYOM constitution (pinned at `<submodule-path>`). Authored by following [`constitution/05-integration-guide.md`](./05-integration-guide.md). Copy this template, fill in each section, and remove the instructional prompts (the `<…>` placeholders). The constitution is the authority; this document records the app-specific implementation, conformance state, and deviations.

Keep it honest — no hype, no overclaiming. See [`BYOM-INTEGRATION.example.md`](./BYOM-INTEGRATION.example.md) for a worked instance of this form.

## App name and one-line description

<app name> — <one sentence: what the app is>

## The free core

<Which features work with no model connected. State plainly if the whole app is model-dependent; the only requirement is that features which do not need inference are not gated behind a key.>

## Model-powered features and their categories

| Feature | Category (frontier / worker) | Why |
|---|---|---|
| <feature> | <category> | <why this category> |

Default to **worker** unless frontier is genuinely required. Record the category-choice surface — where the user picks a model within the feature's declared category (per `01` and `05` seam 2). No minimum count is prescribed; the bar is that the user chooses within the category and the chooser structurally allows adding a model without a second migration.

## How to get and connect a key, for this app

<Where the wizard is reached, and the concrete path for a first-time key holder — what a key is, where to get one (OpenRouter in v1, with a concrete link), the provider-side spend limit, and connecting it with the persistence choice made explicit. Per seam 1 and `03`'s acceptance floor: before the key input, surface what connecting does and costs, where to get a key, the spend limit, and the honest threat model, in the active locale.>

## Key handling specifics

- **In-memory vs opt-in persistence.** <how the key is held; the opt-in for local persistence>
- **CSP posture.** <point to the policy; confirm the load-bearing directives per inv 3 — `script-src` without `'unsafe-inline'`/`'unsafe-eval'`/`*`, `connect-src` a closed allowlist; record any concession (e.g. `blob:` workers, style injection) with per-origin justification>
- **Third-party JS audit (inv 4).** <enumerate and justify every runtime dependency; each exfil-bounded by the inv-3 CSP; non-exfil risks (spoofing, DoS) noted as out of scope>
- **Direct browser → provider; no dev backend.**

## Where spend and budget appear in the UI

<How the user sets an allowance and sees spend — the budget ceiling (inv 6) and the cost-transparency surface (`06`): live per-request cost from real usage (pending → landed, never fabricated), per-request attribution, a local on-device spend history the developer never sees, and a leave warning during in-flight paid work.>

## What happens when the budget ceiling is hit

<Behavior when the allowance is reached — requests refused with a clear message, no silent failure. Note the in-flight-aware cumulative check (inv 6 acceptance: two concurrent requests whose combined estimates exceed the allowance → the second refused before its fetch). A null allowance means no ceiling.>

## How each security invariant is met

| # | Invariant | Status | Where |
|---|---|---|---|
| 1 | In-memory by default | <met / partial / deviation> | <where> |
| 2 | Key never sent to dev servers | | |
| 3 | Strict CSP | | |
| 4 | Minimal third-party JS | | |
| 5 | Never log key / key-linked prompts | | |
| 6 | Pre-flight estimation + enforceable budget | | |

Data egress (key and prompts go only to the provider; no third-party analytics/telemetry on either): <met / partial / deviation> — <where>.

## Deviations from the constitution, and why

<Each deviation, with its reason. Per `05`, this section is the set of unchecked conformance-checklist boxes (each with its reason) — the two must stay in sync, so a reader can reconstruct the checklist state from this list alone. If none, state "none." Common examples: a pre-existing key-centric layer name (BYOK vs BYOM) recorded as an alias; a badge/registry listing deferred pending externals (live app URL, public source URL).>

## The pinned constitution version

- **Constitution:** BYOM
- **Pinned version:** `<vX.Y.Z>`
- **Pinned commit:** `<sha>`
- **Submodule path:** `<vendor/byom>`

## Propagation log

<One entry per constitution-version advance. Append a new entry each time the pinned submodule version is bumped; describe what changed in the app at each step.>

- `<none -> vX.Y.Z>` (<date>): <initial adoption — submodule added, doc authored, deviations recorded.>
