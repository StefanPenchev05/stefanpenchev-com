# Production checklist

Last reviewed: 28 September 2026. Checked boxes distinguish implemented/code-tested work from browser/device verification. Do not deploy until the owner requests it.

## Content

- [ ] All project claims verified (four labelled concepts remain)
- [x] All published experience entries verified (Bachelor student, University of Luxembourg, Luxembourg only)
- [ ] Exact education programme title and dates supplied if desired
- [x] Email correct (owner supplied)
- [x] GitHub correct (owner supplied)
- [x] LinkedIn correct (owner supplied)
- [x] Location correct (Luxembourg, owner supplied)
- [x] Availability correct (owner supplied)
- [x] Unverified employment and biography omitted
- [x] Content gaps recorded in CONTENT_AUDIT.md

## Media

- [ ] Real project screenshots added
- [ ] All images compressed (real media not supplied)
- [ ] Alt text reviewed for final real media
- [ ] Videos compressed (none supplied)
- [ ] Captions/transcripts provided for meaningful video audio
- [x] Image/video component supports dimensions, captions, alt text and failure fallback
- [x] Below-fold images lazy; videos use controls and preload none

## QA

- [ ] Desktop Chrome reviewed
- [ ] Desktop Safari reviewed
- [ ] Mobile Safari reviewed
- [ ] Mobile Chrome reviewed
- [ ] Keyboard navigation reviewed in a browser
- [ ] Reduced motion reviewed in a browser
- [x] DOM tests cover route focus, skip link, native controls and reduced-motion fallback
- [ ] 320px reviewed
- [ ] 375px reviewed
- [ ] 390px reviewed
- [ ] 430px reviewed
- [ ] 768px reviewed
- [ ] 1024px reviewed
- [ ] 1440px reviewed
- [ ] Horizontal overflow, zoom and text reflow checked in a real layout engine
- [x] Test suite and production build pass

Browser QA is blocked because the computer-use browser cannot verify its required admin policy. No alternate browser path was used. DOM emulation does not prove visual layout or physical keyboard/touch behavior.

## Performance

- [ ] Lighthouse run
- [x] Bundle reviewed with a Vite build hook
- [x] Three.js lazy loading confirmed in emitted module graph
- [x] Reduced-motion users avoid initializing/loading the lazy scene
- [x] Case-study content split into one route chunk
- [x] Local fonts use WOFF2 and font-display swap
- [ ] Layout shift reviewed with actual media/fonts in a browser
- [ ] GPU/frame timing measured on representative hardware

## Deployment

- [ ] Production domain configured
- [ ] Host chosen and SPA fallback configured
- [x] Vercel / Netlify / Cloudflare Pages options documented
- [x] 404 behavior checked in DOM routing tests
- [ ] 404 behavior checked on chosen host
- [x] Direct lazy project entry checked without prior navigation state
- [ ] Project deep links checked on chosen host
- [ ] Social preview checked
- [ ] Canonical/og:url/og:image configured with verified deployment data
- [x] No environment variables required; no local env files found
- [x] No likely secrets found by source pattern scan (not a comprehensive security audit)
- [ ] Owner explicitly authorizes deployment
