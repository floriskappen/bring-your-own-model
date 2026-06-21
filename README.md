# bring-your-own-model

**Bring Your Own Model (BYOM)** — a pattern, a spec, and a small free-software movement for apps
whose core is LLM/agent functionality. Give the app away free; the features that need online
inference run on the **user's own model access** (a provider or OpenRouter key), paid for by the user,
billed by no one in the middle. The key lives in the user's browser and calls the provider directly —
it never touches the developer's infrastructure.

**This repo is the BYOM website (the whole thing):** the constitution (philosophy, provider model,
security best-practices, the connect-wizard UX contract), the BYOM **badge**, and the **registry** of
participating apps.

See [`CONSTITUTION.md`](CONSTITUTION.md) for the full philosophy and the normative security
invariants, and `openspec/` for the spec-driven workflow (the `opsx` commands).

## Status

Early. OSS-first, no monetization assumed — built at N=1 to make a multi-app life easier and encode
the security rules once.

- **Stack:** TBD (website / docs site, likely static).
- **First apps:** Bedrijfskompas (company map + agentic CV matching) and AI-laser (e-reader).
