# QA and motion review

28 September 2026. Source inspection and DOM-emulation tests only; browser access was denied because the tool could not verify its admin-enforced policy. No visual, Lighthouse, GPU, Safari or mobile-device result is claimed.

## Responsive inspection matrix

Every requested width remains pending rendered QA. Sources reviewed: Hero/Story/Intro, Projects, Architecture, Skills, Experience, Lab, About, Contact, case study, navigation and footer.

| Width | Source findings / changes | Rendered status |
| --- | --- | --- |
| 320 | Lab controls now one column below 560px; native selects have min-width:0; contact values wrap; header retains compact text | Not verified |
| 375 | Same Lab fix; 44px actions; availability text wraps inside bounded metadata columns | Not verified |
| 390 | Mobile architecture is a semantic vertical list, no sticky diagram; strengthened labels and details | Not verified |
| 430 | Hero uses vw within existing mobile breakpoints, no forced viewport-height section; project previews inline | Not verified |
| 768 | About stacks; mobile server grid; experience content determines height; footer wraps | Not verified |
| 1024 | Desktop diagram and sculpture preserved; short desktop windows release sculpture sticky position | Not verified |
| 1440 | Existing max-width/gutters retained; case-study prose remains 68ch; About paragraphs remain bounded | Not verified |

No scrollWidth assertion is used: jsdom does not implement real layout and would produce false confidence.

## Typography, contrast and spacing

Functional Lab metadata is now 10px, selects 13px and explanatory prose 14px. Architecture body/details are 14px; mobile node technology labels 11px. Experience description is 14px and its disclosure has a 44px target. Skills disclosures have 44px targets. Hero CTAs have 44px targets and 10px labels. New media captions are 11px. These are targeted changes, not a global font-size reset.

Removed 0.35 project-row and 0.6 skills-row hover dimming, which could make supporting copy unreadable. Intro's starting opacity changed from 0.48 to 0.9 while retaining its small scroll-linked translation. Base muted text remains #90928a on #08090b; no palette redesign. Display headings, natural section padding, thin borders and muted amber remain. New long contact URLs use overflow-wrap:anywhere. Real contrast in overlays/focus/hover and all text sizes still require browser review.

## Motion inventory and lifecycle

| Owner | Motion / purpose | Cleanup and reduced motion |
| --- | --- | --- |
| SmoothScroll | One Lenis instance driven by GSAP ticker; desktop wheel smoothing | Destroy instance, remove ticker and scroll callback; disabled on touch/reduced motion; fonts-ready refresh has cancellation guard |
| useStoryScroll | One progress trigger + four passage tweens; camera emphasis and reading progression | gsap.matchMedia revert; no pin spacing; desktop only; reduced motion has no triggers |
| useProjectPreview | Two quickTo tweens position hover preview | GSAP context reverted; no hover dependency on mobile; reduced motion uses fixed placement |
| useArchitectureScroll | One responsive trigger; request path / current narrative step | Context and direct DOM attributes cleaned; reduced motion uses discrete highlights without packet travel |
| useExperienceTimeline | One trigger fills line and highlights current entry | matchMedia revert; toggle refresh listener removed; no trigger for reduced motion |
| Navigation | One trigger marks active section and compacts header | Killed on route/unmount; no React scroll loop |
| Lab engine | One 100ms logical timer while running/visible, CSS travel keyframe for at most eight packets | Clears timer, observer and visibility listener; offscreen/hidden pauses; reduced motion omits packets but keeps counters |
| Three.js | useFrame camera damping, idle float and system emphasis | Ref mutations only, bounded DPR; observer/visibility pauses rendering; context-loss listener removed on unmount; reduced motion renders SVG before lazy import |
| Case study | 250ms opacity / 5px translate entry keyframe | CSS disabled by global reduced-motion rule |
| UI hover | Small arrow movement, border/underline transitions and concept disclosure marker | CSS only; disabled by global reduced-motion rule |
| Project videos | User-started native playback only | preload none, no autoplay; pauses below 10% visibility or hidden document; removes observer/listener |

No new animation library, scene or continuous React frame loop. Existing StrictMode/breakpoint/route cleanup tests remain. Trigger measurements refresh on relevant layout events rather than every simulation update; no debug markers are present.

## Semantics and failure states

One H1 on normal case-study routes; named section/nav landmarks; native links/selects/buttons/details; skip link focuses main; route focus waits for the lazy page commit. Screen readers receive coarse simulation status, not every packet. Informative media requires descriptive alt/label; video supports a captions track. Initial project preview has fixed dimensions; gallery media reserves aspect ratio. Images failing to load retain a plain fallback; malformed optional media is filtered. SceneBoundary handles WebGL/lazy-scene failures with accessible static SVG. RouteBoundary displays a short retry message without exception text. Inactive contact items remain noninteractive in regression fixtures.

The old ProjectDialog/store are not mounted by routes. Their native dialog behavior was not reintroduced or browser-tested. Browser back uses router history; explicit Back to Work targets /#work rather than exact-pixel restoration.

## Build and security hygiene

No production console.log, debugger or FIXME found in source scan. Content-related TODO/concept labels are classified in CONTENT_AUDIT.md. No .env/.env.local present and no likely private-key/token patterns found in source. No secrets or services are needed. Vite's existing lazy-3D size warning is visible, not suppressed. No new dependency was added for analysis or media.

Source-palette calculation (sRGB, not rendered browser sampling): muted #90928a on #08090b is 6.32:1; at the minimum 0.9 Intro opacity it is 5.28:1; amber #c7a77d is 8.78:1. This does not validate every rendered overlay or focus state.
