# Stefan Penchev — portfolio

## Overview

An editorial full-stack developer portfolio with a scroll-linked architecture sculpture, project studies, a systems diagram, engineering interests, education, a load-balancer experiment, About and direct contact links. The existing near-black, muted-amber design is preserved.

The owner's location, availability, contacts, education and interests are verified. Four project studies and five Lab concepts are still explicitly labelled concepts. This is deployable static code, not a claim that content and real-device QA are finished. Nothing has been deployed.

## Stack

React, TypeScript, Vite, React Router, CSS Modules, GSAP/ScrollTrigger, Lenis, lazy Three.js/React Three Fiber/Drei, local Manrope and IBM Plex Mono fonts. Vitest + jsdom provide semantic and lifecycle tests. No backend, external API keys or environment variables are required.

## Local development

Use a Node version supported by the locked Vite version (Node 22.12+ or a compatible newer release). Install exact dependencies from the lockfile:

```sh
npm ci
npm run dev
```

Development runs at http://127.0.0.1:3000. `npm run build` writes `dist/`; `npm run preview` serves that build at http://127.0.0.1:4173. Do not open source index.html directly: Vite resolves modules and injects profile metadata.

## Architecture

- `src/App.tsx`: home composition and routes; smooth-scroll ownership resets on pathname changes.
- `src/components/layout`: Lenis lifecycle, route focus/metadata, loading error boundary, footer and Story.
- `src/sections`: the existing nine content sections; no new section was added during production preparation.
- `src/data`: editable typed profile, project, architecture, interests, education and experiment data.
- `src/animations`: scoped GSAP effects with cleanup; scroll progress mutates refs/DOM rather than React state.
- `src/three`: one lazy scene; reduced motion and failures use the static SVG.
- `src/pages`: lazy case-study route and safe not-found content.
- `src/sections/Playground/LoadBalancer/simulation`: pure routing functions and a ref-owned logical clock; one timer only while running, visible and in an active tab.

## Testing

```sh
npm test
npm run build
npm run analyze
```

58 tests pass. The previous 48 cases remain; content-dependent assertions now reflect owner-verified data, while placeholder/disabled-contact behavior is still covered with fixtures. Added production tests cover three project statuses, optional/invalid media, image failure layout, verified and invalid contacts, home metadata, direct lazy route focus/skip link, static WebGL failure, reduced motion and video cleanup.

`npm run analyze` uses Vite's own generateBundle hook; it adds no analyzer dependency and writes no application bundle. `BUNDLE_ANALYSIS.json` records before/after snapshots. Package attribution uses **pre-minification rendered module bytes**, not additive gzip costs. Gzip computed by the script may differ slightly from Vite's reporter.

DOM tests cannot verify overflow, paint, layout shift, browser-generated keyboard events or GPU performance. See `QA_NOTES.md` and `PRODUCTION_CHECKLIST.md` for unchecked browser/device work. The browser tool's policy check currently blocks visual QA; no bypass was attempted.

## Content model

`src/data/profile.ts` owns the name, headline, Luxembourg location, owner-supplied availability, email and social URLs. Contacts derive from it; disabled/empty/invalid destinations never render as links. Site title/description feed both Vite's static HTML transform and route metadata.

`src/data/experience.ts` contains only verified education: Bachelor student, University of Luxembourg, Luxembourg. The exact official programme title and dates are omitted until supplied. About and Skills contain verified interests rather than invented proficiency or employment claims.

Project status is explicit: `completed`, `in-progress` or `concept`. All current projects are concepts. Do not change status based on missing fields. Unknown years were removed. Optional study fields (`overview`, `problem`, `solution`, `myRole`, `architecture`, `technicalChallenges`, `result`, `screenshots`, `media`) render only when supplied. Results must be factual implemented capabilities or evidence-backed measurements, never invented efficiency/revenue/user claims. Profile GitHub is not a substitute for a project repository URL.

`CONTENT_AUDIT.md` inventories unresolved fields with file, property, current value and needed information. Concept disclosures are intentional and remain public; unverified personal placeholders are omitted.

## Project media

Place real assets under `public/projects/<stable-slug>/`. Existing `public/previews/*.svg` files remain labelled concept illustrations.

`caseStudy.media` accepts:

```ts
{
  type: "image" | "video",
  src: string,
  alt?: string,
  caption?: string,
  width?: number,
  height?: number,
  poster?: string,
  captions?: string // English WebVTT track for meaningful audio
}
```

Supply descriptive alt/label and true dimensions; entries without a usable source or alt are rejected. Missing dimensions reserve a 1600:1000 area, so supply the real ratio before publishing. Invalid entries are omitted from the gallery; failed media displays a restrained fallback. Legacy `screenshots` remain compatible with the same image component.

