# BYOM-INTEGRATION (worked example)

This is a worked instance of a `BYOM-INTEGRATION.md` for a fictional but realistic app, showing the tone and depth expected. It is **not a real app**; copy [`BYOM-INTEGRATION.template.md`](./BYOM-INTEGRATION.template.md) for your own and replace the content. The constitution is the authority; this example only illustrates the form.

## App name and one-line description

**ExampleApp** — a free, accountless company-map tool that scores companies on several axes and offers optional in-browser role/Ikigai matching that connects a visitor's own LLM access to surface grounded company matches.

## The free core

The whole app works with no model connected: the company map, filters, favorites, company detail pages, and the philosophy page are static or browser-local and require no inference. Only the **matching flow** is model-powered, and it is opt-in — reached from a filter control and gated on a confirmed configuration only when a run actually needs the LLM. Inference is never a wall in front of the product.

## Model-powered features and their categories

| Feature | Category | Why |
|---|---|---|
| Matching — role derivation | worker | structured JSON extraction: map answers to allowed role codes |
| Matching — pass 1 (top ~25) | worker | ranking/classification over ~100 compact profiles into ~25 ids |
| Matching — pass 2 (3–10 matches) | worker | data-grounded synthesis over supplied profiles; not deep world-knowledge — worker suffices per `01` |

**Category-choice surface:** the setup sheet surfaces worker-tagged models from the provider registry as a `<select>`; the visitor picks within the feature's declared category. The stored config carries the visitor's choice per category; the request boundary refuses (`missing_config`) when no model is chosen for the declared category. (One curated worker model today; the chooser supports adding more without a migration.)

## How to get and connect a key, for this app

Reached from the map's settings control (and from the matching entry when a run needs the LLM). The first-run setup walks a first-time key holder through — **before the key input** — what connecting does and costs (the visitor brings their own key and pays the provider directly), where to get an OpenRouter key (`https://openrouter.ai/keys`), setting a provider-side spend limit as the hard cap (`https://openrouter.ai/settings/credits`), and the honest threat model (browser-local is a privacy/control win, not a cryptographic guarantee), in the active locale. The provider spend-limit prompt is informational copy + a link, not a gate — the app cannot verify it is set without calling the provider (which would violate invariant 2). The visitor then picks a model within the worker category, pastes a key, optionally saves it on this device, and sets an optional local USD allowance.

## Key handling specifics

- **In-memory by default.** The key lives in a module-level session variable; it is written to `localStorage` only when the visitor explicitly opts into "save on this device."
- **Direct browser → provider.** The adapter POSTs to `https://openrouter.ai/api/v1/chat/completions` with the visitor's key; no developer backend or proxy in the path.
- **Stale key cleared on auth failure.** On a 401/403, the boundary clears the in-memory and persisted key and emits a change event; no silent retry.
- **CSP posture (inv 3).** A strict CSP via a `<meta>` tag: `default-src 'self'`, `script-src 'self' <hashes>` (no `'unsafe-inline'`/`'unsafe-eval'`/`*`), `connect-src` a closed allowlist (`'self'`, `https://openrouter.ai`, the map tile provider). Concession: `worker-src 'self' blob:` for the map's WebGL workers — does not open an exfiltration channel (bounded by `script-src` + closed `connect-src`), recorded here with justification.
- **Third-party JS audit (inv 4).** Runtime deps are bundled by the build (no CDN loads): the map library (the product itself — largest surface, bounded by the CSP), the UI framework, the cluster index. Each enumerated and justified; each exfiltration-bounded by the inv-3 CSP. Non-exfil risks (UI spoofing, DoS from a compromised dep) are out of inv-4 scope.

## Where spend and budget appear in the UI

- The visitor sets an optional local USD allowance in the setup sheet.
- Cumulative usage is the sum of a **local spend history** — one record per completed request, on-device next to the key (same browser-local posture as invariant 1). Records carry purpose, cost in USD, cost source, optional token counts, and a timestamp; never prompt or response content.
- The provider adapter streams; usage arrives as a discrete final event, so the boundary surfaces an honest pending → landed transition per request. A stream that omits usage synthesizes an `unknown`-cost record rather than fabricating a number.
- **Live per-pass cost** is shown in the matching loading states via a cost-event bus (`pending` when a request starts, `landed` with the real figure when usage arrives), attributed by purpose.
- The connection-management surface shows cumulative spend, the allowance ceiling, and recent on-device records, updating live as requests land.
- **No-lost-work leave warning:** a `beforeunload` listener fires when an in-flight paid request is running or a feature has flagged unsaved work.

## What happens when the budget ceiling is hit

- A visitor who has not set an allowance (`null`) has no ceiling; requests are never refused on budget grounds.
- Before any fetch, the boundary estimates the request's token cost (input ≈ chars/4, output ≈ `maxTokens`), prices it via the active model's per-token rate — or a conservative fallback rate when pricing is unknown (guard-only, never displayed) — and checks derived usage + in-flight reservations + this estimate against the allowance. If it would exceed, the request is refused with `allowance_exceeded` before the fetch.
- In-flight estimates are reserved before the fetch and released on both success and failure, so concurrent or multi-step calls cannot blow past the ceiling before spend catches up.

## How each security invariant is met

| # | Invariant | Status | Where |
|---|---|---|---|
| 1 | In-memory by default | met | session key var; `saveKey` opt-in |
| 2 | Key never sent to dev servers | met | direct browser → OpenRouter; no dev backend |
| 3 | Strict CSP | met | meta-tag CSP; closed `connect-src`; no `'unsafe-inline'`/`'unsafe-eval'` (blob-worker concession justified above) |
| 4 | Minimal third-party JS | met | all deps bundled; audit above; each exfil-bounded by inv 3 |
| 5 | Never log key / key-linked prompts | met | no logging paths; 401 error path writes no key/prompt content |
| 6 | Pre-flight estimation + enforceable budget | met | pre-flight estimate + in-flight-aware cumulative ceiling; local spend history |

Data egress (key and prompts go only to the provider): met — no analytics or telemetry.

## Deviations from the constitution, and why

- **Terminology: BYOK vs BYOM.** The app's internal layer is key-centric ("BYOK"); the constitution is model-centric ("BYOM"). They refer to the same integration. Permanent alias, recorded here.
- **Badge and registry listing — deferred, not absent.** The conformance gate is closed (all six invariants met, `03`/`06` satisfied, free and open source). Displaying the badge and listing in the registry is blocked on externals: a live app URL and a public source URL, which do not exist yet. These are entry conditions for the follow-on, not conformance gaps.

(Per `05`, this section is the set of unchecked conformance-checklist boxes. The two items above are the only outstanding ones; the rest of the 12-box checklist is green.)

## The pinned constitution version

- **Constitution:** BYOM
- **Pinned version:** `v1.0.0`
- **Pinned commit:** `e2fc406678cfc48ec967af511e6761407a4120cc`
- **Submodule path:** `vendor/byom`

## Propagation log

- `none -> v1.0.0` (2026-06-26): initial adoption. Submodule added at `vendor/byom`, pinned to tag `v1.0.0`. Authored this `BYOM-INTEGRATION.md` from the template (`constitution/BYOM-INTEGRATION.template.md`); recorded current deviations.
