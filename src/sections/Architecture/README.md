# Backend architecture

Phase-two HTML/SVG schematic. Node content and connections are defined in `src/data/architecture.ts`. Buttons support pointer inspection, keyboard focus and touch selection; the detail region never opens a modal. The mobile graph is a vertical DOM list with inline details.

`useArchitectureScroll` owns one responsive ScrollTrigger. It writes packet transforms, path highlights and narrative step markers directly to the DOM; React state only changes on node interactions. Reduced motion uses discrete path highlights, with no moving packet. CSS sticky holds the desktop graph against real narrative content and inserts no pin spacers.

This is explicitly a conceptual cache-miss path, not a project claim. The worker branch is optional and outside the synchronous request animation.
