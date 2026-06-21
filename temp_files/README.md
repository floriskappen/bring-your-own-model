# BYOM — Bring Your Own Model

**A pattern, a spec, and a small free-software movement for apps built around LLM and agent functionality.**

Give the app away for free, but let the parts that need online inference run on the user's own model access — their own key — so they pay only for the inference they personally consume. No middleman, no markup, no payment plumbing for the developer, and the app stays genuinely free.

The whole app works without a model. The model only animates certain features. Inference is opt-in, not a wall in front of the product.

## This is an idea, not a package

There is nothing to install. BYOM is a constitution of concepts, invariants, and contracts that you **embed into a project**. The technical implementation is left to each application. This repo is typically consumed as a **git submodule pinned to a release tag**, the same way a shared design system is.

## If you are a coding agent

Start at **[`AGENTS.md`](./AGENTS.md)**. It tells you what to read (`constitution/`), what to ignore (`website/`), and what to produce (a `BYOM-INTEGRATION.md` in the consuming repo).

## The constitution

1. [Philosophy](./constitution/00-philosophy.md)
2. [Provider model](./constitution/01-provider-model.md) — v1: OpenRouter
3. [Security invariants](./constitution/02-security-invariants.md) — mandatory
4. [Wizard UX contract](./constitution/03-wizard-ux-contract.md)
5. [Badge and registry](./constitution/04-badge-and-registry.md)
6. [Integration guide](./constitution/05-integration-guide.md)

## The website

[`website/`](./website/) holds the public, movement-facing site. It is for humans discovering BYOM, **not** for agents implementing it. It ships in the release branch but is intentionally lightweight and separate from the constitution.

## Status

OSS-first. No monetization assumed — worth building at N=1. External adopters are a bonus, never a design assumption.
