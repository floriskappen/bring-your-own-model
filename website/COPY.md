# Website copy

Movement-neutral, third person. Plain and clear — no hype, no magazine voice. The reader is assumed to grasp the value without being sold to. This file is copy only; the agent builds the lightweight static site from it.

---

## Hero

**Bring Your Own Model**

Free software for the LLM era. The app is free. The user brings their own model for the parts that need it, and pays only for the inference they personally use.

---

## What it is

BYOM is a pattern for building apps that have LLM or agent functionality at their core without charging anyone a subscription.

The app works on its own — browse, read, navigate, use the whole scaffold for free. Certain features are powered by a model. When a user wants those, they connect their own key. The inference runs on the user's own model access, billed directly by their provider. The developer never touches the key or the money.

The result: the app stays genuinely free, and nobody pays for anyone else's inference.

---

## Why it exists

When an app's smart features run on inference the developer pays for, the app cannot really be free. The cost has to come back somehow — a subscription, metering, a payment stack — and the developer ends up reselling intelligence they never wanted to resell.

BYOM removes that dilemma. The user already has, or can get, model access. They bring it. There is no middleman, no markup, and no billing business growing out of a side project.

---

## The bigger idea

Building software with coding agents is fast and democratized now. That makes it easy to build small, useful tools that solve real problems — and much of that software is meaningfully better with LLM inference.

These tools do not need to become subscription products to exist. They can be free software, available to anyone with the same problem, with each user carrying their own inference cost through their own model access. One person solves their problem, shares it, and everyone with that problem benefits — at no cost to the builder.

---

## How it works, briefly

- The app is free to use and free to host — static front-end code, no developer-run backend.
- Model-powered features ask the user to connect a key (v1: OpenRouter).
- The key stays in the user's browser and calls the provider directly. It never reaches the developer's servers.
- Apps request a model *category* — frontier or worker — and let the user choose.
- A user-set budget limit keeps inference from running away.

---

## On safety, honestly

Keeping the key in the browser is a privacy and control win, not a cryptographic guarantee. A key in browser storage can be exposed by a cross-site-scripting flaw, so BYOM apps follow a set of security invariants — strict CSP, minimal third-party JavaScript, in-memory by default — to reduce that surface.

A BYOM badge means an app follows the pattern and those invariants. It is not proof of safety: in-page UI can be cloned by a malicious site. Stronger phishing resistance would need privileged browser chrome, which is a future direction, not part of this phase. The honest position is plain improvement in privacy and control — not a guarantee against a determined attacker.

---

## The money

You can see what you spend, as you spend it.

- **Live cost.** Model-powered actions show their real cost as they run — actual usage, never an estimate.
- **Breakdown.** Spend is attributable per request, and where the app can, per feature.
- **History.** A local record of what you've spent, kept on your device next to your key setup. The developer never sees it.
- **No lost work.** If a paid action is in progress, the app warns before you leave, so you don't pay for work that gets thrown away.

---

## Getting a key

BYOM assumes you can bring model access, not that you already have it. An app built on BYOM should walk a first-time user through it: what a key is, getting one from a provider (OpenRouter in v1), setting a spend limit there, and connecting it.

If that path isn't clear to someone who's never seen an API key, the app isn't done.

---

## In practice

A worked example, end to end:

1. You open the app and use it. Browsing, reading, navigating — free.
2. A feature needs a model. The app asks you to connect a key, and shows you how to get one if you don't have it.
3. You set a budget. The app guards against runaway spend; set a hard limit at your provider too.
4. The feature runs. You see the cost as it works, recorded locally.

More examples are coming as apps adopt the pattern. The registry lists the ones that exist today.

---

## The registry

A list of apps that follow the pattern. Worth keeping even with one entry; anyone else adopting it is a bonus.

---

## Footer

Open source. No monetization. Build it because it should exist; share it; let anyone who has the same problem use it for free.
