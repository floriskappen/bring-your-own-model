# Philosophy

## In one line

Give the app away for free, but let the parts that need online inference run on the user's own model access — their own key — so they pay only for the inference they personally consume. No middleman, no markup, no payment plumbing for the developer to maintain, and the app stays genuinely free.

## The problem

A growing class of useful apps has LLM inference at their core. If the developer pays for that inference, the app cannot really be free — the cost has to be recovered, which means subscriptions, metering, a payment stack, and the developer becoming a reseller of intelligence they never wanted to resell. Charging per query is the other path, and it adds friction and a trust ask, turning a side project into a billing business.

BYOM removes the dilemma. The user already has, or can get, access to a model. They bring that access to the app. The developer never touches the money, never fronts the inference cost, and never builds payment infrastructure. The app is free; the only thing the user pays for is the inference they themselves trigger.

## Optional-but-powered

This matters specifically for **optional-but-powered** functionality. The whole app works without a model — the model only animates certain features. A user can browse, read, navigate, and use the scaffolding entirely for free. The smart features are unlocked by connecting a model. Inference is opt-in, not a wall in front of the product.

This is the motivating case, not a hard rule. An app whose core is entirely model-dependent can still follow the pattern. The narrower requirement is that features which do not need inference are not gated behind a key — the non-model parts stay usable without connecting.

## Free software for the LLM era

The deeper framing: this is free software for the age of LLMs and agents. Traditional software is often inert without the thing that animates it. Now the app is the **scaffold and interface**, and the model is what ties it together and makes it fully useful. The tooling is a well-built interface and data layer, plus an optional model the user supplies, working together.

Under this framing, BYOM apps are tools where some functionality is optional and powered by the user's own model. The app gives real value for free; the model, when connected, unlocks the rest. Nobody is charged for anyone else's inference. There is no extraction, no lock-in, no middleman taking a cut. The user pays their provider directly for what they use, and nothing more.

## The movement

Building software with coding agents is now democratized and fast. That makes it easy to build small, useful tools that solve real problems — for the builder first, and then for anyone else who shares the problem. Much of that software can be made meaningfully better with LLM inference.

The stance BYOM takes is that these tools do not need to become subscription products to exist. They can be free software, available to anyone who needs them, with the inference cost carried by each user through their own model access. If one person solves their own problem and shares it this way, everyone with the same problem benefits at no cost to the builder.

It is, deliberately, a position: a way to build genuinely free, genuinely useful LLM-era software that does not quietly turn into a subscription business.
