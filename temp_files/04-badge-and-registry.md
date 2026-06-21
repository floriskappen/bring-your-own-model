# Badge and registry

## The badge

An application that follows this constitution may display a **BYOM badge** linking back to the constitution site. The badge signals: this app follows the BYOM pattern — the user brings their own model, the developer never touches the key or the money, and the app follows the security invariants.

### Icon direction

The badge glyph should evoke **connect your own model** — a model/socket/plug-into-slot idea. Deliberately avoid:

- **The robot** — reads as "agent," which is the wrong meaning.
- **The key-as-chore** — too literal and joyless.

A plug, socket, or connect glyph carries "bring and connect your own" without the agent baggage.

## What the badge can and cannot claim

The badge says an app *follows the pattern and the invariants*. It does **not**, and cannot, guarantee safety. This limit is honest and important:

**In-page UI can always be cloned.** Any badge, branding, or "verified" claim can be copied by a malicious site. A badge makes a recognizable, documented, open pattern that users may reasonably feel more comfortable with than pasting a key into an unknown one-off app — but it is not proof of safety.

Real phishing resistance would require privileged browser chrome — a browser-extension approach whose prompts render in a context a webpage cannot fake, plus a session-scoped handle instead of the raw key. That is **out of scope for this phase.** It is the natural future direction if the pattern accumulates enough recognition to be worth recognizing, but it is explicitly not part of v1.

The position for now: browser-local keys, a clear public security page explaining the architecture, and the constitution's invariants — while being upfront that this is a real improvement in privacy and control, not a cryptographic guarantee against a determined phisher.

## The registry

The constitution site lists participating apps. The registry is designed to be worth maintaining at **N=1** — the value is real even if the only listed apps are the builder's own. External adopters are a bonus, never a design assumption. Nothing about the registry's design should presuppose outside adoption.
