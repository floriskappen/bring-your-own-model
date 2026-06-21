# Integration guide

This document tells an agent or developer how to apply BYOM inside a specific application — and specifically how to author that application's own **`BYOM-INTEGRATION.md`**.

This mirrors how a shared design system works: the design system itself is generic, and each consuming repo gets a document describing how the design system is applied *in that repo*. BYOM follows the same shape.

## The division of responsibility

- **This constitution** stays idea-level and stack-agnostic. It defines the philosophy, the provider model, the security invariants, the wizard contract, and the badge/registry.
- **The consuming application** owns the technical implementation — framework, libraries, exact code. None of that belongs in this constitution.
- **The bridge between them** is the app's `BYOM-INTEGRATION.md`, which records the app-specific decisions.

## Authoring `BYOM-INTEGRATION.md`

Create this file at the root of the consuming repository. It should record, for that specific app:

1. **Which features are model-powered.** List each optional-but-powered feature. Confirm the app is fully usable without a connected model.

2. **Model category per feature.** For each feature, state whether it needs a **frontier** or **worker** model (per `01-provider-model.md`), and why. Default to worker unless frontier is genuinely required.

3. **How the connect wizard is wired in.** Where in the app's flow the user reaches it, and how it satisfies the wizard UX contract (`03-wizard-ux-contract.md`).

4. **How the security invariants are met.** Point to where in the app each invariant from `02-security-invariants.md` is implemented — key handling, CSP, persistence opt-in, no-logging, budget enforcement.

5. **How budget limits surface in this UI.** How the user sets an allowance and sees spend in this particular app.

6. **The pinned constitution version.** Which released version of this constitution the app is built against (the submodule tag).

## Submodule and versioning

This constitution is consumed as a **git submodule pinned to a release tag** (e.g. `v1.0.0`). Consuming repos pin a version deliberately.

When the constitution releases a new version, the update flow in a consuming repo is: pull the new version of the submodule, then re-check the app against the changed constitution and update the implementation throughout where needed. The pinned version in `BYOM-INTEGRATION.md` is updated to match. This is a deliberate, reviewed update — not an automatic float to latest.
