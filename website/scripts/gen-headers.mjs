// Generate public/_headers from the single CSP source (src/csp.mjs).
//
// _headers is the authoritative security-header set the host delivers as real
// HTTP headers (Cloudflare Pages / Netlify convention). Generating it from the
// shared constant keeps it in lockstep with the <meta> CSP in Base.astro.
// Runs as part of `prebuild`, so `npm run build` always ships a fresh, in-sync
// file. Astro then copies public/ to dist/.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { CSP } from '../src/csp.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, '..', 'public', '_headers');

const headers = `/*
  Content-Security-Policy: ${CSP}
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: no-referrer
  Permissions-Policy: geolocation=(), microphone=(), camera=()
`;

writeFileSync(out, headers);
console.log('headers: wrote public/_headers from src/csp.mjs');
