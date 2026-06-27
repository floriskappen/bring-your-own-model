// Single source of truth for the site origin.
//
// The domain is an open decision (see ROADMAP "Cross-cutting / open decisions
// — Domain"). Until it is chosen, this placeholder stands in everywhere the
// origin is needed — canonical/OG URLs and the badge embed snippets — so the
// domain is set in exactly one place when it lands.
export const SITE = 'https://BYOM-SITE';

// The public source repo. Private for now — the constitution footnote links
// and the registry readme link resolve once it goes public. Defined here so
// the repo URL lives in one place.
export const REPO = 'https://github.com/floriskappen/bring-your-own-model';
