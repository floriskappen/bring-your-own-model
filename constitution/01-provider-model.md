# Provider model

## v1: OpenRouter

Version 1 of this constitution standardizes on **OpenRouter** as the provider. A single key gives the user access to a wide range of models across vendors, which keeps onboarding to one step and lets the application suggest models without locking the user to one vendor.

Direct-to-provider support (e.g. talking to OpenAI or Anthropic APIs directly) is a possible future extension. It is explicitly **not** part of v1. Building for one provider first keeps the wizard, the fetch path, and the documentation simple.

## Request a category, not a model

An application should **not** hard-code a specific model. It should specify the **model category** a given feature needs, and let the user choose a concrete model that satisfies it. Models are largely interchangeable for a given category, and the set of good options grows over time — pinning to one model ages badly and removes user choice.

Two categories cover most needs:

- **Frontier** — the strongest, most expensive models. Use only where deep world knowledge or hard reasoning genuinely matters.
- **Worker** — cheaper, fast, agentic models that are already very capable. Suitable for most tasks: classification, structured extraction, summarization, ranking, tool use, structured JSON output.

The default should lean toward **worker** wherever it suffices, reserving **frontier** for the features that actually need it. Each model-powered feature in an app declares which category it needs; this is recorded in the app's `BYOM-INTEGRATION.md`.

## The call path

The user's key lives in the browser and calls OpenRouter **directly** from the front end. There is no developer-run backend or proxy in the path — that is what keeps the app free to host and free to give away. The application hosts only static front-end code (e.g. on a free static host); the user's browser runs the software and makes the inference calls with the user's own key.

This direct-from-browser path is the reason the security invariants in `02-security-invariants.md` are load-bearing rather than optional.
