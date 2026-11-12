# Sources and verification notes

Prepared 12 November 2026. User-provided assertions, local file inspection, web observations and design proposals are kept separate.

## User and local sources

- **U1:** Latest portfolio message supplying portrait, final CV, project visibility/URLs, DTO platform stack, architectural responsibility/DDD exclusions, English language, scope, work preferences and contact details.
- **U2:** Earlier conversation: target audience, story, experience descriptions, chosen Dennis Snellenberg reference, empty repository connected to Codex and GitHub Pages hosting intention.
- **F1:** `public/files/stefan-penchev-cv.pdf`, unchanged copy of `Stefan_Penchev_Technical_CV_Final.pdf`; two pages. Page 1: identity, DTO and Skald. Page 2: ArtAICare, MindHub, skills, education and languages. Parsed text and both rendered pages were inspected. Supersedes older CV versions.
- **A1:** `public/images/stefan-penchev.png`, unchanged copy of uploaded `1780484577917.png`. Local inspection: 800×800, RGBA, alpha extrema 0–255, transparent background. No retouching, cropping, upscaling or replacement performed.

## Public research

- **W1:** Dennis Snellenberg, https://dennissnellenberg.com/ . Retrieved 12 November 2026. The text extraction supports the identity/work/about/contact structure, not a full interaction or browser-performance audit. Prior conversation established this visual reference.
- **W2:** Next.js static exports, https://nextjs.org/docs/app/guides/static-exports . Retrieved 12 November 2026. Use current App Router guidance rather than old `next export` recipes. Recheck supported features when implementing.
- **W3:** Next.js basePath, https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath . Retrieved 12 November 2026. Build-time prefix; Next routing handles link prefixing, while public/image asset paths need explicit attention.
- **W4:** Next.js trailingSlash, https://nextjs.org/docs/app/api-reference/config/next-config-js/trailingSlash . Retrieved 12 November 2026. Static export can emit route/index.html directories.
- **W5:** GitHub Pages custom workflows, https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages ; publishing configuration, https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site . Retrieved 12 November 2026. Deploy with real Pages settings, appropriate permissions and correct artifacts; CNAME alone does not configure a domain.
- **W6:** GSAP React, https://gsap.com/resources/React/ ; matchMedia, https://gsap.com/docs/v3/GSAP/gsap.matchMedia() . Retrieved 12 November 2026. Relevant for scoped effects, lifecycle cleanup and responsive/reduced-motion handling.
- **W7:** Skald Lab public site, https://skaldlab.com/ . Retrieved 12 November 2026. Public page describes youth workshops and includes login/registration links. This does not independently establish public access to internal operations workflows or verify Stefan's authorship of its public design.
- **W8:** GitHub Pages limits, https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits . Retrieved 12 November 2026. Review restrictions before release; no unconditional eligibility claim is made for freelance marketing.

## Project checks and limits

- https://dtopartners.com/ returned a page title but no readable body through the browsing tool. Public status is supplied by Stefan; no claim of a visual, feature, framework or performance audit.
- https://therapy.artaicare.com/auth/signin returned an ArtAICare title but no readable body through the tool. The URL is a sign-in route; no authenticated access, user data or feature audit was performed.
- Skald's public homepage was readable. The actual internal interface was not inspected.
- DTO recruitment and Egil have no public product/repository URLs. None were searched for or inferred. No private repository access was attempted.

## Unconfirmed information handling

No final domain or public GitHub profile has been supplied. No Go project has been documented. DTO's company website framework remains unmapped. Details of DDD boundaries, VR transport, EEG handling, tests, metrics and project screenshots are not invented.

Proposed visual values, page order, copy, implementation stages and stack are design decisions, not historical facts. They may be changed by Stefan without rewriting verified work history.
