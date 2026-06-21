# bring-your-own-model

**Bring Your Own Model (BYOM)** — a pattern, a spec, and a small free-software movement for apps
whose core is LLM/agent functionality. Give the app away free; the features that need online
inference run on the **user's own model access** (v1: an OpenRouter key), paid for by the user,
billed by no one in the middle. The key lives in the user's browser and calls the provider directly —
it never touches the developer's infrastructure.

The whole app works without a model. The model only animates certain features. Inference is opt-in,
not a wall in front of the product.

## This is an idea, not a package

There is nothing to install. BYOM is a **constitution** of concepts, invariants, and contracts that
you embed into a project. The technical implementation is left to each application. This repo is
designed to be consumed as a **git submodule pinned to a release tag**, the same way a shared design
system is.

## This repo holds two things

The split is deliberate, and it is the load-bearing structural fact of the project:

- **`constitution/`** — the **release artifact**. The concepts, invariants, and contracts an agent or
  developer reads to implement BYOM in an app. Versioned, released at a tag, submoduled.
- **`website/`** — **movement-facing**. The philosophy, the registry of participating apps, and the
  public security page, for the wider world. Not what an implementing agent reads.

## If you are a coding agent

Start at **[`AGENTS.md`](./AGENTS.md)**. It tells you what this repo is, what to read
(`constitution/`), what to ignore (`website/`), and what to produce (a `BYOM-INTEGRATION.md` in the
consuming repo).

## The constitution

The normative content lives in [`CONSTITUTION.md`](./CONSTITUTION.md) today and is being split into
the per-topic `constitution/` artifact below as part of the v1 build (see
[`ROADMAP.md`](./ROADMAP.md)):

1. Philosophy
2. Provider model — v1: OpenRouter; request a *category* (frontier / worker), not a specific model
3. Security invariants — **mandatory**
4. Wizard UX contract
5. Badge and registry
6. Integration guide — how a consuming repo authors its own `BYOM-INTEGRATION.md`

## Status

Early. OSS-first, no monetization assumed — built at N=1 to make a multi-app life easier and encode
the security rules once. External adopters are a bonus, never a design assumption.

- **Constitution version:** see [`VERSION`](./VERSION) — targeting `v1.0.0`.
- **First apps:** Bedrijfskompas (company map + agentic CV matching) and AI-laser (e-reader).
- **What's left to ship v1:** see [`ROADMAP.md`](./ROADMAP.md).
