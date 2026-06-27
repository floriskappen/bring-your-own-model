# Wizard UX contract

This is the contract for the connect/onboarding flow — the experience of a user bringing their own model to an app. It is a contract about *what the experience guarantees*, not about specific framework code. The implementation is the app's responsibility.

## Principles

- **The app is useful before the wizard.** A user reaches the connect flow only when they choose a model-powered feature. Nothing is gated behind it that does not need a model. The wizard is never the first thing a user hits.

- **Opt-in, never ambient.** Connecting a model is a deliberate action the user takes. The app does not nudge toward it as a default state.

## What the wizard must cover

1. **Explain what connecting does and costs.** Before asking for a key, tell the user plainly: the feature needs model inference, they bring their own key, and they pay their provider directly for what they use. No surprise about who pays.

2. **Help the user get a key.** Point to where and how to obtain an OpenRouter key. Assume the user may not have one yet. Be clear and concrete without being condescending.

3. **Let the user choose within a category.** The feature declares the model category it needs (frontier / worker, per `01-provider-model.md`). Surface suitable options and let the user pick; do not silently hard-code one.

4. **Make persistence an explicit choice.** Default to in-memory. Offer opt-in local persistence ("remember this key on this device") as a clear, unchecked-by-default choice, with a plain note about what that means.

5. **Surface the budget control.** Let the user set an allowance. Show spend against it. Make it obvious that the app enforces this and will stop at the limit. This is where invariant 6 from `02-security-invariants.md` becomes visible to the user.

6. **Tell the truth about safety.** Link to or restate the honest threat model: browser-local is a privacy/control win, not a cryptographic guarantee. Do not imply more safety than exists.

**Acceptance:** before the key input, the onboarding surfaces what connecting does and costs, where to get a key, the provider spend limit, and the honest threat model — in the active locale. Subjective legibility is the spirit; these elements, in that order, are the testable floor.

## After connecting

The wizard is the first-run instance of a persistent connection surface, not a one-time door. After connecting, the user can always reach a way to: change the model (within the feature's category), adjust the budget, clear or rotate the key, and view local spend history. A model connection is not set-and-forget; the user stays in control of it for as long as it is set.

Here "persistent" means always-reachable within a session, not a durable linkable URL. In a multi-page app, a real settings route is a full navigation that tears down the JS context and would drop an unsaved (in-memory) session key (invariant 1). A same-page, in-app surface satisfies "persistent" without that cost, and is the compliant form. Bridging a real navigation via `sessionStorage` is a deviation to record with justification — `sessionStorage` is more durable than a RAM variable (it survives a tab's reloads within a session), which is exactly what invariant 1 protects against by default.

## When a request fails

A model-powered feature will hit provider errors — 401 (bad or revoked key), 429, 5xx, model unavailable, context-length exceeded. The app surfaces these plainly, in the user's language, without dumping raw provider payloads.

On an auth failure (401), the app treats the stored key as stale: it clears the in-memory key and prompts the user to re-connect, rather than retrying silently. And error handling never leaks the key or prompt content to logs, telemetry, or error reports — this extends invariant 5 to the failure path.

## Tone

Plain and clear. Explain things as they are. Do not hype, do not pad, do not pretend the security story is stronger than it is. Assume the user can grasp the value without being sold to.
