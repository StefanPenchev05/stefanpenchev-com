# Stefan Penchev — portfolio foundation

Phases one and two of the portfolio: Swiss editorial typography, restrained architecture sculpture, scroll-driven introduction and an editorial project list. Built fresh with Vite, React, TypeScript, CSS Modules, React Three Fiber / Drei, GSAP ScrollTrigger, Lenis and Zustand.

## Run

```sh
npm install
npm run dev       # http://localhost:3000
npm run build     # TypeScript + production bundle
npm run preview   # production preview on http://127.0.0.1:4173
npm test          # lifecycle and content integrity checks
```

## Implemented scope

- Self-hosted Manrope / IBM Plex Mono, warm off-white type, near-black background and one muted amber accent.
- Fixed, compacting navigation. Index and Work are functional; About and Contact are explicitly inactive until their later sections exist.
- Full-stack hero with Luxembourg / availability metadata, stronger body-copy contrast, larger readable sculpture labels and improved desktop framing. The headline is unchanged.
- Lightweight five-node architecture sculpture: Client → API → Service → Database / Cache. Slow independent drift, constrained pointer camera response and scroll-driven separation / connections.
- Four readable intro passages beside the sticky visual. This is content-backed CSS sticky pinning, synchronized by GSAP; no artificial pin spacers are inserted.
- Four data-driven project concepts. Desktop has a bounded pointer-following preview; touch and smaller screens have inline illustrations. Click or keyboard activation opens a native modal case-study draft.
- Extensible typed case-study data for overview, problem, solution, role, architecture, technologies, challenges, screenshots, result and real links.
- Beyond the Interface: semantic HTML/SVG architecture, accessible node inspection, a scroll-driven cache-miss request/response path and a vertical mobile version.
- Engineering Index: six typed responsibility groups, always-readable technology lists and category-level descriptions.

The project entries and their original SVG previews are **illustrative placeholders**, not completed-project claims. Replace them in `src/data/projects.ts` before publishing a personal portfolio. The actual future case-study URL can be derived from each stable `slug`. No email address, repository, client, metric or employment history has been invented.

## Architecture

```text
src/
├── App.tsx
├── main.tsx
├── animations/
│   ├── scroll/            # GSAP registration and story lifecycle
│   └── transitions/       # pointer-following project preview
├── components/
│   ├── layout/            # Lenis owner and narrative composition
│   ├── navigation/        # compacting fixed navigation
│   ├── typography/        # typography guidance
│   └── ui/                # small shared primitives
├── sections/
│   ├── Hero/
│   ├── Intro/
│   ├── Projects/          # editorial rows and native dialog
│   ├── Architecture/     # HTML/SVG schematic, node details, responsive CSS
│   ├── Skills/           # data-driven engineering index
│   ├── Experience/       # editorial timeline with verified-data placeholders
│   ├── Playground/       # Lab notebook and load-balancer simulation
│   ├── About/            # next-phase TODO
│   └── Contact/          # next-phase TODO
├── three/
│   ├── Scene/            # lazy canvas, camera and static SVG fallback
│   ├── ArchitectureModel/# low-poly nodes and mutable connection buffer
│   └── effects/          # intentionally no postprocessing
├── data/                 # projects, architecture, skills, experience and experiments
├── hooks/                # responsive media subscription
├── store/                # discrete modal selection only
└── styles/               # tokens, global rules and local fonts
public/
├── favicon.svg
└── previews/             # original illustrative project images
scripts/create-previews.py
tests/                    # real GSAP lifecycle and semantic tests under DOM emulation
```

## Scroll ownership and cleanup

Lenis owns desktop wheel smoothing and runs on GSAP's ticker. Touch and reduced-motion devices use native scrolling. `SmoothScroll` removes its ticker callback and destroys Lenis on cleanup. GSAP lag smoothing is disabled at registration per Lenis integration guidance. All story triggers belong to `gsap.matchMedia()` and are reverted when unmounted or the desktop breakpoint stops matching. Navigation owns and kills its single trigger. Preview tweens belong to a reverted GSAP context. Fonts trigger a refresh once ready; ScrollTrigger handles resize refreshes.