Images use semantic img, dimensions, decoding async and lazy loading below the first preview. Compress real screenshots into WebP/AVIF where appropriate without making text unreadable. Native videos use controls, playsInline and preload none, with **no autoplay**. Playback pauses below 10% visibility or when the tab hides. Supply posters, captions and a transcript/caption when needed. No gallery dependency or global media preload exists.

## Accessibility

Named landmarks, one clear route H1, a focusable main/skip link, visible focus outlines, native selects/buttons/details and semantic contact links. Lazy route focus occurs after content commits. Reduced motion avoids loading the scene and disables nonessential CSS movement/Lenis; Lab counters remain functional. The simulation does not announce every packet. Static SVG communicates architecture when WebGL fails. Route/media failures show short public messages, not stack traces.

Targeted QA fixes include 44px disclosure/CTA targets, a single-column narrow Lab control layout, readable functional metadata, less text dimming, wrapping long contact values and a short-desktop sticky escape. Prose remains bounded around 68ch. Actual contrast, overflow, touch, zoom and screen-reader testing remain necessary.

## Performance

Vite production report after this pass:

| Asset | Gzip |
| --- | ---: |
| Initial JavaScript | 148.57 kB |
| Lazy case-study code | 2.12 kB |
| Lazy 3D scene | 249.31 kB |
| Initial CSS | 9.69 kB |
| Lazy media CSS | approximately 0.25 kB |

The prior initial JS was 149.15 kB gzip; improvement is modest, about 0.6 kB net despite adding media/error handling. Case-study code is isolated into one meaningful route chunk, not dozens of tiny files. Three.js remains outside the initial static import graph; it loads on the animated home route, never on direct case-study entry. Reduced motion uses SVG before the lazy import is initialized.

Bundle attribution found React/ReactDOM, GSAP and React Router as expected initial dependencies; no unexpected new heavy dependency was added. The 3D ecosystem is confined to its lazy chunk. DPR stays 1–1.5, rendering pauses offscreen/in hidden tabs, and useFrame uses ref mutations. The existing 500kB 3D warning remains visible; no FPS guarantee is made.

Only Latin Manrope variable (200–800) and regular IBM Plex Mono WOFF2 files are emitted; both use font-display swap. The unused legacy 13.14kB WOFF artifact is gone (modern browsers previously selected WOFF2 anyway). Actual transfer, CLS, Lighthouse and GPU timing have not been measured.

## Deployment

**Do not deploy yet.** No host has been selected. No provider configuration file has been activated and no production URL is invented. For any static host: install with `npm ci`, build with `npm run build`, publish `dist/`. No secrets are needed. `.env*` is ignored; no env file was present during the audit. If future configuration needs variables, add safe placeholders to `.env.example`; VITE-prefixed values are public client data, never secrets.

Choose exactly the configuration for the eventual host:

### Vercel

Use the Vite preset and output `dist`. Once selected, add root `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

[Vercel's Vite SPA guidance](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas) documents the deep-link rewrite.

### Netlify

Set build `npm run build` and publish directory `dist`. Once selected, add `public/_redirects` (Vite copies it into dist):

```text
/* /index.html 200
```

Use the non-forced rewrite so existing assets retain normal handling. See [Netlify SPA rewrites](https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/).

### Cloudflare Pages

Set build `npm run build` and output `dist`. Keep the build without a top-level `404.html`: Pages' default SPA behavior routes unmatched navigations to the application root. See [Cloudflare Pages serving behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/). This applies to Pages, not Workers deployment configuration.

## SPA routing and SEO

`/work/:slug` uses stable project slugs. Unknown slugs/paths show a safe client-side not-found view; static SPA fallbacks commonly return HTTP 200, not a server 404. Explicit Back to Work returns to `/#work`; browser history remains available. Check hard reload/direct links and missing assets on the chosen host before release.

Home HTML has title, description, Open Graph text and theme color. Routes update unique titles/descriptions, including concept labels. Canonical, og:url, og:image and sitemap remain unset until a real origin and approved social image exist. Crawlers that do not execute JavaScript see the default HTML metadata; evaluate prerendering if per-project social previews are needed. No inaccurate structured data was added.

## Known content TODOs

- Verify/replace the four project concepts with actual scope, status, factual results and authentic links.
- Supply exact education programme title/dates only if desired; no invented jobs or clients.
- Add real, compressed project media with dimensions, alt and captions.
- Optional genuine portrait, if desired.
- Select host/domain and social preview asset; activate its SPA fallback only then.
- Complete browser QA at 320, 375, 390, 430, 768, 1024 and 1440px; keyboard/reduced-motion checks; Safari/mobile-device checks; Lighthouse and final performance QA.

Use `CONTENT_AUDIT.md` for content decisions and `PRODUCTION_CHECKLIST.md` as the release gate.
