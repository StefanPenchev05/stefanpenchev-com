# Stefan Penchev — portfolio foundation

First implementation of the new brief: Swiss editorial typography, restrained architecture sculpture, scroll-driven introduction and an editorial project list. Built fresh with Vite, React, TypeScript, CSS Modules, React Three Fiber / Drei, GSAP ScrollTrigger, Lenis and Zustand.

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
- Full-stack hero with Luxembourg / availability metadata.
- Lightweight five-node architecture sculpture: Client → API → Service → Database / Cache. Slow independent drift, constrained pointer camera response and scroll-driven separation / connections.
- Four readable intro passages beside the sticky visual. This is content-backed CSS sticky pinning, synchronized by GSAP; no artificial pin spacers are inserted.
- Four data-driven project concepts. Desktop has a bounded pointer-following preview; touch and smaller screens have inline illustrations. Click or keyboard activation opens a native modal case-study draft.
- Extensible typed case-study data for overview, problem, solution, role, architecture, technologies, challenges, screenshots, result and real links.

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
│   ├── Architecture/     # next-phase TODO
│   ├── Skills/           # next-phase TODO
│   ├── Experience/       # next-phase TODO
│   ├── Playground/       # next-phase TODO
│   ├── About/            # next-phase TODO
│   └── Contact/          # next-phase TODO
├── three/
│   ├── Scene/            # lazy canvas, camera and static SVG fallback
│   ├── ArchitectureModel/# low-poly nodes and mutable connection buffer
│   └── effects/          # intentionally no postprocessing
├── data/                 # projects; typed future skills / experience
├── hooks/                # responsive media subscription
├── store/                # discrete modal selection only
└── styles/               # tokens, global rules and local fonts
public/
├── favicon.svg
└── previews/             # original illustrative project images
scripts/create-previews.py
 tests/                   # real GSAP lifecycle under DOM emulation
```

## Scroll ownership and cleanup

Lenis owns desktop wheel smoothing and runs on GSAP's ticker. Touch and reduced-motion devices use native scrolling. `SmoothScroll` removes its ticker callback and destroys Lenis on cleanup. GSAP lag smoothing is disabled at registration per Lenis integration guidance. All story triggers belong to `gsap.matchMedia()` and are reverted when unmounted or the desktop breakpoint stops matching. Navigation owns and kills its single trigger. Preview tweens belong to a reverted GSAP context. Fonts trigger a refresh once ready; ScrollTrigger handles resize refreshes.

The sticky scene releases at the end of the actual introduction. Below 900px the composition becomes Hero → inline sculpture → Intro, with no sticky pinning. Four text passages determine the introduction's height; there are no empty spacer sections.

## Accessibility and rendering budget

Semantic sections, real links/buttons, a skip link and visible focus states are included. The native dialog handles focus trapping and Escape; the caller is restored by the browser. The static SVG explains the same architecture without requiring WebGL. Reduced motion selects that static visual and disables Lenis, parallax and scroll fades. A WebGL error/context-loss fallback leaves the portfolio usable.

The scene is lazy-loaded independently of the main UI. DPR is bounded at 1–1.5. There are five nodes, shared database geometry/material, two directional lights and one ambient light, no shadows, no postprocessing, and no particle field. Connections use one reusable buffer and one draw call. Frame-loop updates mutate refs only. IntersectionObserver and page visibility stop rendering offscreen or in a background tab. Mobile uses fewer cylinder segments and omits database edges.

The Three.js scene still creates a large lazy chunk (approximately 249 kB gzip). Vite's size warning is retained rather than hidden. It is not part of the initial UI chunk. Hardware FPS needs a real browser/device profile; no 60 FPS guarantee is claimed.

## Validation

`npm test` covers:

1. StrictMode does not duplicate the five story triggers; unmount removes all of them.
2. Mobile leaves all four passages readable without desktop triggers.
3. Reduced motion creates no story animation triggers.
4. Crossing the desktop breakpoint removes and recreates triggers cleanly.
5. Project slugs are unique, preview files exist and concepts are labelled honestly.

These are real GSAP tests in a DOM emulation environment. They do not measure browser layout or GPU performance.

Visual browser verification is currently blocked: the computer-use browser could not verify its required admin policy, including on retry. Desktop/mobile screenshots, live WebGL appearance and actual frame timings remain to be checked when that browser path is available. No alternate browser path was used to bypass it.

## Next phase — intentionally not built

Each deferred section has a scoped TODO in its own folder. Start with the HTML/SVG backend architecture, then skills, verified experience, lab, about and contact. Activate the remaining navigation items only when their destination sections exist. Do not add a generic contact form.

## References

- [Lenis GSAP integration](https://github.com/darkroomengineering/lenis#gsap-scrolltrigger)
- [GSAP responsive contexts and cleanup](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/)
