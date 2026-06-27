# Security invariants

These are the rules every BYOM application **must** follow. They are mandatory for any app claiming BYOM compliance or displaying the badge. They are not suggestions.

## The core fact

The key never touches the developer's infrastructure. It lives in the user's browser and calls the provider directly. There is no server-side key handling, so there is nothing to centralize and nothing for the developer to store, encrypt, or leak. Everything below protects the key *in the place it actually lives* — the browser.

## The invariants

1. **In-memory by default.** The key is held in memory for the session. Persistence to local browser storage is **explicit and opt-in** — the user chooses it, so a returning user does not have to re-enter the key. It is never persisted silently.

2. **Never sent to the developer's servers.** The key is never transmitted to or stored on any server the developer runs. It goes only to the provider.

3. **Strict Content Security Policy.** A strict CSP is in place to limit where scripts can load from and where the page can send data.

4. **Minimal third-party JavaScript.** Every dependency is attack surface for key theft. Keep third-party JS to the minimum the app genuinely needs.

5. **Never log the key, never log key-linked prompts.** Neither the key nor prompt content tied to the key is written to any log.

6. **Pre-flight token estimation and enforceable budget limits.** Before a request, estimate its token cost and check it against a user-set, cumulative budget — accounting for in-flight requests, so concurrent or multi-step calls cannot blow past the ceiling before spend catches up. The app stops at the limit, including when a bug spams requests. This ceiling is a best-effort guard against estimates; see "The honest budget boundary" below for what it does and does not guarantee.

## Data egress

The key is not the only thing that stays between the user and the provider. Prompt content — what the user sends to the model — goes only to the provider too. No third-party analytics, telemetry, or error-reporting endpoint receives the key or the prompts; the app sends inference data to exactly one place.

This is a mandatory rule, not the key-protection invariants restated: the key (invariant 2) and the prompts are both egress-bound to the provider alone. Note that the provider routes to the model vendor behind the chosen model, so the provider and that vendor see the prompts by design — the app adds no one else to the path.

## The honest threat model

Browser-local keys are a **privacy and control win, not an absolute security guarantee.** A key in browser storage is readable by any cross-site-scripting flaw on the page — and apps that pull in dependencies are exactly where supply-chain XSS appears. This is a *different* threat profile from server-side-encrypted storage, not a strict upgrade.

That is precisely why invariants 3, 4, and 1 (strict CSP, minimal third-party JS, in-memory default) are load-bearing. They belong here, in the shared constitution, rather than being left to each app to rediscover.

Do not overstate the guarantee anywhere in an app's UI or docs. State plainly that this is a meaningful improvement in privacy and control, not a cryptographic guarantee against a determined attacker. See `04-badge-and-registry.md` for the matching limits on what the badge can claim.

## The honest budget boundary

The budget ceiling in invariant 6 is enforced on pre-flight estimates, and estimates can be wrong — especially under concurrent or multi-step agentic requests, even with the cumulative, in-flight-aware check. It is a best-effort guard against runaway spend, not a billing guarantee that spend can never exceed the ceiling.

The hard cap is the spend limit the user sets at the provider during onboarding. The app ceiling and the provider limit are two layers: the app guards within a session; the provider caps the account. Require both — the onboarding flow does — and do not imply the app ceiling alone can stop all overrun.
