# Bring Your Own Model (BYOM)

A pattern, a spec, and a small free-software movement for apps whose core is built around LLM/agent
functionality. This is the **constitution**: the concepts, invariants, and contracts an app inherits
by following BYOM.

> **Repo structure.** This repository holds two things with two audiences. The **constitution** (this
> content, being split into `constitution/`) is the released artifact that implementing agents and
> developers read, consumed as a pinned git submodule. The **website** (`website/`) is movement-facing
> — for the wider world, not for implementing agents. An agent implementing BYOM reads the constitution
> and ignores the website; see [`AGENTS.md`](AGENTS.md). The full v1 build is tracked in
> [`ROADMAP.md`](ROADMAP.md).

## the premise

give the app away for free, but don't run the expensive part on your dime. the features that need
online inference run on the **user's own model access** — v1 standardizes on an OpenRouter key — and
the user pays only for the inference they personally consume.

no middleman, no markup, no payment plumbing for the developer to maintain, and the app stays
genuinely free.

## the deeper framing: free software for the LLM era

traditional software is often inert without the thing that animates it. in the LLM era the app is
the **scaffold and interface**, and the model is what ties it together and makes it fully useful.

BYOM apps are tools where some functionality is **optional-but-powered-by-your-own-model**: you can
use the rest of the app without it, but if you want the smart features, you connect your own model.
inference is opt-in, never a wall in front of the product.

## the architecture decision

not a shared backend service, and not blind per-app reimplementation, but a **written constitution
plus thin per-ecosystem libraries**.

the load-bearing change that makes this the right call: **the key never touches the developer's
infrastructure**. it lives in the user's browser — in-memory by default, optionally persisted for the
next visit — and calls the provider directly. that dissolves the need for a centralized
crypto/key service, because there is no server-side key handling to centralize.

what's left to standardize is exactly what a constitution can govern once and every app inherits:

- the connect-wizard UX
- browser storage rules
- the fetch wrapper
- token / usage tracking
- the security invariants (below)

within a single language you can still ship a thin shared library (npm for web, pub for Flutter) so
the OpenRouter call isn't regenerated each time — you just don't try to share across Dart and JS.

## the provider model (v1: OpenRouter)

v1 standardizes on **OpenRouter** as the single provider. one key reaches many models across vendors,
which keeps onboarding to one step and lets the app suggest models without locking the user to a
vendor. direct-to-provider support (OpenAI/Anthropic APIs directly) is a possible future extension,
explicitly **not** part of v1.

an app should **not** hard-code a specific model. it declares the **model category** a feature needs
and lets the user pick a concrete model that satisfies it:

- **frontier** — the strongest, most expensive models; use only where deep knowledge or hard
  reasoning genuinely matters.
- **worker** — cheaper, fast, capable models suitable for most tasks (classification, extraction,
  summarization, ranking, tool use, structured output). default here wherever it suffices.

the key lives in the browser and calls OpenRouter **directly** from the front end. there is no
developer-run backend or proxy in the path — the app hosts only static front-end code. that direct
path is why the security invariants are load-bearing rather than optional.

## security invariants

these are normative. an app is not BYOM-compliant if it breaks them:

1. **in-memory by default.** the key is held in memory; persistence to local storage is opt-in and
   explicit, never silent.
2. **direct to provider.** the key is sent only to OpenRouter, never to first-party infrastructure.
3. **strict CSP.** a tight content-security-policy limits where scripts load from and where the page
   can send data.
4. **minimal third-party JS.** every additional script is attack surface near the key.
5. **never log the key, never log key-linked prompts.** not to consoles, not to analytics, not to
   network logs.
6. **pre-flight token estimation + enforceable budget.** estimate a request's cost before sending,
   and enforce a user-visible, user-settable allowance so connecting a model can't silently burn the
   user's balance — including under a bug that spams requests. the app stops at the limit.

## trust: the honest position

in-page UI can always be cloned, so a recognizable brand badge does **not** by itself guarantee
safety. a key in browser storage is also readable by any cross-site-scripting flaw on the page — a
*different* threat profile from server-side-encrypted storage, not a strict upgrade. that is exactly
why invariants 1, 3, and 4 are load-bearing and live here in the shared constitution.

real phishing resistance would require privileged browser chrome — a MetaMask-style extension whose
prompts render where a webpage can't fake them — which is out of scope for now.

for this phase the honest position is: **browser-local keys + a clear security page + the
constitution's invariants.** a privacy and UX win, not an absolute security guarantee — and the site
says so plainly rather than overclaiming.

## the badge and the registry

apps that follow the constitution display a **BYOM badge** linking back to the site. the badge says
an app *follows the pattern and the invariants*; it does not, and cannot, guarantee safety. the site
keeps a **registry** of participating apps — Floris's to begin with (Bedrijfskompas, AI-laser),
anyone else's as upside. the registry is designed to be worth maintaining at N=1.

brand note: avoid the robot icon (it reads as "agent," the wrong meaning) and the key-as-chore
framing. prefer a **model / socket / connect** glyph.

## the integration pattern

the constitution stays idea-level and stack-agnostic. each consuming app owns its own technical
implementation and records it in a **`BYOM-INTEGRATION.md`** at that app's repo root — which features
are model-powered, which category each needs, how the wizard is wired in, how the invariants are met,
how budgets surface, and which constitution version it pins. this mirrors how a shared design system
gives each repo a "how it's applied here" doc. authoring guidance lives in the integration guide
(`05-integration-guide.md`). framework-specific code never belongs in the constitution itself.

## versioning

semver. the constitution is consumed as a **git submodule pinned to a release tag** (targeting
`v1.0.0`), so consuming repos pin a version and update deliberately: pull the new tag, re-check the
app against the changed constitution, update the implementation and the pinned version in
`BYOM-INTEGRATION.md`. never an automatic float to latest.

## monetization

deliberately **OSS-first, no monetization assumed.** it's worth building at N=1 because it makes a
multi-app life easier and encodes the security rules once. any external adopters or future paid layer
(dev-side B2B, enterprise budget management) are upside not to design for yet.

## first apps

- **Bedrijfskompas** — company map overview + agentic personalized matching against your CV.
- **AI-laser** — the e-reader.
