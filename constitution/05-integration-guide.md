# Integration guide

This document tells an agent or developer how to apply BYOM inside a specific application — and specifically how to author that application's own **`BYOM-INTEGRATION.md`**.

This mirrors how a shared design system works: the design system itself is generic, and each consuming repo gets a document describing how the design system is applied *in that repo*. BYOM follows the same shape.

## The division of responsibility

- **This constitution** stays idea-level and stack-agnostic. It defines the philosophy, the provider model, the security invariants, the wizard contract, cost transparency, and the badge/registry.
- **The consuming application** owns the technical implementation — framework, libraries, exact code. None of that belongs in this constitution.
- **The bridge between them** is the app's `BYOM-INTEGRATION.md`, which records the app-specific decisions.

## What integration means

An application is BYOM-compliant when it:

1. is free and open source (no paywall, subscription, or developer-side metering; source open),
2. honors the six security invariants (`02-security-invariants.md`),
3. follows the wizard UX contract (`03-wizard-ux-contract.md`),
4. surfaces spend per the cost-transparency principles (`06-cost-transparency.md`),
5. ships a `BYOM-INTEGRATION.md` at its repo root (spec below), and
6. pins a released constitution version as a submodule.

Showing the badge (`04-badge-and-registry.md`) and listing in the registry follow from the above — they are not separate requirements.

## The four seams

BYOM enters an application through four seams. They are stack-agnostic; each maps onto whatever framework the app uses.

### 1. The connect-key flow (onboarding)

The experience of a user bringing their own model. The wizard UX contract (`03`) governs what this guarantees. The part most apps get wrong is the **first-time key holder** — someone who has never used an API key.

A BYOM app must walk a first-time user through:

- **what a key is** — a credential that lets the app call a model provider on their behalf, billed to them, not the developer;
- **where to get one** — in v1, an OpenRouter key (per `01-provider-model.md`), with a concrete link;
- **setting a spend limit at the provider** — so that even beyond the app's own budget ceiling, the account itself has a guard;
- **connecting it** — pasting it into the app, with the persistence choice made explicit (in-memory by default; opt-in local persistence).

If this path is not legible to someone who has never seen an API key, the integration is not finished. Onboarding is not a side panel — it is part of the product. The testable floor is in `03`'s "Acceptance": the three facts and the threat model, in the active locale, before the key input.

### 2. The model-category request