The sticky scene releases at the end of the actual introduction. Below 900px the composition becomes Hero → inline sculpture → Intro, with no sticky pinning. Four text passages determine the introduction's height; there are no empty spacer sections.

## Accessibility and rendering budget

Semantic sections, real links/buttons, a skip link and visible focus states are included. The native dialog handles focus trapping and Escape; the caller is restored by the browser. The static SVG explains the same architecture without requiring WebGL. Reduced motion selects that static visual and disables Lenis, parallax and scroll fades. A WebGL error/context-loss fallback leaves the portfolio usable.

The scene is lazy-loaded independently of the main UI. DPR is bounded at 1–1.5. There are five nodes, shared database geometry/material, two directional lights and one ambient light, no shadows, no postprocessing, and no particle field. Connections use one reusable buffer and one draw call. Frame-loop updates mutate refs only. IntersectionObserver and page visibility stop rendering offscreen or in a background tab. Mobile uses fewer cylinder segments and omits database edges.

The Three.js scene still creates a large lazy chunk (approximately 249 kB gzip). Vite's size warning is retained rather than hidden. It is not part of the initial UI chunk. Hardware FPS needs a real browser/device profile; no 60 FPS guarantee is claimed.

## Phase-two interaction and lifecycle

The hero keeps its original layout and sticky composition. A modest camera reframing, 1.12 model scale, clearer node spacing and larger canvas labels target roughly 1.25–1.4 times the previous desktop presence. Passage positions drive Client → API → Service → Data emphasis; there is no added scroll space. The non-WebGL illustration now shows all five nodes and the same topology.

`src/data/architecture.ts` is the diagram's source of truth. Seven native buttons inspect the client, API, authentication, service, cache, database and optional background worker. Hover/focus highlights immediate neighbors and changes the contextual region. Mobile switches to a vertical semantic list with inline, tap-selected details. Request/response information and all five narrative steps remain available without animation.

`useArchitectureScroll` owns one responsive ScrollTrigger and mutates only animation attributes. The small SVG packet follows a precomputed orthogonal route: cache check → miss → database query → response. Reduced motion skips packet movement and highlights each path leg discretely. CSS sticky is disabled on mobile and short desktop viewports; no GSAP pinning or empty spacer sections are used. Context cleanup removes triggers and attributes. Continuous progress never enters React state.

Skills use `src/data/skills.ts`, with the exact six groups requested. Hover/focus/tap reveals a category description while technology lists stay visible. Simple CSS transitions handle category emphasis. Related node IDs are typed metadata only, with no cross-section state coupling.

## Validation

Phase-two validation: **16 passing tests**, including the original five. Checks cover server-rendered architecture content, native keyboard buttons and contextual details, immediate dependencies, reduced-motion packet suppression (including both storage branches), StrictMode cleanup, desktop/mobile/motion breakpoint changes, mobile inline details without pinning, route continuity and round-trip order, typed skills rendering and expansion, and hero narrative emphasis.

`npm run build`: passes TypeScript and production bundling. No dependencies were added in phase two. The main JavaScript bundle increased from approximately 125.8 kB to 130.4 kB gzip; the new sections add no Three.js import. The existing lazy scene remains approximately 249 kB gzip, and its size warning is retained.

These are code and real-GSAP tests in DOM emulation. They do not measure browser layout or GPU performance. Static review confirms natural content heights, no spacer sections, mobile CSS without sticky pinning, and semantic content independent of the SVG.

Visual browser verification remains blocked: the computer-use browser could not verify its required admin policy, including on retry. Desktop/mobile screenshots, actual perceived sculpture size and frame timings remain to be checked when that browser path is available. No alternate browser path was used to bypass it; no FPS claim is made.

## Phase three — Experience and Lab

