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

6. **Tell the truth about safety.** Link to or restate the honest threat model: browser-local is a privacy/UX win, not a cryptographic guarantee. Do not imply more safety than exists.

## Tone

Plain and clear. Explain things as they are. Do not hype, do not pad, do not pretend the security story is stronger than it is. Assume the user can grasp the value without being sold to.
