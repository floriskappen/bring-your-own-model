// Single source of truth for the Content-Security-Policy.
//
// The policy is consumed in two places: the <meta http-equiv> in Base.astro
// (a fallback for environments that don't apply the _headers file), and the
// public/_headers file (the authoritative copy delivered as a real HTTP header
// by the host). public/_headers is generated from this constant by
// scripts/gen-headers.mjs at build time, so the two can never drift.
//
// style-src needs 'unsafe-inline' only for the masthead firefly effect's
// build-time inline style attributes; everything else is 'self'. script-src
// 'none' and connect-src 'none' are the strongest possible.
export const CSP =
  "default-src 'self'; " +
  "script-src 'none'; " +
  "style-src 'self' 'unsafe-inline'; " +
  "img-src 'self' data:; " +
  "font-src 'self'; " +
  "connect-src 'none'; " +
  "base-uri 'self'; " +
  "form-action 'none'; " +
  "frame-ancestors 'none'";