Each model-powered feature declares the category it needs — **frontier** or **worker** (per `01-provider-model.md`) — and the app surfaces suitable options for the user to pick. The app does not silently hard-code a single model. No minimum count is prescribed — how many options are "suitable" depends on the app and its use of models (out of BYOM's scope); the bar is that the user chooses within the category and that adding a model needs no second migration. Default to worker wherever it suffices; reserve frontier for features that genuinely need it. The choice is surfaced to the user, not made for them.

### 3. The call path

The key lives in the browser and calls the provider **directly**. There is no developer-run backend or proxy in the path — that is what keeps the app free to host and free to give away. The app hosts only static front-end code; the user's browser makes the inference calls with the user's own key. This direct-from-browser path is why the security invariants (`02`) are load-bearing rather than optional.

### 4. The spend and budget UI

What the user sees about money. Two things operate together:

- **the budget ceiling** (invariant 6): a user-set, enforceable allowance. The app estimates a request's cost pre-flight, checks it against cumulative spend (including in-flight), and refuses to exceed it. Best-effort, not a billing guarantee.
- **the provider spend limit**: the hard cap, set at the provider during onboarding. The app ceiling guards a session; the provider limit caps the account. The onboarding presents both — the app enforces its own ceiling; the provider limit is a recommendation the user acts on elsewhere (the app cannot verify it without calling the provider, which would violate invariant 2). **Acceptance:** the onboarding contains informational copy and a link to set it; no gate is required.
- **cost transparency** (`06`): real per-request cost surfaced from the provider's usage data, a local spend history, and a warning before leaving during a paid action.

The first two guard spend; the third makes it legible. An app must surface all three.

## The six invariants in practice

A short gloss on how each invariant from `02` shows up in a real app, not a restatement. (The observable acceptance signal for each invariant lives in `02`; this gloss is about the practical shape.)

1. **In-memory by default.** The key is held in memory for the session. Persistence to local storage is an explicit, unchecked-by-default choice the user makes.
2. **Never sent to the developer's servers.** Fetch calls go to the provider only. There is no analytics, telemetry, or logging endpoint that receives the key.
3. **Strict CSP.** A Content Security Policy limits where scripts load from and where the page can send data, so an injected script cannot exfiltrate the key.
4. **Minimal third-party JavaScript.** Every dependency is attack surface. The app keeps third-party JS to what it genuinely needs and reviews it.
5. **Never log the key, never log key-linked prompts.** Neither the key nor the prompt content tied to it is written to any log, console, or error report.
6. **Pre-flight estimation and enforceable budget.** Before a request, the app estimates its token cost and checks it against cumulative spend, including in-flight requests. It stops at the limit — including when a bug spams requests. The ceiling is a best-effort guard; the provider-side spend limit (set during onboarding) is the hard cap.

## Cost transparency

The minimum an app must surface is defined in `06-cost-transparency.md`: real per-request cost (never a fabricated estimate; pending until real usage lands), per-request attribution at minimum (per-feature encouraged), a local spend history the developer never sees, and a warning before leaving during a paid action. See that chapter for the principles and the honest boundary on what they guarantee. The honest limits of the budget ceiling — best-effort, not a billing guarantee — are stated in `02-security-invariants.md` ("The honest budget boundary").

## Authoring `BYOM-INTEGRATION.md`

Create this file at the root of the consuming repository. A skeleton template and a worked example ship at `constitution/BYOM-INTEGRATION.template.md` and `constitution/BYOM-INTEGRATION.example.md` — copy the template and fill it in. It records, for that specific app:

1. **App name and one-line description.** What the app is, in a sentence.
2. **The free core.** Which features work with no model connected (if any). An app can be entirely model-dependent; what is required is that features which don't need inference are not gated behind a key.
3. **Model-powered features and their categories.** Each optional-but-powered feature, and whether it needs **frontier** or **worker** (per `01-provider-model.md`), and why. Default to worker unless frontier is genuinely required.
4. **How to get and connect a key, for this app.** The app-specific onboarding steps — where the wizard is reached, and the concrete path for a first-time key holder (per seam 1).
5. **Key handling specifics.** In-memory vs opt-in persistence, the CSP posture, and any dependencies worth noting.
6. **Where spend and budget appear in the UI.** How the user sets an allowance and sees spend in this app (the budget ceiling and the transparency surface from seam 4).
7. **What happens when the budget ceiling is hit.** The app's behavior when the allowance is reached — requests refused, a clear message, no silent failure.
8. **How each security invariant is met.** Point to where in the app each invariant from `02` is implemented.
9. **Deviations from the constitution, and why.** Any place the app departs from the constitution, with the reason. The constitution is the default; deviations are called out, not hidden. The deviations section is the set of unchecked conformance-checklist boxes (below), each with its reason — so the two cannot drift apart, and a reader can reconstruct the checklist state from the deviations list alone.
10. **The pinned constitution version.** Which released version of this constitution the app is built against (the submodule tag).
11. **Propagation log.** A record of each constitution-version advance the app has moved through (e.g. `v0.1.0 → v1.0.0`) and what changed in the app at each step. A new entry is appended whenever the pinned submodule version is bumped.

BYOM is model-centric and canonical. A consuming app whose layer predates the constitution under a key-centric name (e.g. "BYOK") may keep that name as an alias, recorded in the doc's intro and deviations — the two refer to the same integration, and no rename is required.

## The badge

An app may display the BYOM badge (`04-badge-and-registry.md`) only if it meets all six invariants and the principles above. The badge says *follows the pattern and the invariants*; it is not proof of safety. Do not display it if any invariant is unmet or any transparency principle is missing. The concrete badge artifact — SVG files, required `alt` text, and canonical embed snippets — lives at `constitution/badge/README.md`.

## Registry submission

To list an app in the registry, open a PR editing `constitution/registry/registry.yaml` against the schema. Submission is PR-based and CI-validated; see `constitution/registry/README.md` for the field reference and process. A listing says the app follows the pattern and has a `BYOM-INTEGRATION.md` — it is not a security audit.

## Conformance checklist

- [ ] App is free and open source.
- [ ] All six security invariants (`02`) honored, each pointed to in the app.
- [ ] Data-egress rule followed: key and prompts go only to the provider; no third-party analytics/telemetry on either.
- [ ] Wizard UX contract (`03`) met, including the first-time-key-holder onboarding path.
- [ ] A persistent connection-management surface exists (model, budget, clear key, history).
- [ ] Errors surfaced plainly; auth failure clears the stale key; no key/prompt leakage in errors.
- [ ] Each model-powered feature declares frontier or worker; the user chooses the model.
- [ ] Non-model features (if any) are not gated behind a key.
- [ ] Call path is browser → provider direct; no developer backend in the path.
- [ ] Budget ceiling (invariant 6) and cost-transparency surface (`06`) both present.
- [ ] `BYOM-INTEGRATION.md` authored at the repo root, with all fields above.
- [ ] Constitution version pinned to a release tag.

## Submodule and versioning

This constitution is consumed as a **git submodule pinned to a release tag** (e.g. `v0.1.0`). Consuming repos pin a version deliberately.

When the constitution releases a new version, the update flow in a consuming repo is: pull the new version of the submodule, then re-check the app against the changed constitution and update the implementation throughout where needed. The pinned version in `BYOM-INTEGRATION.md` is updated to match. This is a deliberate, reviewed update — not an automatic float to latest.
