# Cost transparency

The user pays their provider directly for the inference they trigger. That spend should be visible to them as it happens, and the record of it should stay on their device — not pass through the developer.

This is the complement to the security invariants in `02-security-invariants.md`. The security chapter protects the key; this chapter makes the money legible. Both apply.

## The principles

1. **Live cost, from real usage.** Each model-powered action shows its cost. That cost comes from the provider's actual usage data, not a figure the app invents. If usage has not arrived yet — for example, mid-stream before the final chunk — the app shows the cost as pending until the real number lands. It does not fabricate an estimate to fill the gap.

2. **Attribution.** Spend is attributable **per request** at minimum. **Per-feature** attribution — tying cost to the specific feature that triggered it — is encouraged where the app can do it cleanly, but is not required. Per-request is the floor.

3. **Local history.** The app keeps a local record of what the user has spent, stored on the device next to the key setup. The developer never sees it. This is the same browser-local posture as the key (invariant 1): the record stays with the user.

4. **No lost work.** If leaving or closing the page would abort an in-flight paid request, the app intercepts with the standard leave warning — the same pattern apps use for unsaved changes. This does not apply where the app continues the work in the background. The point is that the user does not accidentally abort a paid request without knowing.

## Relation to the budget ceiling

Invariant 6 in `02-security-invariants.md` requires a pre-flight token estimate and an enforceable, user-set budget ceiling: the app estimates a request's cost *before* sending it and refuses to exceed the allowance. That estimate is a guard rail, not the displayed cost. The principles above govern what the user *sees* — real usage, surfaced honestly — while the budget ceiling governs what the app *allows*. They do not substitute for each other; an app must implement both. The ceiling is a best-effort guard against estimates (see "The honest budget boundary" in `02`); the provider-side spend limit is the hard cap. Cost is shown in the provider's billing unit (e.g. USD); the app does not convert currencies.

## The honest boundary

This chapter is about visibility and control, not a guarantee of perfect accounting. The provider's usage data is the source of truth; the app surfaces it rather than producing it. Where the provider's data is late or coarse, the app says so plainly — pending, or per-request only — rather than papering over the gap with a confident-looking number. State the limits as they are.
