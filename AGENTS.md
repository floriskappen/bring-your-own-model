# AGENTS.md — Entry point for coding agents

**Read this first.** If you are an agent implementing BYOM in an application, this file tells you what this repository is, what to read, what to ignore, and what to produce.

## What this repository is

This is **not** a package, framework, plugin, or component. There is nothing to install. BYOM (Bring Your Own Model) is an **idea you embed into a project** — a constitution of concepts, invariants, and contracts. The technical implementation is left to each application, because applications differ in framework and stack.

This repository is typically consumed as a **git submodule**, pinned to a released version tag (e.g. `v0.1.0`), the same way a shared design system is consumed. Consuming repos pin a version and update deliberately.

## What to read

Read everything under [`constitution/`](./constitution/), in order:

1. [`00-philosophy.md`](./constitution/00-philosophy.md) — what BYOM is and why
2. [`01-provider-model.md`](./constitution/01-provider-model.md) — how keys/providers fit (v1: OpenRouter)
3. [`02-security-invariants.md`](./constitution/02-security-invariants.md) — the rules every BYOM app **must** follow
4. [`03-wizard-ux-contract.md`](./constitution/03-wizard-ux-contract.md) — the connect/onboarding UX contract
5. [`04-badge-and-registry.md`](./constitution/04-badge-and-registry.md) — the badge and the registry
6. [`05-integration-guide.md`](./constitution/05-integration-guide.md) — how to author this app's own `BYOM-INTEGRATION.md`
7. [`06-cost-transparency.md`](./constitution/06-cost-transparency.md) — spend visibility: real cost, local history, no lost work

## What to ignore

**Ignore [`website/`](./website/) entirely.** It is the public, movement-facing site (philosophy, registry, security page) for human readers discovering BYOM. It is not relevant to implementing BYOM in an application. Do not read it, do not base implementation decisions on it.

## What to produce in the consuming repository

When you implement BYOM in an application, create a **`BYOM-INTEGRATION.md`** at that repository's root. It describes how BYOM is implemented *for that specific app* — which features are model-powered, which model category each needs, how the connect wizard is wired in, how budget limits surface in that UI. See [`05-integration-guide.md`](./constitution/05-integration-guide.md) for how to author it.

The constitution stays idea-level and stack-agnostic. The technical implementation — frameworks, libraries, exact code — belongs in the consuming application and its `BYOM-INTEGRATION.md`, never in this repository.

## Non-negotiable

The [security invariants](./constitution/02-security-invariants.md) are mandatory for any app claiming BYOM compliance or displaying the badge. They are not suggestions.