Experience (`#experience`, section 05) is an editorial timeline driven by `src/data/experience.ts`. All three entries explicitly identify themselves as development placeholders; there are no invented dates, employers or achievements. Native details controls disclose entry notes. One ScrollTrigger fills the line and marks the current entry without React scroll updates, pinning or spacer elements. Reduced motion removes this trigger. Disclosure toggles refresh layout measurements, and the context and toggle listener are removed on unmount.

Lab (`#lab`, section 06) contains one working load-balancer prototype and five explicitly unimplemented concept entries, sourced from `src/data/experiments.ts`. Native selects choose round robin, random or least connections; 2–5 servers; and low/medium/high request rates. Changing topology resets and pauses the simulation. About and Contact remain inactive.

### Simulation architecture

`LoadBalancer/simulation/algorithms.ts` holds pure routing functions. `engine.ts` owns logical time, jobs, completion accounting and a capped eight-event log. `useLoadBalancerSimulation.ts` keeps mutable engine state in a ref and publishes snapshots only when assignments or completions change. A single 100 ms interval runs only while started, visible and in an active document. Pausing freezes both incoming requests and processing; resuming cannot produce a wall-clock catch-up burst. Simulated processing takes 1.2–3.6 logical seconds. Least-connections ties choose the first matching server.

CSS animates a maximum of eight SVG packet elements without React frame updates. Reduced motion omits packets while counters and destination highlighting continue. Mobile hides the desktop wires and uses a compact server grid. Controls are native, labelled and touch-sized. Only the coarse run status is a live region; individual requests are not announced. The observer, visibility listener and interval are cleaned up, including under StrictMode.

### Phase-three files

- `src/data/experience.ts` (updated) and `src/data/experiments.ts`
- `src/sections/Experience/`: `Experience.tsx`, `ExperienceEntry.tsx`, `Experience.module.css`, `useExperienceTimeline.ts`
- `src/sections/Playground/`: `Playground.tsx`, `ExperimentIndex.tsx`, `Playground.module.css`
- `src/sections/Playground/LoadBalancer/`: `LoadBalancerDemo.tsx`, `LoadBalancerControls.tsx`, `LoadBalancerDiagram.tsx`, `ServerNode.tsx`
- `src/sections/Playground/LoadBalancer/simulation/`: `types.ts`, `algorithms.ts`, `engine.ts`, `useLoadBalancerSimulation.ts`
- `tests/experience.test.tsx`, `tests/load-balancer.test.tsx`

### Phase-three validation

`npm test`: **32 passing tests**, retaining all 16 existing tests. The 16 new tests cover typed experience rendering, explicit placeholders, real ScrollTrigger cleanup, reduced-motion content, three routing algorithms, job accounting, bounded history, topology reset, pause/reset behavior, timer/observer cleanup, offscreen/background suspension and resumption, reduced-motion counters, and labelled/focusable native controls.

`npm run build`: passes TypeScript and production bundling. No dependencies were added. Main JS is approximately **134.7 kB gzip** (up about 4.2 kB); CSS is approximately **8.4 kB gzip**. The pre-existing lazy Three.js chunk remains approximately **249.3 kB gzip**, with the existing size warning retained. Neither new section imports Three.js.

These checks use DOM emulation, not browser rendering. Static review confirms content-driven section heights, no timeline spacers or pins, mobile-specific topology, bounded logs/packets and no animation-frame React loop. Browser verification was attempted but denied because the browser tool could not verify its required admin policy. Visual desktop/mobile checks and FPS measurements are not claimed.

## Next phase — intentionally not built

Replace experience placeholders only with verified history. Replace the five Lab concept placeholders with real experiments in a later phase. About and Contact remain TODOs, with inactive navigation. Add only real biography, contact and repository information when supplied; no generic contact form.

## References

- [Lenis GSAP integration](https://github.com/darkroomengineering/lenis#gsap-scrolltrigger)
- [GSAP responsive contexts and cleanup](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/)
