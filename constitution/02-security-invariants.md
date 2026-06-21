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

6. **Pre-flight token estimation and enforceable budget limits.** Before a request, estimate its token cost. Enforce a user-visible, user-settable budget/allowance so that connecting a model cannot silently burn through the user's balance — including in the case of a bug that spams requests. The user can set an allowance; the app tracks spend against it and stops when it is reached.

## The honest threat model

Browser-local keys are a **privacy and control win, not an absolute security guarantee.** A key in browser storage is readable by any cross-site-scripting flaw on the page — and apps that pull in dependencies are exactly where supply-chain XSS appears. This is a *different* threat profile from server-side-encrypted storage, not a strict upgrade.

That is precisely why invariants 3, 4, and 1 (strict CSP, minimal third-party JS, in-memory default) are load-bearing. They belong here, in the shared constitution, rather than being left to each app to rediscover.

Do not overstate the guarantee anywhere in an app's UI or docs. State plainly that this is a meaningful improvement in privacy and control, not a cryptographic guarantee against a determined attacker. See `04-badge-and-registry.md` for the matching limits on what the badge can claim.
