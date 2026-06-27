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

## Consuming as a submodule

This repo is consumed as a git submodule pinned to a release tag, the same way a shared design system
is. The release artifact is `constitution/`; `website/` is movement-facing and not part of what an
implementing agent reads.

To add it to an app:

```sh
git submodule add https://github.com/floriskappen/bring-your-own-model.git vendor/byom
cd vendor/byom && git checkout v1.0.0 && cd ..
git commit -am "add byom constitution submodule (pinned at v1.0.0)"
```

Then read [`vendor/byom/AGENTS.md`](./vendor/byom/AGENTS.md) and author a `BYOM-INTEGRATION.md`
(conventionally at `docs/BYOM-INTEGRATION.md`; the repo root is also acceptable) from the template at
`vendor/byom/constitution/BYOM-INTEGRATION.template.md`. Record the
pinned version in that doc.

To update deliberately to a later release:

```sh
cd vendor/byom && git fetch --tags && git checkout v1.2.0 && cd ..
git commit -am "bump byom constitution submodule to v1.2.0"
```

Re-walk `05`'s conformance checklist against the changed constitution and update your
`BYOM-INTEGRATION.md` (and its propagation log) at each bump. This is a deliberate, reviewed update —
not an automatic float to latest.

## If you are a coding agent

Start at **[`AGENTS.md`](./AGENTS.md)**. It tells you what this repo is, what to read
(`constitution/`), what to ignore (`website/`), and what to produce (a `BYOM-INTEGRATION.md` in the
consuming repo).

## The constitution

The normative content lives in [`constitution/`](./constitution/), one file per topic:

1. [Philosophy](./constitution/00-philosophy.md)
2. [Provider model](./constitution/01-provider-model.md) — v1: OpenRouter; request a *category* (frontier / worker), not a specific model
3. [Security invariants](./constitution/02-security-invariants.md) — **mandatory**
4. [Wizard UX contract](./constitution/03-wizard-ux-contract.md)
5. [Badge and registry](./constitution/04-badge-and-registry.md)
6. [Integration guide](./constitution/05-integration-guide.md) — how a consuming repo authors its own `BYOM-INTEGRATION.md`
7. [Cost transparency](./constitution/06-cost-transparency.md) — spend visibility: real cost, local history, no lost work

A thin index also lives at [`CONSTITUTION.md`](./CONSTITUTION.md).

## Status

OSS-first, no monetization — built at N=1 to make a multi-app life easier and encode the security
rules once. External adopters are a bonus, never a design assumption.

- **Released:** `v1.0.0` — the BYOM constitution, validated end-to-end against a real consuming app
  (Bedrijfskompas). Consumed as a pinned git submodule. See [`CHANGELOG.md`](./CHANGELOG.md).
- **First apps:** Bedrijfskompas (company map + agentic CV matching) and e-lezer (e-reader).

## License

This repository is licensed under the GNU General Public License v3.0 or later
(GPL-3.0-or-later). See [`LICENSE`](./LICENSE) for the full text. The constitution
prose in [`constitution/`](./constitution/) is covered by the same license.
