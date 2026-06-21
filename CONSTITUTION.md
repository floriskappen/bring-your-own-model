# Bring Your Own Model (BYOM)

A pattern, a spec, and a small free-software movement for apps whose core is built around LLM/agent
functionality. This repo is the BYOM website — the constitution, the badge, and the registry.

## the premise

give the app away for free, but don't run the expensive part on your dime. the features that need
online inference run on the **user's own model access** — a provider API key, an OpenRouter key, or
similar — and the user pays only for the inference they personally consume.

no middleman, no markup, no payment plumbing for the developer to maintain, and the app stays
genuinely free.

## the deeper framing: free software for the LLM era

traditional software is often inert without the thing that animates it. in the LLM era the app is
the **scaffold and interface**, and the model is what ties it together and makes it fully useful.

BYOM apps are tools where some functionality is **optional-but-powered-by-your-own-model**: you can
use the rest of the app without it, but if you want the smart features, you connect your own model.

## the architecture decision

not a shared backend service, and not blind per-app reimplementation, but a **written constitution
plus thin per-ecosystem libraries**.

the load-bearing change that makes this the right call: **the key never touches the developer's
infrastructure**. it lives in the user's browser — in-memory by default, optionally persisted for the
next visit — and calls the provider/OpenRouter **directly**. that dissolves the need for a centralized
crypto/key service, because there is no server-side key handling to centralize.

what's left to standardize is exactly what a constitution can govern once and every app inherits:

- the connect-wizard UX
- browser storage rules
- the fetch wrapper
- token / usage tracking
- the security invariants (below)

within a single language you can still ship a thin shared library (npm for web, pub for Flutter) so
the OpenRouter call isn't regenerated each time — you just don't try to share across Dart and JS.

## security invariants

these are normative. an app is not BYOM-compliant if it breaks them:

1. **in-memory by default.** the key is held in memory; persistence is opt-in and explicit.
2. **direct to provider.** the key is sent only to the provider/OpenRouter, never to first-party
   infrastructure.
3. **strict CSP.** a tight content-security-policy is in place.
4. **minimal third-party JS.** every additional script is attack surface near the key.
5. **never log the key.** not to consoles, not to analytics, not to network logs.

## trust: the honest position

in-page UI can always be cloned, so a recognizable brand badge does **not** by itself guarantee
safety. real phishing resistance would require privileged browser chrome — a MetaMask-style
extension — which is out of scope for now.

for this phase the honest position is: **browser-local keys + a clear security page + the
constitution's invariants.** this is a privacy and UX win, not an absolute security guarantee, and the
site says so plainly rather than overclaiming.

## the badge and the registry

apps that follow the constitution display a **BYOM badge** linking back to this site. the site keeps a
**registry** of participating apps — Floris's to begin with (Bedrijfskompas, AI-laser), anyone else's
as upside.

brand note: avoid the robot icon (it reads as "agent," the wrong meaning) and the key-as-chore
framing. prefer a **model / socket / connect** glyph.

## monetization

deliberately **OSS-first, no monetization assumed.** it's worth building at N=1 because it makes a
multi-app life easier and encodes the security rules once. any external adopters or future paid layer
(dev-side B2B, enterprise budget management) are upside not to design for yet.

## first apps

- **Bedrijfskompas** — company map overview + agentic personalized matching against your CV.
- **AI-laser** — the e-reader.
